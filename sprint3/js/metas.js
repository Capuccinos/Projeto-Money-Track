function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(Number(valor) || 0);
}

function formatarData(data) {
    if (!data) return '';
    return new Date(data).toLocaleDateString('pt-BR');
}

function carregarMetas() {
    try {
        const metas = localStorage.getItem('moneytrack_metas');
        return metas ? JSON.parse(metas) : [];
    } catch (erro) {
        console.error('Erro ao carregar metas:', erro);
        return [];
    }
}

function salvarMetas(metas) {
    localStorage.setItem('moneytrack_metas', JSON.stringify(metas));
}

function criarIdMeta() {
    return `meta-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function calcularProgresso(valorAtual, valorAlvo) {
    if (!valorAlvo || valorAlvo <= 0) return 0;
    return Math.min(100, Math.round((valorAtual / valorAlvo) * 100));
}

function renderizarMetas() {
    const metas = carregarMetas();
    const lista = document.getElementById('lista-metas');

    if (!lista) return;

    if (metas.length === 0) {
        lista.innerHTML = '<p style="color: #94a3b8;">Nenhuma meta cadastrada ainda.</p>';
        return;
    }

    lista.innerHTML = metas.map(meta => {
        const progresso = calcularProgresso(meta.valor_atual, meta.valor_objetivo);
        const saldoRestante = Number(meta.valor_objetivo) - Number(meta.valor_atual);
        const status = saldoRestante <= 0 ? 'Concluída' : 'Em andamento';

        return `
            <div class="meta-item" style="margin-bottom: 18px; padding: 16px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;">
                    <div>
                        <strong style="display: block; font-size: 1rem; margin-bottom: 6px;">${meta.nome}</strong>
                        <p style="margin: 0 0 8px 0; color: #64748b;">${status} • Início: ${formatarData(meta.data_inicio)} • Limite: ${formatarData(meta.data_limite)}</p>
                        <p style="margin: 0; color: #0f172a;">Valor alvo: ${formatarMoeda(meta.valor_objetivo)}</p>
                        <p style="margin: 4px 0 0 0; color: #0f172a;">Valor atual: ${formatarMoeda(meta.valor_atual)}</p>
                    </div>
                    <button type="button" onclick="removerMeta('${meta.id}')" style="background: none; border: none; color: #ef4444; cursor: pointer; font-weight: 700;">Excluir</button>
                </div>
                <div style="margin-top: 12px; height: 10px; background: #e2e8f0; border-radius: 999px; overflow: hidden;">
                    <div style="width: ${progresso}%; height: 100%; background: #22c55e;"></div>
                </div>
                <p style="margin: 8px 0 0 0; font-size: 0.85rem; color: #475569;">Progresso: ${progresso}%</p>
            </div>
        `;
    }).join('');
}

function removerMeta(id) {
    const metas = carregarMetas();
    const novasMetas = metas.filter(meta => meta.id !== id);
    salvarMetas(novasMetas);
    renderizarMetas();
}

function validarMeta(meta) {
    if (!meta.nome.trim()) {
        alert('Informe o nome da meta.');
        return false;
    }
    if (!meta.valor_objetivo || meta.valor_objetivo <= 0) {
        alert('Informe um valor alvo válido.');
        return false;
    }
    if (meta.valor_atual < 0) {
        alert('O valor inicial não pode ser negativo.');
        return false;
    }
    if (!meta.data_inicio) {
        alert('Informe a data de início.');
        return false;
    }
    if (!meta.data_limite) {
        alert('Informe a data limite.');
        return false;
    }
    if (new Date(meta.data_limite) < new Date(meta.data_inicio)) {
        alert('A data limite deve ser posterior à data de início.');
        return false;
    }
    return true;
}

function inicializarMetas() {
    const formulario = document.getElementById('form-meta');
    if (!formulario) return;

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        const meta = {
            id: criarIdMeta(),
            nome: document.getElementById('nome').value.trim(),
            valor_objetivo: Number(document.getElementById('valor_objetivo').value),
            valor_atual: Number(document.getElementById('valor_atual').value),
            data_inicio: document.getElementById('data_inicio').value,
            data_limite: document.getElementById('data_limite').value,
            data_criacao: new Date().toISOString(),
            status: 'A'
        };

        if (!validarMeta(meta)) {
            return;
        }

        const metas = carregarMetas();
        metas.unshift(meta);
        salvarMetas(metas);
        renderizarMetas();
        formulario.reset();
        alert('Meta salva com sucesso!');
    });

    renderizarMetas();
}

document.addEventListener('DOMContentLoaded', inicializarMetas);
