-- Migration 004: Tabelas de pedidos

-- Tabela de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id SERIAL PRIMARY KEY,
    nome_bebida VARCHAR(200) NOT NULL,
    sabor_identificado_id INTEGER REFERENCES sabores_classicos(id),
    preco_total DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'finalizado',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de itens do pedido
CREATE TABLE IF NOT EXISTS pedido_itens (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
    ingrediente_id INTEGER NOT NULL REFERENCES ingredientes(id) ON DELETE CASCADE,
    quantidade INTEGER DEFAULT 1,
    preco_unitario DECIMAL(10,2)
);