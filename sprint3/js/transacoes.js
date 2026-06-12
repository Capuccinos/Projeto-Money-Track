// Carrega e exibe receitas e despesas na página de transações

function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

async function buscarReceitas(limite = 1000) {
    try {
        const response = await fetch(`../api/receitas.php?acao=listar&limite=${limite}`);
        const dados = await response.json();
        return dados.sucesso ? dados.dados : [];
    } catch (erro) {
        console.error('Erro ao buscar receitas:', erro);
        return [];
    }
}

async function buscarDespesas(limite = 1000) {
    try {
        const response = await fetch(`../api/despesas.php?acao=listar&limite=${limite}`);
        const dados = await response.json();
        return dados.sucesso ? dados.dados : [];
    } catch (erro) {
        console.error('Erro ao buscar despesas:', erro);
        return [];
    }
}

function ordenarTransacoes(transacoes) {
    return transacoes.sort((a, b) => {
        const dataA = new Date(a.data_mov).getTime();
        const dataB = new Date(b.data_mov).getTime();
        return dataB - dataA;
    });
}

function renderizarTransacoes(transacoes) {
    const corpoTabela = document.querySelector('.tabela-transacoes tbody');
    if (!corpoTabela) return;

    if (transacoes.length === 0) {
        corpoTabela.innerHTML = `
            <tr>
                <td colspan="5" class="texto-cinza" style="text-align: center; padding: 24px;">
                    Nenhuma transação encontrada.
                </td>
            </tr>
        `;
        return;
    }

    corpoTabela.innerHTML = transacoes.map(transacao => {
        const tipo = transacao.tipo === 'despesa' || transacao.tipo === 'D' ? 'Despesa' : 'Receita';
        const classeBadge = tipo === 'Despesa' ? 'badge-despesa' : 'badge-receita';
        const classeValor = tipo === 'Despesa' ? 'valor-despesa-coluna' : 'valor-receita-coluna';
        const sinal = tipo === 'Despesa' ? '-' : '+';
        const valorFormatado = formatarMoeda(parseFloat(transacao.valor));

        return `
            <tr>
                <td class="texto-cinza">${formatarData(transacao.data_mov)}</td>
                <td class="descricao-coluna">${transacao.descricao}</td>
                <td class="texto-cinza">${transacao.categoria || 'Sem categoria'}</td>
                <td><span class="${classeBadge}">${tipo}</span></td>
                <td class="${classeValor}">${sinal} ${valorFormatado}</td>
            </tr>
        `;
    }).join('');
}

function filtrarTransacoes(transacoes, filtro) {
    if (!filtro || filtro === 'T') {
        return transacoes;
    }
    return transacoes.filter(transacao => {
        if (filtro === 'R') {
            return transacao.tipo === 'receita' || transacao.tipo === 'R';
        }
        if (filtro === 'D') {
            return transacao.tipo === 'despesa' || transacao.tipo === 'D';
        }
        return true;
    });
}

async function inicializarTransacoes() {
    const filtroForm = document.querySelector('.filtro-transacoes');
    const selectTipo = document.getElementById('filtrarTipo');
    let transacoes = [];

    const receitas = await buscarReceitas();
    const despesas = await buscarDespesas();

    const receitasFormatadas = receitas.map(item => ({
        ...item,
        tipo: 'receita',
    }));
    const despesasFormatadas = despesas.map(item => ({
        ...item,
        tipo: 'despesa',
    }));

    transacoes = ordenarTransacoes([...receitasFormatadas, ...despesasFormatadas]);
    renderizarTransacoes(transacoes);

    if (filtroForm && selectTipo) {
        filtroForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const filtro = selectTipo.value;
            renderizarTransacoes(filtrarTransacoes(transacoes, filtro));
        });
    }
}

document.addEventListener('DOMContentLoaded', inicializarTransacoes);
