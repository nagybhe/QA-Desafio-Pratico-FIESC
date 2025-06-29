const express = require('express');
const bodyParser = require('body-parser');

const ingredienteRoutes = require('./src/routes/ingredienteRoutes');
const cafeRoutes = require('./src/routes/cafeRoutes');

const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

// Rotas principais da API
app.use('/ingredientes', ingredienteRoutes);
app.use('/cafes', cafeRoutes);

// Rota raiz (saúde da API)
app.get('/', (req, res) => {
    res.status(200).send('🚀 API da Cafeteria está rodando!');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${port}`);
});

