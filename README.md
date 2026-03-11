# 🧪 Desafio Técnico - Analista de Qualidade Software PL

<div align="center"> <a href="./docs/DESAFIO%20T%C3%89CNICO%20-%20ANALISTA%20DE%20QUALIDADE%20JR_SR.pdf"> <img src="https://img.shields.io/badge/📄%20Desafio%20Original-Baixar%20PDF-blue?style=for-the-badge" alt="Desafio Original"/> </a> </div>

## 📋 Sobre o Desafio

Este projeto foi desenvolvido como solução para o **Desafio Técnico - Analista de Qualidade Software PL (01517/2025)**. Consiste em um sistema de autoatendimento para cafeteria onde os clientes podem montar seus cafés personalizados, selecionando ingredientes base e adicionais, com identificação automática de sabores clássicos.

**Tempo limite:**  5 dias corridos

**Data de entrega:** Dia 27 de junho de 2025 às 23h59.

## 🚀 Tecnologias Utilizadas

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest"/>
  <img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white" alt="Cypress"/>
</div>


## 📁 Estrutura do Projeto

```bash
QA-Desafio-Pratico-FIESC/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── Dockerfile
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   ├── public/
│   └── Dockerfile
│
├── database/
│   └── migrations/
│       ├── 001_create_ingredientes_table.sql
│       ├── 002_create_sabores_classicos_table.sql
│       ├── 003_create_sabor_ingredientes_table.sql
│       ├── 004_create_pedidos_tables.sql
│       ├── 005_create_functions_triggers.sql
│       └── 006_insert_initial_data.sql
│
├── testes/
│   ├── unitarios/
│   │   ├── backend/
│   │   └── frontend/
│   │
│   ├── e2e/
│   │   └── cypress/
│   │       ├── e2e/
│   │       └── fixtures/
│   │
│   ├── documentacao/
│   │   ├── gherkin/
│   │   │   ├── features/
│   │   │   └── step_definitions/
│   │   └── plano-testes.md
│   │
│   └── reports/
│
├── docs/
├── docker-compose.yml
└── README.md
```

---

## ✅ Requisitos Atendidos

### Requisitos Funcionais

| ID | Descrição | Status |
|---|---|---|
| RF001 | Selecionar Ingredientes Base | ✅ |
| RF002 | Identificar Sabor Clássico | ✅ |
| RF003 | Selecionar Ingredientes Adicionais | ✅ |
| RF004 | Gerar Nome e Descrição do Café | ✅ |
| RF005 | Visualizar Resumo do Café | ✅ |
| RF006 | Confirmar Pedido do Café | ✅ |

---

### Regras de Negócio

| ID | Descrição | Status |
|---|---|---|
| RN001.1-5 | Regras para ingredientes base | ✅ |
| RN002.1-5 | Regras para identificação de sabores | ✅ |
| RN003.1-5 | Regras para ingredientes adicionais | ✅ |
| RN004.1-2 | Regras para geração de nome | ✅ |
| RN005.1-4 | Regras para resumo | ✅ |
| RN006.1-2 | Regras para confirmação | ✅ |
| RN-G02.1-2 | Feedback visual | ✅ |
| RN-G03.1-2 | Estado da aplicação | ✅ |

---

### Requisitos Não Funcionais

| ID | Descrição | Status | Observação |
|---|---|---|---|
| RQNF1 | Linguagens OO + PostgreSQL | ✅ | Node.js / React |
| RQNF2 | Docker em contêineres distintos | ✅ | docker-compose |
| RQNF3 | Testes unitários | ✅ | 99+ testes |
| RQNF4 | Backend sem acesso público | ✅ | API local |
| RQNF5 | Códigos HTTP apropriados | ✅ | 200,201,400,404,500 |
| RQNF6 | Frontend trata erros | ✅ | Alertas |
| RQNF7 | Migrations banco | ✅ | Scripts SQL |
| RQNF8 | Testes de API | ✅ | Cypress |
| RQNF9 | Testes E2E | ✅ | Cypress |
| RQNF10 | README configuração | ✅ | Documentado |
| RQNF11 | Revisão código README | ✅ | Incluído |
| RQNF12 | Relatório SonarQube | ⏳ | Planejado |
| RQNF13 | Gherkin | ✅ | 20 cenários |
| RQNF14 | Plano de testes | ✅ | Documentado |
| RQNF15 | Caixa branca/preta | ✅ | Plano testes |
| RQNF16 | Categorias de testes | ✅ | Unit / API / E2E |
| RQNF17 | Bug identificado | ✅ | Documentado |
| RQNF18 | Requisitos não atendidos | ✅ | Documentado |

---

## 🐛 Bugs Encontrados

### Bug #001 — Preço incorreto no resumo

| Campo | Valor |
|---|---|
| Severidade | Média |
| Status | Corrigido |

**Passos para reproduzir**

1. Selecionar Espresso (3,50)
2. Selecionar Leite (2,00)
3. Confirmar pedido

**Resultado esperado**

```
Preço total: R$ 5,50
```

**Resultado atual**

```
Preço total: R$ 5,00
```

---

## ⚠️ Requisitos Não Atendidos

### RQNF12 — Relatório SonarQube

Devido ao prazo limitado do desafio, foi priorizada a implementação dos requisitos obrigatórios.

O relatório SonarQube está planejado para versões futuras.

---

## ⚙️ Configuração do Ambiente

### Pré-requisitos

- Node.js 18+
- npm 9+
- PostgreSQL 15+
- Docker (opcional)

---

### Instalação

```bash
git clone https://github.com/seu-usuario/QA-Desafio-Pratico-FIESC.git

cd QA-Desafio-Pratico-FIESC
```

Instalar dependências

```bash
cd backend
npm install

cd ../frontend
npm install

cd ../testes
npm install
```

---

## 🗄️ Banco de Dados

Criar banco

```bash
sudo -u postgres psql -c "CREATE DATABASE cafeteria;"
```

Executar migrations

```bash
psql -U postgres -d cafeteria -f database/migrations/001_create_ingredientes_table.sql
psql -U postgres -d cafeteria -f database/migrations/002_create_sabores_classicos_table.sql
psql -U postgres -d cafeteria -f database/migrations/003_create_sabor_ingredientes_table.sql
psql -U postgres -d cafeteria -f database/migrations/004_create_pedidos_tables.sql
psql -U postgres -d cafeteria -f database/migrations/005_create_functions_triggers.sql
psql -U postgres -d cafeteria -f database/migrations/006_insert_initial_data.sql
```

---

## 🔐 Variáveis de Ambiente

### backend/.env

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cafeteria
DB_USER=postgres
DB_PASSWORD=postgres
```

### frontend/.env

```env
REACT_APP_API_URL=http://localhost:3000
```

---

## 🚀 Executando a Aplicação

### Com Docker

```bash
docker-compose up -d
```

| Serviço | URL |
|---|---|
| Frontend | http://localhost:3001 |
| Backend | http://localhost:3000 |
| Banco | localhost:5432 |

---

### Sem Docker

Backend

```bash
cd backend
npm start
```

Frontend

```bash
cd frontend
npm start
```

Testes

```bash
cd testes
npm test
```

---

## 🧪 Executando os Testes

### Testes Unitários

```bash
npm run test:unit:backend
```

99+ testes

---

### Testes API

```bash
npm run test:api
```

17 testes

---

### Testes E2E

```bash
npm run test:e2e
```

15+ testes

---

### Todos os testes

```bash
npm run test:all
```

---

## 📊 Cobertura de Testes

```bash
npm run test:coverage
```

Relatório gerado em

```
testes/reports/coverage
```

---

## 📘 Especificações Gherkin

Localização

```
testes/documentacao/gherkin/features
```

Features disponíveis

- ingredientes.feature
- sabores.feature
- pedido.feature

Total: **20 cenários**

---

## Plano de Testes

Documento disponível em

```
testes/documentacao/plano-testes.md
```

### Categorias de Teste

- ✅ Testes Unitários
- ✅ Testes de Integração
- ✅ Testes de API
- ✅ Testes E2E
- ✅ Testes de Regressão
- ✅ Testes de Validação

### Caixa Branca vs Caixa Preta

| Tipo | Quantidade | Exemplos |
|---|---|---|
| Caixa Branca | 50+ | Testes de services, validações internas |
| Caixa Preta | 80+ | Testes E2E, API, fluxos de usuário |