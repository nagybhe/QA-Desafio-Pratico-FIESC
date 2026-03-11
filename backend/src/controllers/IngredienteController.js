const ingredienteService = require('../services/ingredienteService');
const validators = require('../utils/validators');

const IngredienteController = {
    // GET /ingredientes
    async listarTodos(req, res) {
        try {
            const ingredientes = await ingredienteService.listarTodos();
            res.json(ingredientes);
        } catch (error) {
            console.error('Erro ao listar ingredientes:', error);
            res.status(500).json({ erro: 'Erro interno do servidor' });
        }
    },

    // GET /ingredientes/base
    async getBase(req, res) {
        try {
            const ingredientes = await ingredienteService.listarPorTipo('base');
            res.json(ingredientes);
        } catch (error) {
            console.error('Erro ao listar ingredientes base:', error);
            res.status(500).json({ erro: 'Erro interno do servidor' });
        }
    },

    // GET /ingredientes/adicionais
    async getAdicionais(req, res) {
        try {
            const ingredientes = await ingredienteService.listarPorTipo('adicional');
            res.json(ingredientes);
        } catch (error) {
            console.error('Erro ao listar ingredientes adicionais:', error);
            res.status(500).json({ erro: 'Erro interno do servidor' });
        }
    },

    // GET /ingredientes/:id
    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            
            const idValido = validators.validateId(id);
            if (!idValido) {
                return res.status(400).json({ erro: 'ID inválido' });
            }
            
            const ingrediente = await ingredienteService.buscarPorId(idValido);
            
            if (!ingrediente) {
                return res.status(404).json({ erro: 'Ingrediente não encontrado' });
            }
            
            res.json(ingrediente);
        } catch (error) {
            console.error('Erro ao buscar ingrediente:', error);
            res.status(500).json({ erro: 'Erro interno do servidor' });
        }
    }
};

module.exports = IngredienteController;