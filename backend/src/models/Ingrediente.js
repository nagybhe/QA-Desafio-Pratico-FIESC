// Model para ingredientes
class Ingrediente {
    constructor(id, nome, tipo, preco, disponivel) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo; // 'base' ou 'adicional'
        this.preco = preco;
        this.disponivel = disponivel;
    }

    static fromRow(row) {
        return new Ingrediente(
            row.id,
            row.nome,
            row.tipo,
            parseFloat(row.preco),
            row.disponivel
        );
    }
}

module.exports = Ingrediente;