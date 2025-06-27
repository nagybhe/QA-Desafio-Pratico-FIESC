const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const livroRoutes = require('./routes/livroRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/livros', livroRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
