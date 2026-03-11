const request = require('supertest');
const path = require('path');

process.env.NODE_ENV = 'test';

require('dotenv').config({ 
  path: path.resolve(__dirname, '../../../../backend/.env.test'),
  override: true
});

const app = require(path.resolve(__dirname, '../../../../backend/server'));
const db = require(path.resolve(__dirname, '../../../../backend/src/config/database'));

describe('Integração - Rotas de Ingredientes', () => {
  beforeAll(async () => {
    await db.pool.connect();
  });

  afterAll(async () => {
    await db.pool.end();
  });

  describe('GET /ingredientes/base', () => {
    it('deve retornar lista de ingredientes base', async () => {
      const response = await request(app).get('/ingredientes/base');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /ingredientes/adicionais', () => {
    it('deve retornar lista de ingredientes adicionais', async () => {
      const response = await request(app).get('/ingredientes/adicionais');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /ingredientes/:id', () => {
    it('deve retornar ingrediente por ID', async () => {
      const response = await request(app).get('/ingredientes/1');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
    });
  });
});