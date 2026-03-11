const db = require('../config/database');
const Ingrediente = require('../models/Ingrediente');

const ingredienteService = {
    // Listar todos os ingredientes
    async listarTodos() {
        try {
            const result = await db.query(
                'SELECT * FROM ingredientes ORDER BY tipo, nome'
            );
            return result.rows.map(row => Ingrediente.fromRow(row));
        } catch (error) {
            console.error('Erro no listarTodos:', error);
            throw error;
        }
    },

    // Listar ingredientes por tipo (base ou adicional)
    async listarPorTipo(tipo) {
        try {
            const result = await db.query(
                'SELECT * FROM ingredientes WHERE tipo = $1 ORDER BY nome',
                [tipo]
            );
            return result.rows.map(row => Ingrediente.fromRow(row));
        } catch (error) {
            console.error(`Erro no listarPorTipo (${tipo}):`, error);
            throw error;
        }
    },

    // Buscar ingrediente por ID
    async buscarPorId(id) {
        try {
            const result = await db.query(
                'SELECT * FROM ingredientes WHERE id = $1',
                [id]
            );
            return result.rows[0] ? Ingrediente.fromRow(result.rows[0]) : null;
        } catch (error) {
            console.error(`Erro no buscarPorId (${id}):`, error);
            throw error;
        }
    },

    // Buscar múltiplos ingredientes por IDs
    async buscarPorIds(ids) {
        try {
            if (!ids || ids.length === 0) return [];
            
            const result = await db.query(
                'SELECT * FROM ingredientes WHERE id = ANY($1::int[]) ORDER BY id',
                [ids]
            );
            return result.rows.map(row => Ingrediente.fromRow(row));
        } catch (error) {
            console.error('Erro no buscarPorIds:', error);
            throw error;
        }
    },

    // Verificar se ingredientes existem e estão disponíveis
    async validarDisponibilidade(ids) {
        try {
            const result = await db.query(
                'SELECT id, nome, disponivel FROM ingredientes WHERE id = ANY($1::int[])',
                [ids]
            );
            
            const indisponiveis = result.rows.filter(i => !i.disponivel);
            
            return {
                valido: indisponiveis.length === 0,
                indisponiveis: indisponiveis.map(i => i.nome)
            };
        } catch (error) {
            console.error('Erro no validarDisponibilidade:', error);
            throw error;
        }
    }
};

module.exports = ingredienteService;