const request = require('supertest');
const path = require('path');

process.env.NODE_ENV = 'test';

require('dotenv').config({ 
  path: path.resolve(__dirname, '../../../../backend/.env.test'),
  override: true
});

const app = require(path.resolve(__dirname, '../../../../backend/server'));
const db = require(path.resolve(__dirname, '../../../../backend/src/config/database'));

describe('Integração - Rotas de Café', () => {
  beforeAll(async () => {
    await db.pool.connect();
  }, 30000);

  afterAll(async () => {
    await db.pool.end();
  }, 30000);

  describe('POST /cafes/identificar', () => {
    it('deve retornar 200 para requisição válida', async () => {
      const response = await request(app)
        .post('/cafes/identificar')
        .send({ ingredientes: [1, 2] });

      expect(response.status).toBe(200);
    }, 30000);
  });

  describe('POST /cafes/montar', () => {
    it('deve retornar 200 para requisição válida', async () => {
      const response = await request(app)
        .post('/cafes/montar')
        .send({
          ingredientesBase: [1, 2]
        });

      expect(response.status).toBe(200);
    }, 30000);
  });

  describe('POST /cafes/confirmar', () => {
    it('deve retornar 201 para pedido válido', async () => {
      const response = await request(app)
        .post('/cafes/confirmar')
        .send({
          ingredientesBase: [1, 2]
        });

      expect(response.status).toBe(201);
    }, 30000);
  });
});