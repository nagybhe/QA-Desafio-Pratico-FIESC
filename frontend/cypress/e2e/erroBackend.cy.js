describe('Teste de tratamento de erros do backend', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Exibe mensagem de erro ao falhar identificação do sabor clássico', () => {
        // Força backend a retornar erro via interceptação
        cy.intercept('POST', '/cafes/identificar', {
            statusCode: 500,
            body: {},
        });

        cy.get('button').contains('Espresso').click();
        cy.get('button').contains('Confirmar sabor').click();

        cy.contains('Erro ao verificar sabor clássico').should('exist');
    });
});
