describe('Teste de persistência do estado da seleção', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Mantém seleção após interação simples', () => {
        // Seleciona ingredientes base
        cy.get('button').contains('Espresso').click();
        cy.get('button').contains('Leite').click();

        // Confirma sabor
        cy.get('button').contains('Confirmar sabor').click();

        // Volta para seleção base (simulação de navegação simples)
        cy.reload();

        // Deve manter as seleções anteriores
        cy.get('button').contains('Espresso').should('have.css', 'background-color', 'rgb(0, 0, 0)');
        cy.get('button').contains('Leite').should('have.css', 'background-color', 'rgb(0, 0, 0)');

        // E o sabor clássico deve continuar visível
        cy.contains('Você criou um').should('exist');
    });
});
