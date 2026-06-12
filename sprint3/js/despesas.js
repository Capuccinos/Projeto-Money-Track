// Sistema de Despesas com PHP + MySQL

class GerenciadorDespesas {
    constructor() {
        this.urlAPI = '../api/despesas.php';
    }

    async adicionar(despesa) {
        try {
            const response = await fetch(`${this.urlAPI}?acao=adicionar`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(despesa)
            });
            
            const dados = await response.json();
            if (dados.sucesso) {
                return { sucesso: true, id: dados.id };
            } else {
                throw new Error(dados.erro || 'Erro ao adicionar');
            }
        } catch (erro) {
            console.error('Erro:', erro);
            alert('Erro ao salvar: ' + erro.message);
            return { sucesso: false };
        }
    }

    async obterRecentes(limite = 5) {
        try {
            const response = await fetch(`${this.urlAPI}?acao=listar&limite=${limite}`);
            const dados = await response.json();
            return dados.sucesso ? dados.dados : [];
        } catch (erro) {
            console.error('Erro:', erro);
            return [];
        }
    }

    async calcularTotal() {
        try {
            const response = await fetch(`${this.urlAPI}?acao=total`);
            const dados = await response.json();
            return dados.sucesso ? parseFloat(dados.total) || 0 : 0;
        } catch (erro) {
            return 0;
        }
    }

    async deletar(id) {
        try {
            const response = await fetch(`${this.urlAPI}?acao=deletar`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ id: id })
            });
            
            const dados = await response.json();
            return dados.sucesso;
        } catch (erro) {
            return false;
        }
    }

    async obterCategorias() {
        try {
            const response = await fetch(`${this.urlAPI}?acao=categorias`);
            const dados = await response.json();
            return dados.sucesso ? dados.dados : [];
        } catch (erro) {
            return [];
        }
    }
}

const gerenciadorDespesas = new GerenciadorDespesas();

function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

async function inicializarFormularioDespesas() {
    const formulario = document.querySelector('form[action="MovimentacaoServlet"]');
    
    if (!formulario) return;

    const categorias = await gerenciadorDespesas.obterCategorias();
    const selectCategoria = document.getElementById('id_categoria');
    
    if (selectCategoria && categorias.length > 0) {
        categorias.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.nome;
            option.textContent = cat.nome;
            selectCategoria.appendChild(option);
        });
    }

    formulario.addEventListener('submit', async function(e) {
        e.preventDefault();

        const despesa = {
            descricao: document.getElementById('descricao').value,
            valor: parseFloat(document.getElementById('valor').value),
            data_mov: document.getElementById('data_mov').value,
            categoria: document.getElementById('id_categoria').value || 'Sem categoria',
            tipo: 'despesa'
        };

        if (!despesa.descricao || !despesa.valor || !despesa.data_mov) {
            alert('Preencha todos os campos obrigatórios!');
            return;
        }

        const resultado = await gerenciadorDespesas.adicionar(despesa);
        
        if (resultado.sucesso) {
            formulario.reset();
            await atualizarListaRecentes();
            await atualizarDashboard();
            alert('Despesa salva com sucesso!');
        }
    });
}

async function atualizarListaRecentes() {
    const listaElemento = document.querySelector('.lista-recentes');
    if (!listaElemento) return;

    const recentes = await gerenciadorDespesas.obterRecentes();
    
    if (recentes.length === 0) {
        listaElemento.innerHTML = '<p style="color: #94a3b8;">Nenhuma despesa registrada ainda.</p>';
        return;
    }

    listaElemento.innerHTML = recentes.map(despesa => `
        <li style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px solid #edf1f2;">
            <div>
                <strong>${despesa.descricao}</strong>
                <p style="font-size: 0.85rem; color: #94a3b8; margin: 4px 0 0 0;">
                    ${formatarData(despesa.data_mov)} • ${despesa.categoria}
                </p>
            </div>
            <div style="text-align: right;">
                <p style="color: #ef4444; font-weight: 600; margin: 0;">
                    - ${formatarMoeda(despesa.valor)}
                </p>
                <button onclick="deletarDespesa(${despesa.id})" 
                    style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 0.85rem;">
                    Deletar
                </button>
            </div>
        </li>
    `).join('');
}

async function deletarDespesa(id) {
    if (confirm('Tem certeza?')) {
        const sucesso = await gerenciadorDespesas.deletar(id);
        if (sucesso) {
            await atualizarListaRecentes();
            await atualizarDashboard();
        }
    }
}

async function atualizarDashboard() {
    const totalDespesas = await gerenciadorDespesas.calcularTotal();
    const elementoDespesas = document.querySelector('.card-moneytrack .valor-despesa');
    
    if (elementoDespesas) {
        elementoDespesas.textContent = '- ' + formatarMoeda(totalDespesas);
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    await inicializarFormularioDespesas();
    await atualizarListaRecentes();
    await atualizarDashboard();
});