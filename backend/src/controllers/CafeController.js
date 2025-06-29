// src/controllers/CafeController.js

// Sabores clássicos definidos
const saboresClassicos = [
    { nome: 'Macchiato', ingredientes: ['Espresso', 'Leite', 'Espuma'] },
    { nome: 'Latte', ingredientes: ['Espresso', 'Leite'] },
    { nome: 'Mocha', ingredientes: ['Espresso', 'Leite', 'Chocolate'] },
    { nome: 'Affogato', ingredientes: ['Sorvete', 'Espresso'] }
];

// Função para identificar sabor clássico
function identificarSabor(ingredientesSelecionados) {
    for (const sabor of saboresClassicos) {
        if (
            sabor.ingredientes.length === ingredientesSelecionados.length &&
            sabor.ingredientes.every(i => ingredientesSelecionados.includes(i))
        ) {
            return sabor.nome;
        }
    }
    return null;
}

module.exports = {
    identificarSabor: (req, res) => {
        const ingredientesSelecionados = req.body.ingredientes || [];
        const sabor = identificarSabor(ingredientesSelecionados);
        if (sabor) {
            res.json({ saborClassico: sabor });
        } else {
            res.json({ saborClassico: null, mensagem: 'Café personalizado' });
        }
    }
};
