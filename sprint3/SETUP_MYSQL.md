# Configuração do Sistema MoneyTrack com MySQL

## 1. Criar o Banco de Dados

Execute o arquivo SQL para criar o banco de dados:

```bash
mysql -u root -p < database/moneytrack.sql
```

**Ou via PhpMyAdmin:**
1. Abra PhpMyAdmin (http://localhost/phpmyadmin)
2. Clique em "Importar"
3. Selecione o arquivo `database/moneytrack.sql`
4. Clique em "Executar"

## 2. Configurar o PHP

No arquivo `config/db.php`, altere as credenciais do MySQL se necessário:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', ''); // Sua senha do MySQL
define('DB_NAME', 'moneytrack');
```

## 3. Iniciar o Servidor PHP

Na pasta raiz do projeto, execute:

```bash
php -S localhost:8000
```

Ou se usar XAMPP/WAMP, coloque a pasta em `htdocs/` e acesse via `http://localhost/sprint3/`

## 4. Estrutura de Arquivos

```
sprint3/
├── api/
│   └── receitas.php         # API que gerencia as receitas no MySQL
├── config/
│   └── db.php               # Configuração de conexão com MySQL
├── database/
│   └── moneytrack.sql       # Script para criar o banco de dados
├── js/
│   └── receitas.js          # JavaScript que faz requisições à API
├── receitas.html            # Página de receitas
├── dashboard.html           # Dashboard
└── ...outros arquivos
```

## 5. Como Funciona

- **receitas.html** → Formulário para adicionar receitas
- **js/receitas.js** → Faz requisições HTTP à API
- **api/receitas.php** → Gerencia dados no MySQL
- **dashboard.html** → Exibe total de receitas do banco

## 6. Endpoints da API

### Adicionar Receita
```
POST /api/receitas.php?acao=adicionar
Body: {
  "descricao": "Salário",
  "valor": 3000.00,
  "data_mov": "2026-06-08",
  "categoria": "Salário"
}
```

### Listar Receitas
```
GET /api/receitas.php?acao=listar&limite=5
```

### Total de Receitas
```
GET /api/receitas.php?acao=total
```

### Deletar Receita
```
POST /api/receitas.php?acao=deletar
Body: { "id": 1 }
```

### Listar Categorias
```
GET /api/receitas.php?acao=categorias
```

## 7. Troubleshooting

**Erro: "Connection refused"**
- Verifique se o MySQL está rodando
- Verifique as credenciais em `config/db.php`

**Erro: "Database does not exist"**
- Execute novamente o arquivo `database/moneytrack.sql`

**Dados não salvando**
- Verifique se o servidor PHP está rodando
- Verifique os logs do navegador (F12 > Console)

## 8. Próximos Passos

Para adicionar despesas, siga o mesmo padrão:
1. Crie `api/despesas.php`
2. Crie `js/despesas.js`
3. Use a tabela `despesas` no MySQL
