-- Criar banco de dados (caso ainda não exista)
-- Execute essa parte fora da conexão se necessário
-- CREATE DATABASE cafeteria;

-- Usar o banco (necessário se estiver executando interativamente)
-- \c cafeteria;

-- Criação da tabela de ingredientes
CREATE TABLE IF NOT EXISTS ingredientes (
                                            id SERIAL PRIMARY KEY,
                                            nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('base', 'adicional'))
    );

-- Ingredientes base (evita duplicatas usando WHERE NOT EXISTS)
INSERT INTO ingredientes (nome, tipo)
SELECT * FROM (VALUES
                   ('Espresso', 'base'),
                   ('Leite', 'base'),
                   ('Chocolate', 'base'),
                   ('Sorvete', 'base'),
                   ('Espuma', 'base')
              ) AS new_ingredientes(nome, tipo)
WHERE NOT EXISTS (
    SELECT 1 FROM ingredientes WHERE ingredientes.nome = new_ingredientes.nome
);

-- Ingredientes adicionais
INSERT INTO ingredientes (nome, tipo)
SELECT * FROM (VALUES
                   ('Caramelo', 'adicional'),
                   ('Calda de Chocolate', 'adicional'),
                   ('Chantilly', 'adicional'),
                   ('Canela', 'adicional')
              ) AS new_ingredientes(nome, tipo)
WHERE NOT EXISTS (
    SELECT 1 FROM ingredientes WHERE ingredientes.nome = new_ingredientes.nome
);
