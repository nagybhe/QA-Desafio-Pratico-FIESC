describe('Fluxo de Pedido - Cafeteria', () => {
  beforeEach(() => {
    // Visitar a página inicial (usa o baseUrl do config)
    cy.visit('/');

    // Esperar a página carregar completamente
    cy.contains('Monte Seu Café').should('be.visible');
  });

  it('Deve selecionar ingredientes base', () => {
    // Clicar no botão Espresso
    cy.contains('button', 'Espresso').click();

    // Verificar se o botão ficou selecionado (fundo preto)
    cy.contains('button', 'Espresso')
      .should('have.css', 'background-color')
      .and('eq', 'rgb(0, 0, 0)'); // Preto em RGB
  });

  it('Deve identificar sabor clássico Latte', () => {
    // Selecionar Espresso e Leite
    cy.contains('button', 'Espresso').click();
    cy.contains('button', 'Leite').click();

    // Clicar em Confirmar sabor
    cy.contains('button', 'Confirmar sabor').click();

    // Verificar se apareceu a mensagem de Latte
    cy.contains('Sabor clássico reconhecido: Latte').should('be.visible');

    // Verificar se o resumo mostra Latte
    cy.contains('Latte').should('be.visible');
  });

  it('Deve adicionar ingredientes adicionais (limite 2)', () => {
    // Selecionar base primeiro
    cy.contains('button', 'Espresso').click();
    cy.contains('button', 'Leite').click();

    // Adicionar Chantilly
    cy.contains('button', 'Chantilly').click();

    // Verificar alerta de adicionado
    cy.contains('Ingrediente Chantilly adicionado').should('be.visible');

    // Adicionar Canela
    cy.contains('button', 'Canela').click();

    // Verificar alerta de adicionado
    cy.contains('Ingrediente Canela adicionado').should('be.visible');

    // Tentar adicionar Caramelo (deve falhar)
    cy.contains('button', 'Caramelo').click();

    // Verificar alerta de limite
    cy.contains('Limite máximo de 2 ingredientes adicionais').should('be.visible');

    // Verificar que Caramelo não está selecionado
    cy.contains('button', 'Caramelo')
      .should('not.have.css', 'background-color', 'rgb(0, 0, 0)');
  });

  it('Deve confirmar pedido com sucesso', () => {
    // Selecionar Espresso e Leite
    cy.contains('button', 'Espresso').click();
    cy.contains('button', 'Leite').click();

    // Confirmar sabor
    cy.contains('button', 'Confirmar sabor').click();

    // Verificar sabor identificado
    cy.contains('Latte').should('be.visible');

    // Adicionar Chantilly
    cy.contains('button', 'Chantilly').click();

    // Confirmar pedido
    cy.contains('button', 'Confirmar Pedido').click();

    // Verificar alerta de sucesso
    cy.contains('Pedido confirmado').should('be.visible');

    // Verificar modal de resumo
    cy.contains('Resumo da sua bebida').should('be.visible');
    cy.contains('Latte').should('be.visible');
  });

  it('Deve validar que não pode confirmar sem ingredientes base', () => {
    // Tentar confirmar sabor sem selecionar nada
    cy.contains('button', 'Confirmar sabor').click();

    // Verificar alerta de erro
    cy.contains('Selecione ao menos um ingrediente base').should('be.visible');

    // Fechar o alerta (clicar no botão ×)
    cy.get('button[class*="AvNQY"]').click(); // Seletor baseado na classe que você mostrou

    // Verificar que o botão "Confirmar Pedido" está desabilitado
    cy.contains('button', 'Confirmar Pedido').should('be.disabled');

    // OU: verificar que o botão tem o atributo disabled
    cy.contains('button', 'Confirmar Pedido')
      .should('have.attr', 'disabled');
  });
});