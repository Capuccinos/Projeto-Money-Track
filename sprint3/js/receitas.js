// Sistema de Receitas com PHP + MySQL

class GerenciadorReceitas {
    constructor() {
        this.urlAPI = '../api/receitas.php';
    }

    // Adicionar nova receita
    async adicionar(receita) {
        try {
            const response = await fetch(`${this.urlAPI}?acao=adicionar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(receita)
            });
            
            const dados = await response.json();
            
            if (dados.sucesso) {
                return { sucesso: true, id: dados.id };
            } else {
                throw new Error(dados.erro || 'Erro ao adicionar receita');
            }
        } catch (erro) {
            console.error('Erro:', erro);
            alert('Erro ao salvar receita: ' + erro.message);
            return { sucesso: false };
        }
    }

    // Obter receitas recentes
    async obterRecentes(limite = 5) {
        try {
            const response = await fetch(`${this.urlAPI}?acao=listar&limite=${limite}`);
            const dados = await response.json();
            
            if (dados.sucesso) {
                return dados.dados || [];
            } else {
                throw new Error(dados.erro || 'Erro ao buscar receitas');
            }
        } catch (erro) {
            console.error('Erro:', erro);
            return [];
        }
    }

    // Calcular total de receitas
    async calcularTotal() {
        try {
            const response = await fetch(`${this.urlAPI}?acao=total`);
            const dados = await response.json();
            
            if (dados.sucesso) {
                return parseFloat(dados.total) || 0;
            } else {
                return 0;
            }
        } catch (erro) {
            console.error('Erro:', erro);
            return 0;
        }
    }

    // Deletar receita
    async deletar(id) {
        try {
            const response = await fetch(`${this.urlAPI}?acao=deletar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id })
            });
            
            const dados = await response.json();
            return dados.sucesso;
        } catch (erro) {
            console.error('Erro:', erro);
            return false;
        }
    }

    // Obter categorias
    async obterCategorias() {
        try {
            const response = await fetch(`${this.urlAPI}?acao=categorias`);
            const dados = await response.json();
            
            if (dados.sucesso) {
                return dados.dados || [];
            } else {
                return [];
            }
        } catch (erro) {
            console.error('Erro:', erro);
            return [];
        }
    }
}

// Criar instância global
const gerenciadorReceitas = new GerenciadorReceitas();

// Função para formatar moeda
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

// Função para formatar data
function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

// Inicializar formulário de receitas
async function inicializarFormularioReceitas() {
    const formulario = document.querySelector('form[action="MovimentacaoServlet"]');
    
    if (!formulario) return;

    // Carregar categorias
    const categorias = await gerenciadorReceitas.obterCategorias();
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

        const receita = {
            descricao: document.getElementById('descricao').value,
            valor: parseFloat(document.getElementById('valor').value),
            data_mov: document.getElementById('data_mov').value,
            categoria: document.getElementById('id_categoria').value || 'Sem categoria',
            tipo: 'receita'
        };

        // Validar dados
        if (!receita.descricao || !receita.valor || !receita.data_mov) {
            alert('Preencha todos os campos obrigatórios!');
            return;
        }

        // Adicionar receita
        const resultado = await gerenciadorReceitas.adicionar(receita);
        
        if (resultado.sucesso) {
            // Limpar formulário
            formulario.reset();
            
            // Atualizar lista de receitas recentes
            await atualizarListaRecentes();

            // Atualizar dashboard
            await atualizarDashboard();

            alert('Receita salva com sucesso!');
        }
    });
}

// Função para atualizar a lista de receitas recentes
async function atualizarListaRecentes() {
    const listaElemento = document.querySelector('.lista-recentes');
    
    if (!listaElemento) return;

    const recentes = await gerenciadorReceitas.obterRecentes();
    
    if (recentes.length === 0) {
        listaElemento.innerHTML = '<p style="color: #94a3b8;">Nenhuma receita registrada ainda.</p>';
        return;
    }

    listaElemento.innerHTML = recentes.map(receita => `
        <li style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px solid #edf1f2;">
            <div>
                <strong>${receita.descricao}</strong>
                <p style="font-size: 0.85rem; color: #94a3b8; margin: 4px 0 0 0;">
                    ${formatarData(receita.data_mov)} • ${receita.categoria}
                </p>
            </div>
            <div style="text-align: right;">
                <p style="color: #22c55e; font-weight: 600; margin: 0;">
                    + ${formatarMoeda(receita.valor)}
                </p>
                <button onclick="deletarReceita(${receita.id})" 
                    style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 0.85rem;">
                    Deletar
                </button>
            </div>
        </li>
    `).join('');
}

// Função para deletar receita
async function deletarReceita(id) {
    if (confirm('Tem certeza que deseja deletar esta receita?')) {
        const sucesso = await gerenciadorReceitas.deletar(id);
        if (sucesso) {
            await atualizarListaRecentes();
            await atualizarDashboard();
        }
    }
}

// Atualizar dashboard com dados salvos
async function atualizarDashboard() {
    const totalReceitas = await gerenciadorReceitas.calcularTotal();
    const elementoReceitas = document.querySelector('.card-moneytrack .valor-receita');
    const elementoSaldo = document.querySelector('.card-moneytrack .valor-total');
    
    if (elementoReceitas) {
        elementoReceitas.textContent = '+ ' + formatarMoeda(totalReceitas);
    }
    
    if (elementoSaldo) {
        elementoSaldo.textContent = formatarMoeda(totalReceitas);
    }
}

// Executar quando a página carregar
document.addEventListener('DOMContentLoaded', async function() {
    await inicializarFormularioReceitas();
    await atualizarListaRecentes();
    await atualizarDashboard();
});

