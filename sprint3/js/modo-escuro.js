// Gerenciador de Modo Escuro
class ModoEscuro {
    constructor() {
        this.chaveArmazenamento = 'moneytrack-modo-escuro';
        this.modoEscuroAtivo = this.carregarPreferencia();
        this.inicializar();
    }

    carregarPreferencia() {
        const modo = localStorage.getItem(this.chaveArmazenamento);
        
        if (modo !== null) {
            return modo === 'true';
        }

        // Se não tiver preferência salva, usar preferência do SO
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    salvarPreferencia(ativo) {
        localStorage.setItem(this.chaveArmazenamento, ativo ? 'true' : 'false');
    }

    aplicarTema(ativo) {
        const html = document.documentElement;
        if (ativo) {
            html.setAttribute('data-tema', 'escuro');
        } else {
            html.removeAttribute('data-tema');
        }
        this.modoEscuroAtivo = ativo;
        this.salvarPreferencia(ativo);
    }

    alternarModo() {
        this.aplicarTema(!this.modoEscuroAtivo);
        this.atualizarBotao();
    }

    inicializar() {
        // Aplicar tema salvo
        this.aplicarTema(this.modoEscuroAtivo);
        
        // Criar e adicionar botão flutuante
        this.criarBotaoFltuante();
        
        // Ouvir mudanças nas preferências do SO
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (localStorage.getItem(this.chaveArmazenamento) === null) {
                this.aplicarTema(e.matches);
                this.atualizarBotao();
            }
        });
    }

    criarBotaoFltuante() {
        // Verificar se o botão já existe
        if (document.getElementById('botao-modo-escuro')) return;

        const botao = document.createElement('button');
        botao.id = 'botao-modo-escuro';
        botao.className = 'botao-modo-escuro';
        botao.setAttribute('aria-label', 'Alternar modo escuro');
        botao.innerHTML = this.modoEscuroAtivo 
            ? '<i class="bx bx-sun"></i>' 
            : '<i class="bx bx-moon"></i>';
        
        botao.addEventListener('click', () => {
            this.alternarModo();
        });

        document.body.appendChild(botao);
    }

    atualizarBotao() {
        const botao = document.getElementById('botao-modo-escuro');
        if (botao) {
            botao.innerHTML = this.modoEscuroAtivo 
                ? '<i class="bx bx-sun"></i>' 
                : '<i class="bx bx-moon"></i>';
        }
    }
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ModoEscuro();
    });
} else {
    new ModoEscuro();
}
