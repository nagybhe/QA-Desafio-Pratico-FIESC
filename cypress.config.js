const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'yevj97', // <- Adicionado para Cypress Dashboard

  e2e: {
    // caminho dos seus testes
    specPattern: 'frontend/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    // URL base para os testes rodarem
    baseUrl: 'http://localhost:8080',
  },
})
