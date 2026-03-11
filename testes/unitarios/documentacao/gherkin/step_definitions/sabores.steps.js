const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Given('que estou na página de montar café', async function () {
  await this.page.goto('http://localhost:3001');
});

Given('selecionei ingredientes base', async function () {
  // Já estamos na página, pronto para selecionar
});

When('eu selecionar os ingredientes {string} e {string}', async function (ing1, ing2) {
  await this.page.click(`button:contains("${ing1}")`);
  await this.page.click(`button:contains("${ing2}")`);
});

When('eu selecionar os ingredientes {string}, {string} e {string}', async function (ing1, ing2, ing3) {
  await this.page.click(`button:contains("${ing1}")`);
  await this.page.click(`button:contains("${ing2}")`);
  await this.page.click(`button:contains("${ing3}")`);
});

When('eu selecionar apenas o ingrediente {string}', async function (ingrediente) {
  await this.page.click(`button:contains("${ingrediente}")`);
});

When('clicar em {string}', async function (botao) {
  await this.page.click(`button:contains("${botao}")`);
});

Then('devo ver a mensagem {string}', async function (mensagem) {
  await this.page.waitForSelector(`text="${mensagem}"`);
  const elemento = await this.page.$(`text="${mensagem}"`);
  assert.ok(elemento, `Mensagem "${mensagem}" não encontrada`);
});

Then('o resumo deve mostrar {string} como nome da bebida', async function (nomeEsperado) {
  await this.page.waitForSelector(`text="${nomeEsperado}"`);
  const elemento = await this.page.$(`text="${nomeEsperado}"`);
  assert.ok(elemento, `Nome "${nomeEsperado}" não encontrado no resumo`);
});

Then('a interface deve destacar visualmente o nome do sabor', async function () {
  const elemento = await this.page.$('[class*="SaborNome"]');
  assert.ok(elemento, 'Elemento de sabor não encontrado');
});

Then('mostrar uma mensagem de sucesso', async function () {
  await this.page.waitForSelector('[class*="AlertBox"][type="success"]');
  const alerta = await this.page.$('[class*="AlertBox"][type="success"]');
  assert.ok(alerta, 'Alerta de sucesso não encontrado');
});