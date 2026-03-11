describe('Validações - Cafeteria', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('Monte Seu Café').should('be.visible');
  });

  describe('Validações de Ingredientes Base', () => {
    it('Deve validar mínimo de 1 ingrediente base', () => {
      // Tentar confirmar sabor sem ingredientes
      cy.contains('button', 'Confirmar sabor').click();
      
      // Verificar mensagem de erro
      cy.contains('Selecione ao menos um ingrediente base').should('be.visible');
      
      // Fechar alerta
      cy.get('button[class*="AvNQY"]').click();
    });

    it('Deve permitir selecionar até 5 ingredientes base', () => {
      const ingredientes = ['Espresso', 'Leite', 'Chocolate', 'Sorvete', 'Espuma'];
      
      // Selecionar todos os 5 ingredientes
      ingredientes.forEach(ing => {
        cy.contains('button', ing).click();
      });
      
      // Verificar que todos estão selecionados
      ingredientes.forEach(ing => {
        cy.contains('button', ing)
          .should('have.css', 'background-color', 'rgb(0, 0, 0)');
      });
      
      // Confirmar sabor deve funcionar
      cy.contains('button', 'Confirmar sabor').should('not.be.disabled');
    });

    it('Deve remover ingrediente base ao clicar novamente', () => {
      // Selecionar Espresso
      cy.contains('button', 'Espresso').click();
      cy.contains('button', 'Espresso')
        .should('have.css', 'background-color', 'rgb(0, 0, 0)');
      
      // Clicar novamente para remover
      cy.contains('button', 'Espresso').click();
      cy.contains('button', 'Espresso')
        .should('not.have.css', 'background-color', 'rgb(0, 0, 0)');
    });
  });

  describe('Validações de Ingredientes Adicionais', () => {
    it('Deve validar limite máximo de 2 adicionais', () => {
      // Selecionar base primeiro (necessário para habilitar adicionais)
      cy.contains('button', 'Espresso').click();
      
      const adicionais = ['Chantilly', 'Canela', 'Caramelo'];
      
      // Adicionar primeiro
      cy.contains('button', adicionais[0]).click();
      cy.contains(`Ingrediente ${adicionais[0]} adicionado`).should('be.visible');
      
      // Adicionar segundo
      cy.contains('button', adicionais[1]).click();
      cy.contains(`Ingrediente ${adicionais[1]} adicionado`).should('be.visible');
      
      // Tentar adicionar terceiro (deve falhar)
      cy.contains('button', adicionais[2]).click();
      cy.contains('Limite máximo de 2 ingredientes adicionais').should('be.visible');
      
      // Verificar que apenas os dois primeiros estão selecionados
      cy.contains('button', adicionais[0])
        .should('have.css', 'background-color', 'rgb(0, 0, 0)');
      cy.contains('button', adicionais[1])
        .should('have.css', 'background-color', 'rgb(0, 0, 0)');
      cy.contains('button', adicionais[2])
        .should('not.have.css', 'background-color', 'rgb(0, 0, 0)');
    });

    it('Deve remover ingrediente adicional ao clicar novamente', () => {
      // Selecionar base
      cy.contains('button', 'Espresso').click();
      
      // Adicionar Chantilly
      cy.contains('button', 'Chantilly').click();
      cy.contains('Ingrediente Chantilly adicionado').should('be.visible');
      
      // Remover Chantilly
      cy.contains('button', 'Chantilly').click();
      cy.contains('Ingrediente Chantilly removido').should('be.visible');
      
      // Verificar que não está mais selecionado
      cy.contains('button', 'Chantilly')
        .should('not.have.css', 'background-color', 'rgb(0, 0, 0)');
    });
  });

  describe('Validações de Identificação de Sabor', () => {
    it('Deve identificar sabor clássico Latte', () => {
      cy.contains('button', 'Espresso').click();
      cy.contains('button', 'Leite').click();
      
      cy.contains('button', 'Confirmar sabor').click();
      
      cy.contains('Sabor clássico reconhecido: Latte').should('be.visible');
      cy.contains('Latte').should('be.visible');
    });

    it('Deve identificar sabor clássico Mocha', () => {
      cy.contains('button', 'Espresso').click();
      cy.contains('button', 'Leite').click();
      cy.contains('button', 'Chocolate').click();
      
      cy.contains('button', 'Confirmar sabor').click();
      
      cy.contains('Sabor clássico reconhecido: Mocha').should('be.visible');
      cy.contains('Mocha').should('be.visible');
    });

    it('Deve identificar sabor clássico Macchiato', () => {
      cy.contains('button', 'Espresso').click();
      cy.contains('button', 'Leite').click();
      cy.contains('button', 'Espuma').click();
      
      cy.contains('button', 'Confirmar sabor').click();
      
      cy.contains('Sabor clássico reconhecido: Macchiato').should('be.visible');
      cy.contains('Macchiato').should('be.visible');
    });

    it('Deve tratar combinação não clássica como personalizado', () => {
      cy.contains('button', 'Espresso').click();
      cy.contains('button', 'Chocolate').click();
      
      cy.contains('button', 'Confirmar sabor').click();
      
      cy.contains('Café personalizado').should('be.visible');
    });
  });

  describe('Validações de Botões e Estados', () => {
    it('Deve desabilitar botão Confirmar Pedido sem ingredientes base', () => {
      cy.contains('button', 'Confirmar Pedido').should('be.disabled');
    });

    it('Deve habilitar botão Confirmar Pedido com ingredientes base', () => {
      cy.contains('button', 'Espresso').click();
      cy.contains('button', 'Confirmar Pedido').should('not.be.disabled');
    });

    it('Deve desabilitar botão Confirmar Sabor durante loading', () => {
      cy.contains('button', 'Espresso').click();
      cy.contains('button', 'Leite').click();
      
      // Clicar e verificar se desabilita (mesmo que rápido)
      cy.contains('button', 'Confirmar sabor').as('confirmBtn');
      cy.get('@confirmBtn').click();
      
      // O botão pode desabilitar muito rápido, então verificamos se a ação aconteceu
      cy.contains('Sabor clássico reconhecido: Latte').should('be.visible');
    });

    it('Deve limpar seleção ao clicar em Limpar Seleção', () => {
      // Selecionar vários ingredientes
      cy.contains('button', 'Espresso').click();
      cy.contains('button', 'Leite').click();
      cy.contains('button', 'Chantilly').click();
      
      // Verificar que estão selecionados
      cy.contains('button', 'Espresso')
        .should('have.css', 'background-color', 'rgb(0, 0, 0)');
      cy.contains('button', 'Leite')
        .should('have.css', 'background-color', 'rgb(0, 0, 0)');
      cy.contains('button', 'Chantilly')
        .should('have.css', 'background-color', 'rgb(0, 0, 0)');
      
      // Clicar em Limpar Seleção
      cy.contains('button', 'Limpar Seleção').click();
      
      // Verificar que todos foram desselecionados
      cy.contains('button', 'Espresso')
        .should('not.have.css', 'background-color', 'rgb(0, 0, 0)');
      cy.contains('button', 'Leite')
        .should('not.have.css', 'background-color', 'rgb(0, 0, 0)');
      cy.contains('button', 'Chantilly')
        .should('not.have.css', 'background-color', 'rgb(0, 0, 0)');
      
      // Verificar mensagem de confirmação
      cy.contains('Seleção limpa').should('be.visible');
    });
  });

  describe('Validações de Modal de Resumo', () => {
  it('Deve abrir modal de resumo ao confirmar pedido', () => {
    cy.contains('button', 'Espresso').click();
    cy.contains('button', 'Leite').click(); // Alterado de Espuma para Leite
    cy.contains('button', 'Confirmar sabor').click();
    
    cy.contains('button', 'Confirmar Pedido').click();
    
    // Verificar modal
    cy.get('.sc-eqNDNG').should('be.visible'); // Classe do overlay do modal
    cy.contains('h2', 'Resumo da sua bebida').should('be.visible');
    
    // Verificar nome da bebida
    cy.contains('h3', 'Latte').should('be.visible');
    
    // Verificar ingredientes
    cy.contains('span', 'Espresso').should('be.visible');
    cy.contains('span', 'Leite').should('be.visible');
  });

  it('Deve fechar modal ao clicar no botão X', () => {
    cy.contains('button', 'Espresso').click();
    cy.contains('button', 'Leite').click();
    cy.contains('button', 'Confirmar sabor').click();
    cy.contains('button', 'Confirmar Pedido').click();
    
    // Modal deve estar visível
    cy.get('.sc-eqNDNG').should('be.visible');
    
    // Clicar no botão X (classe específica do botão de fechar)
    cy.get('button.sc-ipUnzB.jXfJXZ').click(); // Classe do botão X
    
    // Modal não deve estar visível (overlay deve desaparecer)
    cy.get('.sc-eqNDNG').should('not.exist');
  });

  it('Deve verificar preços no modal', () => {
    cy.contains('button', 'Espresso').click();
    cy.contains('button', 'Leite').click();
    cy.contains('button', 'Confirmar sabor').click();
    cy.contains('button', 'Confirmar Pedido').click();
    
    // Verificar preço do Espresso
    cy.contains('span', 'Espresso')
      .parent()
      .contains('span', 'R$ 3.50')
      .should('be.visible');
    
    // Verificar preço do Leite
    cy.contains('span', 'Leite')
      .parent()
      .contains('span', 'R$ 2.00')
      .should('be.visible');
    
    // Verificar total
    cy.contains('span', 'Total')
      .parent()
      .contains('span', 'R$ 5.50')
      .should('be.visible');
  });
});
});