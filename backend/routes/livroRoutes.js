const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'library',
    password: process.env.DB_PASSWORD || 'postgres',
    port: 5432,
});


// Rota base GET para teste
router.get('/', (_req, res) => {
    res.send('Rota base /livros funcionando!');
});

// Rota POST para cadastrar livro
router.post('/', async (req, res) => {
    const { titulo, autor, ano, user_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO livros (titulo, autor, ano, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [titulo, autor, ano, user_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota GET para listar todos os livros
router.get('/all', async (_req, res) => {
    try {
        const result = await pool.query('SELECT * FROM livros');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
