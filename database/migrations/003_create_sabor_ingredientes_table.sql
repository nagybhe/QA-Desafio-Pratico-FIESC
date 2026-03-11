-- Migration 003: Tabela de relacionamento (sabor x ingredientes)
CREATE TABLE IF NOT EXISTS sabor_ingredientes (
    id SERIAL PRIMARY KEY,
    sabor_id INTEGER NOT NULL REFERENCES sabores_classicos(id) ON DELETE CASCADE,
    ingrediente_id INTEGER NOT NULL REFERENCES ingredientes(id) ON DELETE CASCADE,
    UNIQUE(sabor_id, ingrediente_id)
);