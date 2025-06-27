const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    res.send('Rota base /auth funcionando!');
});

// Rota POST de login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id }, 'segredo', { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
