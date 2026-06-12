-- Criar banco de dados MoneyTrack
CREATE DATABASE IF NOT EXISTS moneytrack;
USE moneytrack;

-- Tabela de Receitas
CREATE TABLE IF NOT EXISTS receitas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(255) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    data_mov DATE NOT NULL,
    categoria VARCHAR(100),
    tipo VARCHAR(20) DEFAULT 'receita',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Despesas (mesmo formato)
CREATE TABLE IF NOT EXISTS despesas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(255) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    data_mov DATE NOT NULL,
    categoria VARCHAR(100),
    tipo VARCHAR(20) DEFAULT 'despesa',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Categorias
CREATE TABLE IF NOT EXISTS categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL UNIQUE,
    tipo ENUM('receita', 'despesa', 'ambas') DEFAULT 'ambas',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir categorias padrão
INSERT INTO categorias (nome, tipo) VALUES
('Salário', 'receita'),
('Freela', 'receita'),
('Venda', 'receita'),
('Investimento', 'receita'),
('Mercado', 'despesa'),
('Assinaturas', 'despesa'),
('Pets', 'despesa'),
('Transporte', 'despesa'),
('Saúde', 'ambas');
