require('dotenv').config();
const express = require('express');
const cors = require('cors');

const ingredienteRoutes = require('./src/routes/ingredienteRoutes');
const cafeRoutes = require('./src/routes/cafeRoutes');
const pedidoRoutes = require('./src/routes/pedidoRoutes'); // NOVA ROTA

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotas
app.use('/ingredientes', ingredienteRoutes);
app.use('/cafes', cafeRoutes);
app.use('/pedidos', pedidoRoutes); // NOVA ROTA

// Rota de teste
app.get('/', (req, res) => {
    res.json({ 
        mensagem: 'API da Cafeteria está rodando!',
        endpoints: {
            ingredientes: '/ingredientes',
            cafes: '/cafes',
            pedidos: '/pedidos'
        }
    });
});

// Tratamento de erros global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ erro: 'Erro interno do servidor' });
});

// 404
app.use((req, res) => {
    res.status(404).json({ erro: 'Rota não encontrada' });
});


if (require.main === module) {
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
}

module.exports = app; // Exportar app para os testes