-- Migration 005: Functions e Triggers

-- Criar extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers
DROP TRIGGER IF EXISTS update_ingredientes_updated_at ON ingredientes;
CREATE TRIGGER update_ingredientes_updated_at 
    BEFORE UPDATE ON ingredientes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_sabores_classicos_updated_at ON sabores_classicos;
CREATE TRIGGER update_sabores_classicos_updated_at 
    BEFORE UPDATE ON sabores_classicos 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();