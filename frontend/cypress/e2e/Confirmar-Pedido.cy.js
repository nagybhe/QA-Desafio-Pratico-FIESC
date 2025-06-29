describe('Teste de confirmação do pedido final (adaptado ao código atual)', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Confirma montagem e visualiza resumo do café', () => {
        // Seleciona ingredientes base
        cy.get('button').contains('Espresso').click();
        cy.get('button').contains('Leite').click();

        // Confirma sabor
        cy.get('button').contains('Confirmar sabor').click();

        // Seleciona adicionais
        cy.get('button').contains('Canela').click();

        // Abre o modal de resumo clicando no botão "Adicione"
        cy.get('button').contains('Adicione').click();

        // Verifica se o modal aparece com as informações corretas
        cy.contains('Resumo da sua bebida').should('exist');
        cy.contains('Nome da Bebida:').should('exist');
        cy.contains('Espresso').should('exist');
        cy.contains('Leite').should('exist');
        cy.contains('Canela').should('exist');

        // Fecha o modal
        cy.get('button').contains('Fechar').click();

        // Verifica que o modal foi fechado
        cy.contains('Resumo da sua bebida').should('not.exist');
    });

    it('Não permite confirmar sabor sem ingredientes base', () => {
        // Tenta confirmar sabor sem selecionar base
        cy.get('button').contains('Confirmar sabor').click();

        // Deve aparecer alerta
        cy.contains('Selecione ao menos um ingrediente base!').should('exist');

        // Fecha alerta
        cy.get('button').contains('OK').click();
        cy.contains('Selecione ao menos um ingrediente base!').should('not.exist');
    });
});
