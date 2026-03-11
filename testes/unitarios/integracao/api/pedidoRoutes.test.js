const request = require('supertest');
const path = require('path');

process.env.NODE_ENV = 'test';

require('dotenv').config({ 
  path: path.resolve(__dirname, '../../../../backend/.env.test'),
  override: true
});

const app = require(path.resolve(__dirname, '../../../../backend/server'));
const db = require(path.resolve(__dirname, '../../../../backend/src/config/database'));

describe('Integração - Rotas de Pedidos', () => {
  beforeAll(async () => {
    await db.pool.connect();
  });

  afterAll(async () => {
    await db.pool.end();
  });

  describe('GET /pedidos', () => {
    it('deve retornar lista de pedidos', async () => {
      const response = await request(app).get('/pedidos');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /pedidos/:id', () => {
    it('deve retornar 404 para ID inexistente', async () => {
      const response = await request(app).get('/pedidos/9999');
      expect(response.status).toBe(404);
    });
  });
});