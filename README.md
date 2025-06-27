# Sistema Web de Biblioteca – Backend (Node.js + PostgreSQL + Docker)

API para gerenciamento de login e cadastro de livros, com autenticação via JWT, banco PostgreSQL e testes com Cypress.
---
# Licenças
[![License](https://img.shields.io/badge/License-Apache%202.0-yellowgreen.svg)](https://opensource.org/licenses/Apache-2.0) [![Open Source Love svg2](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges)
# Ferramentas e Linguagens Utilizadas
### Ferramentas 🛠️
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SEUUSERNAME) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-000?style=for-the-badge&logo=postgresql) ![Windows](https://img.shields.io/badge/Windows-000?style=for-the-badge&logo=windows&logoColor=2CA5E0) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)

### Linguagens 👩‍💻

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) <img src="https://img.shields.io/badge/SQL-336791?style=for-the-badge&logoColor=white" />

---
## Estrutura de Pastas
```bash
├── backend/                      # Backend da aplicação (Node.js + Express)

│   ├── controllers/              # (Opcional) Lógica separada das rotas

│   ├── models/                   # (Opcional) Modelos e funções de acesso ao banco

│   ├── routes/                   # Rotas da API

│   │   ├── authRoutes.js         # Rotas de login/autenticação

│   │   └── livroRoutes.js        # Rotas de cadastro e consulta de livros

│   ├── server.js                 # Ponto de entrada da API (Express)

│   ├── package.json              # Configuração de dependências do Node.js

│   └── Dockerfile                # Dockerfile da API para build da imagem

├── cypress/                      # Testes automatizados de frontend/backend

│   └── e2e/                      # Testes end-to-end (ex: login.cy.js)

├── docker-compose.yml            # Orquestração dos containers API e banco

├── init.sql                      # Script SQL para criação das tabelas e dados iniciais


└── README.md                     # Documentação do projeto
```

## Como rodar o projeto
### Pré-requisitos:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Passos:

1. Limpar containers e volumes (opcional, mas recomendado para resetar banco):
```bash
docker-compose down -v
```
2. Subir os containers e construir a imagem da API:
```bash
docker-compose up --build
```
3. Aguarde a mensagem: **Servidor rodando na porta 3000**

## Dados iniciais (via init.sql)

### Usuário padrão para login:
```bash
{
"email": "teste@teste.com",
"password": "123456"
}
```
### Livros já cadastrados:
Título   | Autor | Ano
--------- | ------ | ------
Dom Casmurro | Machado de Assis | 1899
O Alienista	| Machado de Assis | 1882
Capitães da Areia |	Jorge Amado	| 1937

## Rotas da API
1. GET /auth
   1.1 Teste simples da rota base de autenticação.
    * Request:
```bash
http://localhost:3000/auth
```
* Response:
```bash
{ "mensagem": "Rota base /auth funcionando!" }
```

2. POST /auth/login
   2.2 Login com email e senha, retorna JWT.
* Request:
```bash
http://localhost:3000/auth/login
```
* Content-Type: application/json
```bash
{
  "email": "teste@teste.com",
  "password": "123456"
}
```
* Response:
```bash
{
  "token": "<JWT válido por 1h>"
}
```
3. GET /livros/all
   3.3 Retorna todos os livros cadastrados.
* Request:
```bash
http://localhost:3000/livros/all
```
* Response:
```bash
[
  {
    "id": 1,
    "titulo": "Dom Casmurro",
    "autor": "Machado de Assis",
    "ano": 1899,
    "user_id": 1
  },
  {
    "id": 2,
    "titulo": "O Alienista",
    "autor": "Machado de Assis",
    "ano": 1882,
    "user_id": 1
  },
  {
    "id": 3,
    "titulo": "Capitães da Areia",
    "autor": "Jorge Amado",
    "ano": 1937,
    "user_id": 1
  }
]
```
4. POST /livros
   4.4 Cadastra um novo livro.
* Request:
```bash
http://localhost:3000/livros
```
* Content-Type: application/json
```bash
{
  "titulo": "A Hora da Estrela",
  "autor": "Clarice Lispector",
  "ano": 1977,
  "user_id": 1
}

```
* Response:
```bash
{
  "id": 4,
  "titulo": "A Hora da Estrela",
  "autor": "Clarice Lispector",
  "ano": 1977,
  "user_id": 1
}
```
## init.sql (script do banco de dados)
```bash
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS livros (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(100),
  autor VARCHAR(100),
  ano INT,
  user_id INT REFERENCES users(id)
);

-- Inserção do usuário padrão com senha "123456" já criptografada
INSERT INTO users (email, password)
VALUES ('teste@teste.com', '$2b$10$WzpbvZ7gjwZxUbbfJkxMTOTjzFQ7sWrmLnkY.cAmMlCEAfXERyXQG')
ON CONFLICT (email) DO NOTHING;

-- Inserção de livros exemplo
INSERT INTO livros (titulo, autor, ano, user_id) VALUES
('Dom Casmurro', 'Machado de Assis', 1899, 1),
('O Alienista', 'Machado de Assis', 1882, 1),
('Capitães da Areia', 'Jorge Amado', 1937, 1)
ON CONFLICT DO NOTHING;
```
## Dockerfile (backend/Dockerfile)
```bash
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```
## docker-compose.yml
```bash
services:
  db:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: library
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql

  api:
    build: ./backend
    restart: always
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      - DB_HOST=db
      - DB_USER=postgres
      - DB_PASSWORD=postgres
      - DB_NAME=library
    command: npm start

volumes:
  pgdata:

```