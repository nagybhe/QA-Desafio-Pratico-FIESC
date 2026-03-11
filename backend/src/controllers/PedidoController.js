const pedidoService = require('../services/pedidoService');

const PedidoController = {
    // GET /pedidos
    async listarTodos(req, res) {
        try {
            const pedidos = await pedidoService.listarTodos();
            const pedidosFormatados = pedidoService.formatarLista(pedidos);
            
            res.json(pedidosFormatados);
        } catch (error) {
            console.error('Erro ao listar pedidos:', error);
            res.status(500).json({ 
                erro: 'Erro interno ao buscar pedidos',
                detalhes: error.message 
            });
        }
    },

    // GET /pedidos/:id
    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            
            // Validar ID
            const idNum = parseInt(id);
            if (isNaN(idNum) || idNum <= 0) {
                return res.status(400).json({ erro: 'ID inválido' });
            }
            
            const pedido = await pedidoService.buscarPorId(idNum);
            
            if (!pedido) {
                return res.status(404).json({ erro: 'Pedido não encontrado' });
            }
            
            const pedidoFormatado = pedidoService.formatarParaFrontend(pedido);
            res.json(pedidoFormatado);
            
        } catch (error) {
            console.error('Erro ao buscar pedido:', error);
            res.status(500).json({ 
                erro: 'Erro interno ao buscar pedido',
                detalhes: error.message 
            });
        }
    },

    // GET /pedidos/periodo?inicio=2024-01-01&fim=2024-12-31
    async listarPorPeriodo(req, res) {
        try {
            const { inicio, fim } = req.query;
            
            if (!inicio || !fim) {
                return res.status(400).json({ 
                    erro: 'Parâmetros inicio e fim são obrigatórios' 
                });
            }
            
            const pedidos = await pedidoService.listarPorPeriodo(inicio, fim);
            const pedidosFormatados = pedidoService.formatarLista(pedidos);
            
            res.json(pedidosFormatados);
            
        } catch (error) {
            console.error('Erro ao listar pedidos por período:', error);
            res.status(500).json({ 
                erro: 'Erro interno ao buscar pedidos',
                detalhes: error.message 
            });
        }
    },

    // PATCH /pedidos/:id/status
    async atualizarStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            
            // Validar ID
            const idNum = parseInt(id);
            if (isNaN(idNum) || idNum <= 0) {
                return res.status(400).json({ erro: 'ID inválido' });
            }
            
            // Validar status
            const statusValidos = ['pendente', 'preparando', 'pronto', 'entregue', 'cancelado'];
            if (!statusValidos.includes(status)) {
                return res.status(400).json({ 
                    erro: 'Status inválido',
                    validos: statusValidos 
                });
            }
            
            const pedido = await pedidoService.atualizarStatus(idNum, status);
            
            if (!pedido) {
                return res.status(404).json({ erro: 'Pedido não encontrado' });
            }
            
            res.json({
                mensagem: 'Status atualizado com sucesso',
                pedido: pedidoService.formatarParaFrontend(pedido)
            });
            
        } catch (error) {
            console.error('Erro ao atualizar status:', error);
            res.status(500).json({ 
                erro: 'Erro interno ao atualizar status',
                detalhes: error.message 
            });
        }
    },

    // GET /pedidos/estatisticas
    async estatisticas(req, res) {
        try {
            const db = require('../config/database');
            
            // Total de pedidos
            const totalResult = await db.query('SELECT COUNT(*) as total FROM pedidos');
            
            // Total de vendas
            const vendasResult = await db.query('SELECT SUM(preco_total) as total FROM pedidos');
            
            // Média por pedido
            const mediaResult = await db.query('SELECT AVG(preco_total) as media FROM pedidos');
            
            // Pedidos por dia (últimos 7 dias)
            const porDiaResult = await db.query(`
                SELECT 
                    DATE(created_at) as dia,
                    COUNT(*) as quantidade,
                    SUM(preco_total) as total
                FROM pedidos
                WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
                GROUP BY DATE(created_at)
                ORDER BY dia DESC
            `);
            
            res.json({
                total: parseInt(totalResult.rows[0].total),
                totalVendas: parseFloat(vendasResult.rows[0].total) || 0,
                mediaPedido: parseFloat(mediaResult.rows[0].media) || 0,
                porDia: porDiaResult.rows
            });
            
        } catch (error) {
            console.error('Erro ao buscar estatísticas:', error);
            res.status(500).json({ 
                erro: 'Erro interno ao buscar estatísticas',
                detalhes: error.message 
            });
        }
    }
};

module.exports = PedidoController;