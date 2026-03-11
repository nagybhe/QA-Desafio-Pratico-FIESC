-- Migration 006: Dados iniciais

-- Ingredientes base
INSERT INTO ingredientes (nome, tipo, preco) VALUES
    ('Espresso', 'base', 3.50),
    ('Leite', 'base', 2.00),
    ('Chocolate', 'base', 2.50),
    ('Sorvete', 'base', 4.00),
    ('Espuma', 'base', 1.50)
ON CONFLICT (nome) DO NOTHING;

-- Ingredientes adicionais
INSERT INTO ingredientes (nome, tipo, preco) VALUES
    ('Caramelo', 'adicional', 1.50),
    ('Calda de Chocolate', 'adicional', 1.50),
    ('Chantilly', 'adicional', 2.00),
    ('Canela', 'adicional', 0.50),
    ('Chocolate em pó', 'adicional', 0.50),
    ('Nutella', 'adicional', 2.50)
ON CONFLICT (nome) DO NOTHING;

-- Sabores clássicos
INSERT INTO sabores_classicos (nome, descricao) VALUES
    ('Macchiato', 'Espresso com leite e espuma'),
    ('Latte', 'Espresso e leite'),
    ('Mocha', 'Espresso com leite e chocolate'),
    ('Affogato', 'Sorvete de creme com Espresso'),
    ('Espresso Puro', 'Café expresso simples'),
    ('Cappuccino', 'Espresso, leite e espuma')
ON CONFLICT (nome) DO NOTHING;

-- Relacionar ingredientes aos sabores (Macchiato)
INSERT INTO sabor_ingredientes (sabor_id, ingrediente_id)
SELECT s.id, i.id 
FROM sabores_classicos s, ingredientes i 
WHERE s.nome = 'Macchiato' AND i.nome IN ('Espresso', 'Leite', 'Espuma')
ON CONFLICT DO NOTHING;

-- Relacionar ingredientes aos sabores (Latte)
INSERT INTO sabor_ingredientes (sabor_id, ingrediente_id)
SELECT s.id, i.id 
FROM sabores_classicos s, ingredientes i 
WHERE s.nome = 'Latte' AND i.nome IN ('Espresso', 'Leite')
ON CONFLICT DO NOTHING;

-- Relacionar ingredientes aos sabores (Mocha)
INSERT INTO sabor_ingredientes (sabor_id, ingrediente_id)
SELECT s.id, i.id 
FROM sabores_classicos s, ingredientes i 
WHERE s.nome = 'Mocha' AND i.nome IN ('Espresso', 'Leite', 'Chocolate')
ON CONFLICT DO NOTHING;

-- Relacionar ingredientes aos sabores (Affogato)
INSERT INTO sabor_ingredientes (sabor_id, ingrediente_id)
SELECT s.id, i.id 
FROM sabores_classicos s, ingredientes i 
WHERE s.nome = 'Affogato' AND i.nome IN ('Sorvete', 'Espresso')
ON CONFLICT DO NOTHING;

-- Relacionar ingredientes aos sabores (Espresso Puro)
INSERT INTO sabor_ingredientes (sabor_id, ingrediente_id)
SELECT s.id, i.id 
FROM sabores_classicos s, ingredientes i 
WHERE s.nome = 'Espresso Puro' AND i.nome = 'Espresso'
ON CONFLICT DO NOTHING;

-- Relacionar ingredientes aos sabores (Cappuccino)
INSERT INTO sabor_ingredientes (sabor_id, ingrediente_id)
SELECT s.id, i.id 
FROM sabores_classicos s, ingredientes i 
WHERE s.nome = 'Cappuccino' AND i.nome IN ('Espresso', 'Leite', 'Espuma')
ON CONFLICT DO NOTHING;