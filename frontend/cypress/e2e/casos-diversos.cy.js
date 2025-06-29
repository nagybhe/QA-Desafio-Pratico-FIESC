describe('Testes adicionais da aplicação Café', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Seleciona e desmarca ingredientes base', () => {
        cy.get('button').contains('Espresso').click().should('have.css', 'background-color', 'rgb(0, 0, 0)');
        cy.get('button').contains('Espresso').click().should('have.css', 'background-color', 'rgba(0, 0, 0, 0)'); // Desmarcado
    });

    it('Seleciona e desmarca ingredientes adicionais', () => {
        cy.get('button').contains('Caramelo').click().should('have.css', 'background-color', 'rgb(0, 0, 0)');
        cy.get('button').contains('Caramelo').click().should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
    });

    it('Não permite confirmar sabor enquanto estiver carregando', () => {
        cy.get('button').contains('Espresso').click();
        cy.intercept('POST', '/cafes/identificar', (req) => {
            // Simula delay na resposta para loading
            req.reply(res => {
                return new Promise(resolve => setTimeout(() => resolve(res), 3000));
            });
        }).as('postSabor');

        cy.get('button').contains('Confirmar sabor').click();
        cy.get('button').contains('Confirmar sabor').should('be.disabled');
        cy.wait('@postSabor');
        cy.get('button').contains('Confirmar sabor').should('not.be.disabled');
    });

    it('Botão "Adicionar" dos adicionais não faz ação', () => {
        cy.get('button').contains('Adicionar').click();
        // Confirma que modal não abriu e não tem mensagem de erro
        cy.contains('Resumo da Sua Bebida').should('not.exist');
        cy.contains('Selecione ao menos um ingrediente base!').should('not.exist');
    });

    it('Fecha o modal ao clicar no botão Fechar', () => {
        cy.get('button').contains('Espresso').click();
        cy.get('button').contains('Confirmar sabor').click();
        cy.contains('Resumo da sua escolha personalizada').click();
        cy.contains('Resumo da Sua Bebida').should('exist');
        cy.get('button').contains('Fechar').click();
        cy.contains('Resumo da Sua Bebida').should('not.exist');
    });

    it('Alerta desaparece após clicar no botão OK', () => {
        cy.get('button').contains('Confirmar sabor').click();
        cy.contains('Selecione ao menos um ingrediente base!').should('exist');
        cy.get('button').contains('OK').click();
        cy.contains('Selecione ao menos um ingrediente base!').should('not.exist');
    });
});
