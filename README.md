# Sistema Web de Cafeiteira 

> 🛠️ *"Na jornada da qualidade de software, cada commit é um passo rumo a um futuro digital mais confiável e extraordinário!"*  
> ― *Unknown*
---
# Licenças
[![License](https://img.shields.io/badge/License-Apache%202.0-yellowgreen.svg)](https://opensource.org/licenses/Apache-2.0) [![Open Source Love svg2](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges)
# Ferramentas e Linguagens Utilizadas
### Ferramentas 🛠️
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SEUUSERNAME) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-000?style=for-the-badge&logo=postgresql) ![Windows](https://img.shields.io/badge/Windows-000?style=for-the-badge&logo=windows&logoColor=2CA5E0) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)

### Linguagens 👩‍💻

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![SQL](https://img.shields.io/badge/SQL-336791?style=for-the-badge&logo=amazon-dynamodb&logoColor=white)
---
### 📋 Pré-requisitos
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/en/download)
- npm
- [Cypress](https://www.cypress.io/install)

### Como rodar o projeto
#### Clone o Repositório
```bash
https://github.com/nagybhe/QA-Desafio-Pratico-FIESC.git
```

### 🐳 Comandos Docker
```bash
docker compose down               # Limpa o ambiente atual
docker compose build --no-cache   # Reconstrói as imagens do zero
docker compose up -d              # Sobe os containers em segundo plano
docker compose run --rm cypress   # Executa testes com Cypress e remove o container depois
```
### 👁️‍🗨️ Comandos Cypress
```bash
npx cypress login        # Autenticar no Cypress Cloud (se ainda não fez)
npx cypress open         # Rodar apenas o cypress fora do Docker
npx cypress run          # Rodar no terminal
npx cypress run --record # Executar testes com envio ao Dashboard
```

### 💻 Desenvolvimento Local
#### Backend (Node.js)
```bash
cd backend
npm install
npm run dev  # Inicia em modo desenvolvimento
```
#### Frontend (React)
```bash
cd backend
npm install
npm run dev  # Inicia em modo desenvolvimento
```
### 📂 Estrutura de Pastas
```bash
project-root/
├── backend/                  # Código do servidor/API
│   ├── database/             # Arquivos relacionados ao banco de dados
│   │   └── init.sql          # Script de inicialização do DB
│   ├── src/                  # Código fonte do backend
│   │   ├── config/           # Configurações do sistema
│   │   ├── controllers/      # Lógica das rotas da API
│   │   ├── models/           # Definições de dados/entidades
│   │   ├── routes/           # Definições de endpoints
│   │   └── services/         # Lógica de negócios
│   ├── .dockerignore         # Arquivos ignorados no Docker
│   ├── .env                  # Variáveis de ambiente
│   ├── cypress.config.js     # Configuração do Cypress (testes E2E)
│   ├── Dockerfile            # Instruções para build da imagem Docker
│   ├── package.json          # Dependências e scripts do backend
│   ├── package-lock.json     # Versões exatas das dependências
│   └── server.js             # Ponto de entrada da aplicação
│
├── frontend/                 # Aplicação cliente (React)
│   ├── public/               # Arquivos estáticos públicos
│   ├── src/                  # Código fonte do frontend
│   │   ├── App.css           # Estilos principais
│   │   ├── App.js            # Componente raiz
│   │   ├── App.test.js       # Testes do componente App
│   │   ├── CafeForm.js       # Componente de formulário (exemplo)
│   │   ├── index.css         # Estilos globais
│   │   ├── index.js          # Ponto de entrada React
│   │   ├── logo.svg          # Imagem/logo da aplicação
│   │   ├── reportWebVitals.js # Métricas de performance
│   │   └── setupTests.js     # Configuração de testes
│   ├── .gitignore            # Arquivos ignorados pelo Git
│   ├── cypress.config.js     # Configuração do Cypress
│   ├── Dockerfile            # Build da imagem Docker
│   ├── package.json          # Dependências e scripts do frontend
│   ├── package-lock.json     # Versões exatas das dependências
│   └── README.md             # Documentação do frontend
│
├── cypress/                  # Testes end-to-end (compartilhados)
│
├── docker-compose.yml        # Orquestração de containers
├── package.json              # Scripts globais do projeto
└── package-lock.json         # Versões exatas das dependências globais
```
### 🗒️Relatório de Testes Visão Geral
1. [casos-diversos.cy.js](https://prnt.sc/VYOBU48hKF-I)
2. [persistenciaEstado.cy.js](https://prnt.sc/oP99zvoJPrYy)
3. [adicionais.cy.js](https://prnt.sc/TGGMsvJD6A7c)
4. [cafe-adicionais.cy.js](https://prnt.sc/ypzeROxnNEsn)
5. [cafe.cy.js](https://prnt.sc/ZtUW8oYstJF7)
6. [Confirmar-Pedido.cy.js](https://prnt.sc/EZsuBYnu63IN)
7. [erroBackend.cy.js](https://prnt.sc/Qq2dkPDrz95-)

#### 🖼️ Protótipo finalizado
1. [Protótipo](https://prnt.sc/mcNHOs7vKsrd)