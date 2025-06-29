exports.getBase = (req, res) => {
    res.status(200).json([
        "Espresso", "Leite", "Chocolate", "Sorvete", "Espuma"
    ]);
};

exports.getAdicionais = (req, res) => {
    res.status(200).json([
        "Caramelo", "Calda de Chocolate", "Chantilly", "Canela"
    ]);
};
