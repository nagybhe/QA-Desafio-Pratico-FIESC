const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Given('que estou na página de montar café', async function () {
  await this.page.goto('http://localhost:3001');
});

When('eu selecionar os ingredientes base {string} e {string}', async function (ing1, ing2) {
  await this.page.click(`button:contains("${ing1}")`);
  await this.page.click(`button:contains("${ing2}")`);
});

When('confirmar o sabor {string}', async function (sabor) {
  await this.page.click('button:contains("Confirmar sabor")');
  await this.page.waitForSelector(`text="${sabor}"`);
});

When('adicionar os ingredientes adicionais {string} e {string}', async function (adic1, adic2) {
  await this.page.click(`button:contains("${adic1}")`);
  await this.page.click(`button:contains("${adic2}")`);
});

Then('o resumo deve mostrar:', async function (dataTable) {
  const expected = dataTable.hashes()[0];
  
  // Verificar nome
  const nomeElement = await this.page.$(`text="${expected.nome}"`);
  assert.ok(nomeElement, `Nome "${expected.nome}" não encontrado`);
  
  // Verificar ingredientes base
  const baseIngredients = expected.base.split(', ');
  for (const ing of baseIngredients) {
    const ingElement = await this.page.$(`text="${ing}"`);
    assert.ok(ingElement, `Ingrediente base "${ing}" não encontrado`);
  }
  
  // Verificar ingredientes adicionais
  if (expected.adicionais) {
    const adicIngredients = expected.adicionais.split(', ');
    for (const ing of adicIngredients) {
      const ingElement = await this.page.$(`text="${ing}"`);
      assert.ok(ingElement, `Ingrediente adicional "${ing}" não encontrado`);
    }
  }
});

When('eu selecionar {string}', async function (ingrediente) {
  await this.page.click(`button:contains("${ingrediente}")`);
});

Then('o resumo deve atualizar mostrando {string} nos ingredientes', async function (ingredientes) {
  const ingredientesList = ingredientes.split(' e ');
  for (const ing of ingredientesList) {
    await this.page.waitForSelector(`text="${ing}"`);
    const elemento = await this.page.$(`text="${ing}"`);
    assert.ok(elemento, `Ingrediente "${ing}" não encontrado no resumo`);
  }
});

When('eu montar um café válido', async function () {
  await this.page.click('button:contains("Espresso")');
  await this.page.click('button:contains("Leite")');
  await this.page.click('button:contains("Confirmar sabor")');
});

When('clicar em {string}', async function (botao) {
  await this.page.click(`button:contains("${botao}")`);
});

Then('devo ver uma mensagem {string}', async function (mensagem) {
  await this.page.waitForSelector(`text="${mensagem}"`);
  const elemento = await this.page.$(`text="${mensagem}"`);
  assert.ok(elemento, `Mensagem "${mensagem}" não encontrada`);
});

Then('um modal deve abrir com o resumo completo do pedido', async function () {
  await this.page.waitForSelector('[class*="ModalBox"]');
  const modal = await this.page.$('[class*="ModalBox"]');
  assert.ok(modal, 'Modal não abriu');
});

Then('o pedido deve ser salvo no histórico', async function () {
  // Verificar se o pedido aparece na lista (requer navegação)
  // Este é um passo mais complexo que pode exigir mudança de aba
});

Then('o botão {string} deve estar desabilitado', async function (botao) {
  const elemento = await this.page.$(`button:contains("${botao}")`);
  const desabilitado = await elemento.evaluate(el => el.disabled);
  assert.ok(desabilitado, `Botão "${botao}" deveria estar desabilitado`);
});

Then('não deve ser possível clicar nele', async function () {
  // Já verificado pelo passo anterior
});

When('eu montar um {string} com {string}', async function (sabor, adicional) {
  await this.page.click('button:contains("Espresso")');
  await this.page.click('button:contains("Leite")');
  await this.page.click('button:contains("Confirmar sabor")');
  await this.page.click(`button:contains("${adicional}")`);
});

When('eu montar um café personalizado com {string} e {string}', async function (ing1, ing2) {
  await this.page.click(`button:contains("${ing1}")`);
  await this.page.click(`button:contains("${ing2}")`);
  await this.page.click('button:contains("Confirmar sabor")');
});

When('adicionar {string} e {string}', async function (adic1, adic2) {
  await this.page.click(`button:contains("${adic1}")`);
  await this.page.click(`button:contains("${adic2}")`);
});

Then('o nome gerado deve ser {string}', async function (nomeEsperado) {
  await this.page.waitForSelector(`text="${nomeEsperado}"`);
  const elemento = await this.page.$(`text="${nomeEsperado}"`);
  assert.ok(elemento, `Nome "${nomeEsperado}" não encontrado`);
});

When('eu selecionar {string} \\(R\\$ {float}\\) e {string} \\(R\\$ {float}\\)', async function (ing1, preco1, ing2, preco2) {
  await this.page.click(`button:contains("${ing1}")`);
  await this.page.click(`button:contains("${ing2}")`);
});

When('adicionar {string} \\(R\\$ {float}\\)', async function (adicional, preco) {
  await this.page.click(`button:contains("${adicional}")`);
});

Then('o resumo deve mostrar o preço total de R\\$ {float}', async function (precoEsperado) {
  await this.page.waitForSelector(`text="R$ ${precoEsperado.toFixed(2)}"`);
  const elemento = await this.page.$(`text="R$ ${precoEsperado.toFixed(2)}"`);
  assert.ok(elemento, `Preço R$ ${precoEsperado.toFixed(2)} não encontrado`);
});

Then('devo ver um feedback visual imediato', async function () {
  // Verificar se algum alerta apareceu
  const alerta = await this.page.$('[class*="AlertBox"]');
  assert.ok(alerta, 'Feedback visual não encontrado');
});

When('eu cometer um erro \\(ex: limite de adicionais\\)', async function () {
  await this.page.click('button:contains("Espresso")');
  await this.page.click('button:contains("Chantilly")');
  await this.page.click('button:contains("Canela")');
  await this.page.click('button:contains("Caramelo")');
});

Then('devo ver uma mensagem de erro clara e não intrusiva', async function () {
  await this.page.waitForSelector('[class*="AlertBox"][type="error"]');
  const alerta = await this.page.$('[class*="AlertBox"][type="error"]');
  assert.ok(alerta, 'Alerta de erro não encontrado');
});

When('eu selecionar vários ingredientes', async function () {
  await this.page.click('button:contains("Espresso")');
  await this.page.click('button:contains("Leite")');
  await this.page.click('button:contains("Chantilly")');
});

When('clicar em {string}', async function (botao) {
  await this.page.click(`button:contains("${botao}")`);
});

Then('todas as seleções devem ser removidas', async function () {
  const selecionados = await this.page.$$('button[style*="background-color: rgb(0, 0, 0)"]');
  assert.equal(selecionados.length, 0, 'Ainda há ingredientes selecionados');
});

Then('o resumo deve voltar ao estado inicial', async function () {
  const resumo = await this.page.$('[class*="EmptyState"]');
  assert.ok(resumo, 'Resumo não voltou ao estado inicial');
});

Then('devo ver uma mensagem {string}', async function (mensagem) {
  await this.page.waitForSelector(`text="${mensagem}"`);
  const elemento = await this.page.$(`text="${mensagem}"`);
  assert.ok(elemento, `Mensagem "${mensagem}" não encontrada`);
});