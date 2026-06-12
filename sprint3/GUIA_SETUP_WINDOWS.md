# Guia Prático - Importar SQL e Iniciar Servidor PHP (Windows)

## ⚠️ PRÉ-REQUISITOS

Você precisa ter instalado no seu computador:
1. **XAMPP** ou **WAMP** (inclui MySQL + PHP)
   - Download: https://www.apachefriends.org/
   - Ou: https://www.wampserver.com/

> Os arquivos `importar-sql.bat` e `iniciar-servidor.bat` foram atualizados para funcionar em qualquer pasta do Windows.
> Basta executar estes arquivos na pasta raiz do projeto, mesmo que o projeto esteja em um caminho diferente de `C:\xampp`.

---

## 🔧 OPÇÃO 1: Usando XAMPP (Recomendado para iniciantes)

### Passo 1: Instalar XAMPP
1. Baixe em: https://www.apachefriends.org/
2. Execute o instalador
3. Selecione Apache, MySQL e PHP
4. Instale em `C:\xampp\` (padrão)

### Passo 2: Colocar seu projeto no XAMPP
1. Abra a pasta `C:\xampp\htdocs\`
2. Cole sua pasta `sprint3` lá
3. Agora o caminho será: `C:\xampp\htdocs\sprint3\`

### Passo 3: Iniciar o MySQL e Apache
1. Abra o painel do XAMPP
   - Procure por "XAMPP Control Panel" no seu PC
   
2. Clique em "Start" ao lado de:
   - ✅ **Apache**
   - ✅ **MySQL**

3. Ambos ficarão com fundo verde (rodando)

### Passo 4: Importar o SQL via PhpMyAdmin
1. Abra seu navegador
2. Acesse: **http://localhost/phpmyadmin**
3. Você verá a tela do PhpMyAdmin

4. Clique em **"Importar"** (menu superior)

5. Clique em **"Selecionar arquivo"**

6. Navegue até:
   ```
   C:\xampp\htdocs\sprint3\database\moneytrack.sql
   ```

7. Selecione e clique em **"Abrir"**

8. Clique no botão **"Executar"** (em azul)

9. ✅ Pronto! O banco foi criado!

### Passo 5: Acessar seu projeto
Abra o navegador e acesse:
```
http://localhost/sprint3/receitas.html
```

---

## 💻 OPÇÃO 2: Usando Linha de Comando (Windows)

### Passo 1: Instalar MySQL e PHP
- Se você já tem XAMPP/WAMP instalado, pule para Passo 2

### Passo 2: Abrir o Prompt de Comando do MySQL
1. Abra o **Prompt de Comando** (CMD):
   - Pressione `Win + R`
   - Digite `cmd`
   - Pressione Enter

2. Navegue até a pasta do MySQL:
   ```bash
   cd C:\xampp\mysql\bin
   ```
   
   Ou se usou WAMP:
   ```bash
   cd C:\wamp\bin\mysql\mysql5.7.11\bin
   ```

### Passo 3: Executar o SQL
1. No Prompt de Comando, execute:
   ```bash
   mysql -u root
   ```
   
   Se tiver senha (exemplo: senha123):
   ```bash
   mysql -u root -p
   ```
   (Ele pedirá a senha, digite e pressione Enter)

2. Você verá `mysql>` (significa que entrou no MySQL)

3. Cole o seguinte comando:
   ```sql
   source C:\path\para\seu\sprint3\database\moneytrack.sql;
   ```
   
   Exemplo (ajuste conforme seu caminho):
   ```sql
   source C:\Users\Pedro\Downloads\sprint3\sprint3\database\moneytrack.sql;
   ```

4. Pressione Enter
5. Será executado! ✅

### Passo 4: Sair do MySQL
```bash
exit
```

### Passo 5: Iniciar Servidor PHP
1. Abra um novo Prompt de Comando
2. Navegue até sua pasta do projeto:
   ```bash
   cd C:\Users\Pedro\Downloads\sprint3\sprint3
   ```

3. Execute:
   ```bash
   php -S localhost:8000
   ```

4. Você verá:
   ```
   [Wed Jun 08 22:36:27 2026] PHP 8.0.0 Development Server started at http://localhost:8000
   ```

5. Mantenha esse Prompt aberto! (não feche!)

### Passo 6: Acessar seu projeto
Abra seu navegador e acesse:
```
http://localhost:8000/receitas.html
```

---

## ✅ RESUMO VISUAL

### Com XAMPP:
```
XAMPP Control Panel (abrir)
    ↓
Clicar "Start" em Apache e MySQL
    ↓
Navegador → http://localhost/phpmyadmin
    ↓
Importar moneytrack.sql
    ↓
Navegador → http://localhost/sprint3/receitas.html
    ✅ Pronto!
```

### Com Linha de Comando:
```
CMD → cd para pasta mysql
    ↓
mysql -u root
    ↓
source C:\path\moneytrack.sql;
    ↓
exit
    ↓
CMD → cd para pasta sprint3
    ↓
php -S localhost:8000
    ↓
Navegador → http://localhost:8000/receitas.html
    ✅ Pronto!
```

---

## 🚨 PROBLEMAS COMUNS

### "mysql não é reconhecido"
- Adicione MySQL ao PATH do Windows
- Ou use a pasta correta (C:\xampp\mysql\bin ou C:\wamp\bin\mysql\...)

### "Connection refused"
- Verifique se MySQL está rodando
- No XAMPP: Apache e MySQL devem estar com fundo verde

### "Porta 8000 já está em uso"
Use outra porta:
```bash
php -S localhost:8001
```

### "Database does not exist"
- A importação do SQL não funcionou
- Tente novamente via PhpMyAdmin

---

## 📞 DÚVIDAS?

Se não conseguir:
1. Tente a OPÇÃO 1 (XAMPP) primeiro
2. Se ainda tiver problema, copie a mensagem de erro
3. Compartilhe comigo para ajudar
