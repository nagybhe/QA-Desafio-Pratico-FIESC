describe('Testes da seção Adicionais da aplicação Café', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Exibe botões dos adicionais', () => {
        const adicionais = ['Caramelo', 'Calda de Chocolate', 'Chantilly', 'Canela'];
        adicionais.forEach(item => {
            cy.get('button').contains(item).should('exist');
        });
    });

    it('Permite selecionar e desmarcar adicionais', () => {
        cy.get('button').contains('Caramelo').click().should('have.css', 'background-color', 'rgb(0, 0, 0)');
        cy.get('button').contains('Caramelo').click().should('not.have.css', 'background-color', 'rgb(0, 0, 0)');
    });

    it('Exibe adicionais selecionados no resumo', () => {
        // Seleciona alguns adicionais
        cy.get('button').contains('Caramelo').click();
        cy.get('button').contains('Chantilly').click();

        // Seleciona pelo menos um base para poder confirmar o sabor (para ativar resumo)
        cy.get('button').contains('Espresso').click();
        cy.get('button').contains('Confirmar sabor').click();

        // Verifica no resumo se os adicionais aparecem
        cy.contains('Nenhum adicional selecionado').should('not.exist');
        cy.contains('Com Caramelo, Chantilly').should('exist');
    });

    it('Resumo mostra "Nenhum adicional selecionado" se não escolher adicionais', () => {
        cy.get('button').contains('Espresso').click();
        cy.get('button').contains('Confirmar sabor').click();

        cy.contains('Nenhum adicional selecionado').should('exist');
    });
});
