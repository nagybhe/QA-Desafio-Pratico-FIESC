class SaborClassico {
    constructor(id, nome, descricao, ingredientes = []) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.ingredientes = ingredientes; // array de IDs
    }

    static fromRow(row) {
        return new SaborClassico(
            row.id,
            row.nome,
            row.descricao,
            row.ingredientes_ids ? row.ingredientes_ids : []
        );
    }
}

module.exports = SaborClassico;