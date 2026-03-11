const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Given('que estou na página de montar café', async function () {
  // Implementação: navegar para a página
  await this.page.goto('http://localhost:3001');
});

When('a página carregar', async function () {
  // Aguardar elementos carregarem
  await this.page.waitForSelector('button:contains("Espresso")');
});

Then('devo ver uma lista de ingredientes base contendo:', async function (dataTable) {
  const ingredientes = dataTable.hashes();
  for (const item of ingredientes) {
    const elemento = await this.page.$(`button:contains("${item.ingrediente}")`);
    assert.ok(elemento, `Ingrediente ${item.ingrediente} não encontrado`);
  }
});

Then('devo ver uma lista de ingredientes adicionais contendo:', async function (dataTable) {
  const ingredientes = dataTable.hashes();
  for (const item of ingredientes) {
    const elemento = await this.page.$(`button:contains("${item.ingrediente}")`);
    assert.ok(elemento, `Ingrediente ${item.ingrediente} não encontrado`);
  }
});

When('eu clicar no ingrediente {string}', async function (ingrediente) {
  await this.page.click(`button:contains("${ingrediente}")`);
});

Then('o botão do {string} deve mudar de cor', async function (ingrediente) {
  const botao = await this.page.$(`button:contains("${ingrediente}")`);
  const cor = await botao.evaluate(el => window.getComputedStyle(el).backgroundColor);
  assert.notEqual(cor, 'rgba(0, 0, 0, 0)', 'Botão não mudou de cor');
});

Then('deve ficar visualmente diferente dos não selecionados', async function () {
  const selecionado = await this.page.$('button[style*="background-color: rgb(0, 0, 0)"]');
  assert.ok(selecionado, 'Nenhum botão parece selecionado');
});

When('eu não selecionar nenhum ingrediente base', async function () {
  // Não fazer nada, apenas garantir que nenhum está selecionado
  const selecionados = await this.page.$$('button[style*="background-color: rgb(0, 0, 0)"]');
  for (const btn of selecionados) {
    await btn.click();
  }
});

When('tentar confirmar o sabor', async function () {
  await this.page.click('button:contains("Confirmar sabor")');
});

Then('devo ver uma mensagem {string}', async function (mensagem) {
  await this.page.waitForSelector(`text="${mensagem}"`);
  const elemento = await this.page.$(`text="${mensagem}"`);
  assert.ok(elemento, `Mensagem "${mensagem}" não encontrada`);
});

When('eu selecionar {int} ingredientes adicionais', async function (quantidade) {
  const adicionais = ['Chantilly', 'Canela', 'Caramelo'];
  for (let i = 0; i < quantidade; i++) {
    await this.page.click(`button:contains("${adicionais[i]}")`);
  }
});

Then('apenas os 2 primeiros devem ser selecionados', async function () {
  const adicionais = ['Chantilly', 'Canela', 'Caramelo'];
  
  // Verificar primeiros estão selecionados
  for (let i = 0; i < 2; i++) {
    const botao = await this.page.$(`button:contains("${adicionais[i]}")`);
    const cor = await botao.evaluate(el => window.getComputedStyle(el).backgroundColor);
    assert.equal(cor, 'rgb(0, 0, 0)', `${adicionais[i]} deveria estar selecionado`);
  }
  
  // Verificar terceiro não está selecionado
  const botao3 = await this.page.$(`button:contains("${adicionais[2]}")`);
  const cor3 = await botao3.evaluate(el => window.getComputedStyle(el).backgroundColor);
  assert.notEqual(cor3, 'rgb(0, 0, 0)', `${adicionais[2]} não deveria estar selecionado`);
});

Then('devo ver uma mensagem de limite excedido', async function () {
  await this.page.waitForSelector('text="Limite máximo de 2 ingredientes adicionais"');
  const elemento = await this.page.$('text="Limite máximo de 2 ingredientes adicionais"');
  assert.ok(elemento, 'Mensagem de limite não encontrada');
});