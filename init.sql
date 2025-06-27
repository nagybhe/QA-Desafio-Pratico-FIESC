-- Criação da tabela de usuários
CREATE TABLE IF NOT EXISTS users (
                                     id SERIAL PRIMARY KEY,
                                     email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
    );

-- Criação da tabela de livros
CREATE TABLE IF NOT EXISTS livros (
                                      id SERIAL PRIMARY KEY,
                                      titulo VARCHAR(100),
    autor VARCHAR(100),
    ano INT,
    user_id INT REFERENCES users(id)
    );

-- Inserção de usuário com senha já criptografada: "123456"
INSERT INTO users (email, password)
VALUES ('teste@teste.com', 'o') -- senha 123456
    ON CONFLICT (email) DO NOTHING;

-- Inserção de livros vinculados ao user_id 1
INSERT INTO livros (titulo, autor, ano, user_id) VALUES
                                                     ('Dom Casmurro', 'Machado de Assis', 1899, 1),
                                                     ('O Alienista', 'Machado de Assis', 1882, 1),
                                                     ('Capitães da Areia', 'Jorge Amado', 1937, 1)
    ON CONFLICT DO NOTHING;
