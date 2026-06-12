async function buscarCategorias() {
    try {
        const response = await fetch('../api/categorias.php?acao=listar');
        const dados = await response.json();
        return dados.sucesso ? dados.dados : [];
    } catch (erro) {
        console.error('Erro ao buscar categorias:', erro);
        return [];
    }
}

async function criarCategoria(nome, tipo = 'ambas') {
    try {
        const response = await fetch('../api/categorias.php?acao=adicionar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, tipo })
        });
        return await response.json();
    } catch (erro) {
        console.error('Erro ao salvar categoria:', erro);
        return { sucesso: false, erro: erro.message };
    }
}

async function deletarCategoria(id) {
    try {
        const response = await fetch('../api/categorias.php?acao=deletar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        return await response.json();
    } catch (erro) {
        console.error('Erro ao deletar categoria:', erro);
        return { sucesso: false, erro: erro.message };
    }
}

function renderizarCategorias(categorias) {
    const lista = document.querySelector('.lista-categorias');
    if (!lista) return;

    if (categorias.length === 0) {
        lista.innerHTML = '<li style="color: #94a3b8; padding: 16px;">Nenhuma categoria cadastrada ainda.</li>';
        return;
    }

    lista.innerHTML = categorias.map(categoria => `
        <li class="categoria-item" style="display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 12px; border-bottom: 1px solid #e2e8f0;">
            <div>
                <strong>${categoria.nome}</strong>
                <p style="margin: 4px 0 0 0; color: #64748b; font-size: 0.85rem;">Tipo: ${categoria.tipo}</p>
            </div>
            <button type="button" class="btn-cancelar" style="padding: 6px 10px; font-size: 0.85rem;" onclick="removerCategoria(${categoria.id})">Excluir</button>
        </li>
    `).join('');
}

async function atualizarCategorias() {
    const categorias = await buscarCategorias();
    renderizarCategorias(categorias);
}

async function removerCategoria(id) {
    if (!confirm('Deseja realmente excluir esta categoria?')) {
        return;
    }

    const resultado = await deletarCategoria(id);
    if (resultado.sucesso) {
        await atualizarCategorias();
        alert('Categoria excluída com sucesso.');
    } else {
        alert('Erro ao excluir categoria: ' + (resultado.erro || 'Erro desconhecido.'));
    }
}

async function inicializarCategorias() {
    const formulario = document.querySelector('form[id="form-categoria"]');
    if (!formulario) return;

    formulario.addEventListener('submit', async function(event) {
        event.preventDefault();

        const nomeInput = document.getElementById('nome');
        const tipoInput = document.getElementById('tipo_categoria');
        const nome = nomeInput.value.trim();
        const tipo = tipoInput ? tipoInput.value : 'ambas';

        if (!nome) {
            alert('Informe o nome da categoria.');
            return;
        }

        const resultado = await criarCategoria(nome, tipo);
        if (resultado.sucesso) {
            nomeInput.value = '';
            if (tipoInput) tipoInput.value = 'ambas';
            await atualizarCategorias();
            alert('Categoria salva com sucesso!');
        } else {
            alert('Erro ao salvar categoria: ' + (resultado.erro || 'Erro desconhecido.'));
        }
    });

    await atualizarCategorias();
}

document.addEventListener('DOMContentLoaded', inicializarCategorias);
