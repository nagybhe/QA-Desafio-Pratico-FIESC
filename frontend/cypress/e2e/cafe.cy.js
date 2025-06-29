describe('Testes da aplicação Café', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Carrega a página inicial', () => {
        cy.contains('Monte Seu Café').should('exist');
    });

    it('Exibe ingredientes base ao carregar', () => {
        cy.get('button').contains('Confirmar sabor').should('exist'); // Confirma que o botão existe
    });

    it('Alerta se tentar confirmar sem ingrediente base', () => {
        cy.get('button').contains('Confirmar sabor').click();
        cy.contains('Selecione ao menos um ingrediente base!').should('exist');
    });

    it('Seleciona base e confirma sabor', () => {
        cy.get('button').contains('Espresso').click(); // Seleciona Espresso
        cy.get('button').contains('Confirmar sabor').click();
        cy.contains('Você criou um').should('exist'); // Verifica se o resultado aparece
    });

    it('Abre o modal de resumo da bebida', () => {
        cy.get('button').contains('Espresso').click();
        cy.get('button').contains('Confirmar sabor').click();
        cy.get('button').contains('Adicione').click(); // Abre o modal
        cy.contains('Resumo da sua bebida').should('exist'); // Confirma título do modal
        cy.get('button').contains('Fechar').click(); // Fecha o modal
        cy.contains('Resumo da sua bebida').should('not.exist'); // Confirma que modal sumiu
    });
});
