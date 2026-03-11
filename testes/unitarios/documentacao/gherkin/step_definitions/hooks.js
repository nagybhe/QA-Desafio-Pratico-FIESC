const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');

setDefaultTimeout(60 * 1000);

Before(async function () {
  // Configurar browser para os testes
  const browser = await puppeteer.launch({ 
    headless: false, // mudar para true em CI
    slowMo: 50 // diminuir velocidade para debug
  });
  const page = await browser.newPage();
  
  this.browser = browser;
  this.page = page;
});

After(async function () {
  // Fechar browser após os testes
  if (this.browser) {
    await this.browser.close();
  }
});