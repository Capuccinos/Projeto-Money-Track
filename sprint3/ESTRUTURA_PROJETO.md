# 📁 Estrutura do Projeto MoneyTrack

## Visão Geral

O projeto MoneyTrack foi reorganizado para manter os arquivos HTML separados em uma pasta dedicada (`/html`), mantendo a clareza e organização do projeto.

---

## 🗂️ Estrutura de Pastas

```
sprint3/
├── index.html                  # Arquivo raiz - redireciona para html/login.html
├── 
├── 📂 html/                    # ⭐ TODOS OS ARQUIVOS HTML AQUI
│   ├── login.html              # Página de login
│   ├── cadastro.html           # Página de cadastro
│   ├── dashboard.html          # Dashboard principal
│   ├── receitas.html           # Página de receitas
│   ├── despesas.html           # Página de despesas
│   ├── transacoes.html         # Página de transações
│   ├── metas.html              # Página de metas
│   ├── categorias.html         # Página de categorias
│   ├── perfil.html             # Página de perfil
│   └── sidebar.html            # Componente sidebar (incluído em outros)
│
├── 📂 css/                     # Estilos CSS
│   └── estilo.css              # Folha de estilos principal (com dark mode)
│
├── 📂 js/                      # Scripts JavaScript
│   ├── app.js                  # Script geral da aplicação
│   ├── dashboard.js            # Lógica do dashboard
│   ├── receitas.js             # Lógica de receitas
│   ├── despesas.js             # Lógica de despesas
│   ├── transacoes.js           # Lógica de transações
│   ├── metas.js                # Lógica de metas (localStorage)
│   ├── categorias.js           # Lógica de categorias
│   └── modo-escuro.js          # Controle de tema claro/escuro
│
├── 📂 api/                     # APIs PHP (Backend)
│   ├── receitas.php            # API de receitas
│   ├── despesas.php            # API de despesas
│   └── categorias.php          # API de categorias
│
├── 📂 config/                  # Configurações
│   └── db.php                  # Configuração do banco de dados
│
├── 📂 database/                # Banco de dados
│   └── moneytrack.sql          # Arquivo SQL para importar
│
├── iniciar-servidor.bat        # Script para iniciar servidor PHP (Windows)
├── importar-sql.bat            # Script para importar banco de dados (Windows)
├── GUIA_SETUP_WINDOWS.md       # Guia de setup para Windows
├── SETUP_MYSQL.md              # Guia de setup do MySQL
└── README.md                   # Documentação geral
```

---

## 🔗 Caminhos Relativos

### Dentro de arquivos HTML (em `/html/`)

Os arquivos HTML na pasta `/html/` usam caminhos relativos com `../` para acessar recursos fora da pasta:

```html
<!-- CSS -->
<link rel="stylesheet" href="../css/estilo.css">

<!-- JavaScript -->
<script src="../js/app.js"></script>
<script src="../js/modo-escuro.js"></script>
```

### Links entre páginas HTML

Os links entre páginas HTML na mesma pasta `/html/` não precisam de `../`:

```html
<!-- Navegação entre páginas (mesma pasta) -->
<a href="dashboard.html">Dashboard</a>
<a href="login.html">Login</a>
<a href="metas.html">Metas</a>
```

---

## 🚀 Como Acessar o Projeto

### Ao iniciar o servidor:

1. **Execute**: `iniciar-servidor.bat`
2. **Será aberto**: `http://localhost:8000/html/login.html`

### Ou acesse manualmente:

- **Login**: `http://localhost:8000/html/login.html`
- **Cadastro**: `http://localhost:8000/html/cadastro.html`
- **Dashboard**: `http://localhost:8000/html/dashboard.html`
- **Receitas**: `http://localhost:8000/html/receitas.html`
- **Despesas**: `http://localhost:8000/html/despesas.html`
- **Transações**: `http://localhost:8000/html/transacoes.html`
- **Metas**: `http://localhost:8000/html/metas.html`
- **Categorias**: `http://localhost:8000/html/categorias.html`
- **Perfil**: `http://localhost:8000/html/perfil.html`

### Redirecionamento automático:

Se acessar `http://localhost:8000/`, será redirecionado automaticamente para `http://localhost:8000/html/login.html`

---

## 💾 Armazenamento de Dados

### 🌐 Backend (MySQL)

- **Receitas**: Tabela `receitas` (API: `/api/receitas.php`)
- **Despesas**: Tabela `despesas` (API: `/api/despesas.php`)
- **Categorias**: Tabela `categorias` (API: `/api/categorias.php`)

### 💻 Frontend (localStorage)

- **Metas**: Armazenadas em `localStorage` com chave `moneytrack_metas`
- **Modo Escuro**: Preferência salva em `localStorage` com chave `moneytrack-modo-escuro`

---

## 🎨 Funcionalidades

### Dark Mode 🌙

- Ativado via botão flutuante fixo em todas as páginas
- Preferência persistida no navegador (localStorage)
- Detecta preferência do SO (se não houver preferência salva)
- Afeta todos os elementos: botões, formulários, cards, tabelas, etc.

### Responsive Design 📱

- Todas as páginas são responsivas
- Botão flutuante de modo escuro se adapta a telas menores
- Sidebar se oculta em dispositivos móveis

---

## 🔧 Scripts Auxiliares

### `iniciar-servidor.bat`

- Auto-detecta PHP na pasta PATH
- Busca em locais comuns do XAMPP
- Permite input manual se não encontrar
- Inicia servidor em `localhost:8000`
- Abre navegador automaticamente em `http://localhost:8000/html/login.html`

### `importar-sql.bat`

- Auto-detecta MySQL na pasta PATH
- Busca em locais comuns do XAMPP
- Permite input manual se não encontrar
- Importa o banco de dados `database/moneytrack.sql`

---

## 📝 Notas Importantes

1. **Todos os arquivos HTML estão em `/html/`** - Facilita manutenção e limpeza da raiz
2. **Caminhos relativos foram ajustados** - Use `../` para acessar recursos fora de `/html/`
3. **Links entre páginas funcionam normalmente** - Não precisam de `../` pois estão na mesma pasta
4. **O arquivo `index.html` redireciona** - Acesso à raiz é redirecionado para login
5. **Modo escuro é persistido** - Preferência é salva no navegador do usuário
6. **Metas usam localStorage** - Não precisam de backend permanente

---

## ✨ Atualizações Recentes

- ✅ Reorganização de arquivos HTML em pasta dedicada
- ✅ Atualização de caminhos relativos em todos os arquivos
- ✅ Criação de `index.html` para redirecionamento
- ✅ Atualização do `iniciar-servidor.bat` para apontar à pasta correta
- ✅ Implementação de Dark Mode em todas as páginas
- ✅ Integração de APIs de receitas e despesas
- ✅ Sistema de categorias com backend MySQL
- ✅ Sistema de metas com localStorage

