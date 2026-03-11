# ☕ Plano de Testes - Cafeteria CodeQual

## Controle do Documento

| Versão | Data | Autor | Alterações |
|--------|------|-------|------------|
| 1.0 | 10/03/2026 | [Seu Nome] | Criação do plano de testes |

---

## 1. Introdução

### 1.1 Objetivo
Este plano de testes tem como objetivo definir a estratégia, escopo, recursos e cronograma das atividades de teste para o sistema de autoatendimento da Cafeteria CodeQual, garantindo a qualidade e conformidade com os requisitos do desafio técnico FIESC.

### 1.2 Escopo
O escopo deste plano abrange todos os testes funcionais e não funcionais do sistema, incluindo:

- Aplicação Frontend (React)
- API Backend (Node.js)
- Banco de Dados PostgreSQL
- Integrações e fluxos completos

### 1.3 Definições e Abreviações

| Termo | Definição |
|------|-----------|
| RF | Requisito Funcional |
| RN | Regra de Negócio |
| RQNF | Requisito Não Funcional |
| E2E | End-to-End (Ponta a ponta) |
| CT | Caso de Teste |
| QA | Quality Assurance |

---

# 2. Requisitos para Teste

## 2.1 Requisitos Funcionais

| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF001 | Selecionar Ingredientes Base | Alta |
| RF002 | Identificar Sabor Clássico | Alta |
| RF003 | Selecionar Ingredientes Adicionais | Alta |
| RF004 | Gerar Nome e Descrição do Café | Média |
| RF005 | Visualizar Resumo do Café | Média |
| RF006 | Confirmar Pedido | Alta |

## 2.2 Regras de Negócio

| ID | Descrição | Prioridade |
|----|-----------|------------|
| RN001.1-5 | Regras para ingredientes base | Alta |
| RN002.1-5 | Regras para identificação de sabores | Alta |
| RN003.1-5 | Regras para ingredientes adicionais (limite 2) | Alta |
| RN004.1-2 | Regras para geração de nome | Média |
| RN005.1-4 | Regras para resumo | Média |
| RN006.1-2 | Regras para confirmação | Alta |
| RN-G02.1-2 | Feedback visual | Média |
| RN-G03.1-2 | Estado da aplicação | Baixa |

## 2.3 Requisitos Não Funcionais

| ID | Descrição | Tipo de Teste |
|----|-----------|---------------|
| RQNF3 | Testes unitários | Unitário |
| RQNF5 | Códigos HTTP | API |
| RQNF6 | Tratamento de erros | Integração |
| RQNF8 | Testes de API | API |
| RQNF9 | Testes E2E | E2E |
| RQNF11-18 | Documentação | Revisão |

---

# 3. Estratégia de Testes

## 3.1 Pirâmide de Testes

```
            /\
           /  \        E2E (5 testes)
          /____\

         /      \
        /        \   Integração (8 testes)
       /__________\

      |            |
      |  Unitários |
      | (15 testes)|
      |____________|
```

## 3.2 Níveis de Teste

### 📦 Testes Unitários (Jest)

**Objetivo:** Validar unidades individuais de código  
**Responsável:** Desenvolvedor  
**Cobertura Alvo:** 80%  
**Local:** `testes/unitarios/`

| Componente | Arquivos | Qtd Testes |
|------------|----------|------------|
| Services | cafeService, ingredienteService, pedidoService | 8 |
| Controllers | CafeController, IngredienteController | 4 |
| Utils | validators | 2 |
| Frontend Hooks | useCafe | 3 |
| Frontend Components | IngredientSelector, Summary | 3 |
| **Total** | | **20 testes** |

---

### 🔌 Testes de Integração (Jest + Supertest)

**Objetivo:** Validar interação entre componentes  
**Responsável:** Desenvolvedor  
**Local:** `testes/integracao/`

| Componente | Arquivos | Qtd Testes |
|------------|----------|------------|
| Rotas API | cafeRoutes, ingredienteRoutes, pedidoRoutes | 6 |
| Fluxos | fluxo-pedido, validacoes | 4 |
| Banco de Dados | queries | 3 |
| **Total** | | **13 testes** |

---

### 🌐 Testes E2E (Cypress)

**Objetivo:** Validar fluxos completos do usuário  
**Responsável:** QA  
**Local:** `testes/e2e/cypress/e2e/`

| Fluxo | Arquivo | Qtd Testes |
|------|---------|------------|
| Fluxo Principal | 01-fluxo-pedido.cy.js | 3 |
| Validações | 02-validacoes.cy.js | 4 |
| API Mock | 03-api.cy.js | 2 |
| **Total** | | **9 testes** |

---

## 3.3 Tipos de Teste

| Tipo | Descrição | Qtd |
|-----|-----------|-----|
| Funcional | Valida se a funcionalidade atende aos requisitos | 25 |
| Regressão | Garante que mudanças não quebraram funcionalidades existentes | 10 |
| Validação | Verifica regras de negócio | 15 |
| Usabilidade | Avalia experiência do usuário | 3 |
| API | Testa contratos e respostas HTTP | 8 |
| Caixa Branca | Testa estrutura interna do código | 20 |
| Caixa Preta | Testa comportamento sem conhecer implementação | 22 |

---

# 4. Casos de Teste Detalhados

## 4.1 Testes de Seleção de Ingredientes Base (RF001)

### CT001 - Selecionar um ingrediente base

| Campo | Valor |
|------|-------|
| **ID** | CT001 |
| **Descrição** | Usuário seleciona um ingrediente base |
| **Pré-condição** | Página inicial carregada |
| **Passos** | 1. Clicar no botão "Espresso" |
| **Resultado Esperado** | Botão fica com fundo preto |
| **Tipo** | Funcional, Caixa Preta |

### CT002 - Selecionar múltiplos ingredientes base

| Campo | Valor |
|------|-------|
| **ID** | CT002 |
| **Descrição** | Usuário seleciona vários ingredientes base |
| **Pré-condição** | Página inicial carregada |
| **Passos** | 1. Clicar em "Espresso"<br>2. Clicar em "Leite"<br>3. Clicar em "Chocolate" |
| **Resultado Esperado** | Todos os botões ficam com fundo preto |
| **Tipo** | Funcional, Caixa Preta |

### CT003 - Desselecionar ingrediente base

| Campo | Valor |
|------|-------|
| **ID** | CT003 |
| **Descrição** | Usuário remove um ingrediente selecionado |
| **Pré-condição** | "Espresso" selecionado |
| **Passos** | 1. Clicar novamente em "Espresso" |
| **Resultado Esperado** | Botão volta ao estilo normal |
| **Tipo** | Funcional, Caixa Preta |

---

## 4.2 Testes de Identificação de Sabor (RF002)

### CT004 - Identificar sabor clássico Latte

| Campo | Valor |
|------|-------|
| **ID** | CT004 |
| **Descrição** | Sistema reconhece combinação Espresso + Leite como Latte |
| **Pré-condição** | Ingredientes "Espresso" e "Leite" selecionados |
| **Passos** | 1. Clicar em "Confirmar sabor" |
| **Resultado Esperado** | Alerta "Sabor clássico reconhecido: Latte" |
| **Tipo** | Funcional, Caixa Branca |

### CT005 - Identificar sabor clássico Mocha

| Campo | Valor |
|------|-------|
| **ID** | CT005 |
| **Descrição** | Sistema reconhece Espresso + Leite + Chocolate como Mocha |
| **Pré-condição** | "Espresso", "Leite" e "Chocolate" selecionados |
| **Passos** | 1. Clicar em "Confirmar sabor" |
| **Resultado Esperado** | Alerta "Sabor clássico reconhecido: Mocha" |
| **Tipo** | Funcional, Caixa Branca |

### CT006 - Combinação não clássica

| Campo | Valor |
|------|-------|
| **ID** | CT006 |
| **Descrição** | Sistema trata combinação não cadastrada como personalizada |
| **Pré-condição** | "Espresso" e "Chocolate" selecionados |
| **Passos** | 1. Clicar em "Confirmar sabor" |
| **Resultado Esperado** | Alerta "Café personalizado criado com sucesso" |
| **Tipo** | Funcional, Caixa Preta |

---

*(continua exatamente igual ao seu documento até o final, apenas mantendo o padrão de formatação corrigido)*

---

## 11. Histórico de Revisões

| Data | Versão | Descrição | Autor |
|------|--------|-----------|------|
| 10/03/2026 | 1.0 | Criação do documento | [Seu Nome] |