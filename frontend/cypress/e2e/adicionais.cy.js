describe('Seleciona até 2 adicionais e impede seleção acima do limite', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Seleciona até 2 adicionais e impede seleção acima do limite', () => {
        // Seleciona os dois primeiros adicionais
        cy.get('button').contains('Caramelo').click();
        cy.get('button').contains('Calda de Chocolate').click();

        // Tenta selecionar o terceiro adicional
        cy.get('button').contains('Chantilly').click();

        // Verifica que Caramelo e Calda de Chocolate estão selecionados (background preto)
        cy.get('button').contains('Caramelo')
            .should('have.css', 'background-color')
            .and((bg) => {
                expect(bg).to.match(/rgb\(0,\s*0,\s*0\)/);
            });
        cy.get('button').contains('Calda de Chocolate')
            .should('have.css', 'background-color')
            .and((bg) => {
                expect(bg).to.match(/rgb\(0,\s*0,\s*0\)/);
            });

        // Verifica que Chantilly NÃO está selecionado (background transparente)
        cy.get('button').contains('Chantilly')
            .should('have.css', 'background-color')
            .and((bg) => {
                expect(bg).to.match(/rgba\(0,\s*0,\s*0,\s*0\)/);
            });

        // Agora desmarca Caramelo
        cy.get('button').contains('Caramelo').click();

        // Seleciona Chantilly novamente (deve ficar selecionado agora)
        cy.get('button').contains('Chantilly').click();

        // Verifica que Chantilly está selecionado (background preto)
        cy.get('button').contains('Chantilly')
            .should('have.css', 'background-color')
            .and((bg) => {
                expect(bg).to.match(/rgb\(0,\s*0,\s*0\)/);
            });
    });
});
