function formatarMoeda(valor) {
    const valorNumerico = Number(valor);
    const sinal = valorNumerico < 0 ? '- ' : '';
    return sinal + new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(Math.abs(valorNumerico));
}

async function buscarTotalReceitas() {
    try {
        const response = await fetch('../api/receitas.php?acao=total');
        const dados = await response.json();
        return dados.sucesso ? parseFloat(dados.total) || 0 : 0;
    } catch (erro) {
        console.error('Erro ao buscar total de receitas:', erro);
        return 0;
    }
}

async function buscarTotalDespesas() {
    try {
        const response = await fetch('../api/despesas.php?acao=total');
        const dados = await response.json();
        return dados.sucesso ? parseFloat(dados.total) || 0 : 0;
    } catch (erro) {
        console.error('Erro ao buscar total de despesas:', erro);
        return 0;
    }
}

async function atualizarDashboard() {
    const totalReceitas = await buscarTotalReceitas();
    const totalDespesas = await buscarTotalDespesas();
    const saldoTotal = totalReceitas - totalDespesas;

    const elementoReceitas = document.querySelector('.valor-receita');
    const elementoDespesas = document.querySelector('.valor-despesa');
    const elementoSaldo = document.querySelector('.valor-total');

    if (elementoReceitas) {
        elementoReceitas.textContent = '+ ' + formatarMoeda(totalReceitas);
    }
    if (elementoDespesas) {
        elementoDespesas.textContent = '- ' + formatarMoeda(totalDespesas);
    }
    if (elementoSaldo) {
        elementoSaldo.textContent = formatarMoeda(saldoTotal);
    }
}

document.addEventListener('DOMContentLoaded', atualizarDashboard);
