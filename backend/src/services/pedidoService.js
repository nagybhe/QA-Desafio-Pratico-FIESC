const db = require('../config/database');

const pedidoService = {
    // Buscar todos os pedidos
    async listarTodos() {
        try {
            const result = await db.query(`
                SELECT 
                    p.id,
                    p.nome_bebida,
                    p.preco_total,
                    p.status,
                    p.created_at,
                    COALESCE(
                        json_agg(
                            json_build_object(
                                'id', i.id,
                                'nome', i.nome,
                                'tipo', i.tipo,
                                'quantidade', pi.quantidade,
                                'preco_unitario', pi.preco_unitario
                            ) ORDER BY i.tipo, i.nome
                        ) FILTER (WHERE i.id IS NOT NULL),
                        '[]'
                    ) as ingredientes
                FROM pedidos p
                LEFT JOIN pedido_itens pi ON p.id = pi.pedido_id
                LEFT JOIN ingredientes i ON pi.ingrediente_id = i.id
                GROUP BY p.id
                ORDER BY p.created_at DESC
            `);
            
            return result.rows;
        } catch (error) {
            console.error('Erro no listarTodos:', error);
            throw error;
        }
    },

    // Buscar pedido por ID
    async buscarPorId(id) {
        try {
            const result = await db.query(`
                SELECT 
                    p.*,
                    COALESCE(
                        json_agg(
                            json_build_object(
                                'id', i.id,
                                'nome', i.nome,
                                'tipo', i.tipo,
                                'quantidade', pi.quantidade,
                                'preco_unitario', pi.preco_unitario
                            ) ORDER BY i.tipo, i.nome
                        ) FILTER (WHERE i.id IS NOT NULL),
                        '[]'
                    ) as ingredientes
                FROM pedidos p
                LEFT JOIN pedido_itens pi ON p.id = pi.pedido_id
                LEFT JOIN ingredientes i ON pi.ingrediente_id = i.id
                WHERE p.id = $1
                GROUP BY p.id
            `, [id]);
            
            return result.rows[0];
        } catch (error) {
            console.error(`Erro no buscarPorId (${id}):`, error);
            throw error;
        }
    },

    // Buscar pedidos por período
    async listarPorPeriodo(dataInicio, dataFim) {
        try {
            const result = await db.query(`
                SELECT 
                    p.*,
                    COALESCE(
                        json_agg(
                            json_build_object(
                                'id', i.id,
                                'nome', i.nome,
                                'tipo', i.tipo,
                                'quantidade', pi.quantidade,
                                'preco_unitario', pi.preco_unitario
                            ) ORDER BY i.tipo, i.nome
                        ) FILTER (WHERE i.id IS NOT NULL),
                        '[]'
                    ) as ingredientes
                FROM pedidos p
                LEFT JOIN pedido_itens pi ON p.id = pi.pedido_id
                LEFT JOIN ingredientes i ON pi.ingrediente_id = i.id
                WHERE p.created_at BETWEEN $1 AND $2
                GROUP BY p.id
                ORDER BY p.created_at DESC
            `, [dataInicio, dataFim]);
            
            return result.rows;
        } catch (error) {
            console.error('Erro no listarPorPeriodo:', error);
            throw error;
        }
    },

    // Atualizar status do pedido
    async atualizarStatus(id, status) {
        try {
            const result = await db.query(`
                UPDATE pedidos 
                SET status = $1, updated_at = CURRENT_TIMESTAMP
                WHERE id = $2
                RETURNING *
            `, [status, id]);
            
            return result.rows[0];
        } catch (error) {
            console.error(`Erro no atualizarStatus (${id}):`, error);
            throw error;
        }
    },

    // Formatar pedido para o frontend
    formatarParaFrontend(pedido) {
        if (!pedido) return null;
        
        const ingredientes = pedido.ingredientes || [];
        
        return {
            id: pedido.id,
            nome: pedido.nome_bebida,
            data: pedido.created_at,
            status: pedido.status,
            ingredientes: {
                base: ingredientes
                    .filter(item => item.tipo === 'base')
                    .map(item => ({
                        nome: item.nome,
                        quantidade: item.quantidade,
                        preco: item.preco_unitario
                    })),
                adicionais: ingredientes
                    .filter(item => item.tipo === 'adicional')
                    .map(item => ({
                        nome: item.nome,
                        quantidade: item.quantidade,
                        preco: item.preco_unitario
                    }))
            },
            preco: parseFloat(pedido.preco_total)
        };
    },

    // Formatar lista de pedidos
    formatarLista(pedidos) {
        return pedidos.map(pedido => this.formatarParaFrontend(pedido));
    }
};

module.exports = pedidoService;