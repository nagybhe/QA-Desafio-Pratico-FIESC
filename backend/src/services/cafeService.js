const db = require('../config/database');
const SaborClassico = require('../models/SaborClassico');
const ingredienteService = require('./ingredienteService');

const cafeService = {
    // Identificar sabor clássico baseado nos ingredientes selecionados
    async identificarSaborClassico(ingredientesIds) {
        try {
            if (!ingredientesIds || ingredientesIds.length === 0) {
                return null;
            }

            // Ordenar IDs para comparação consistente
            const ingredientesSelecionados = [...ingredientesIds].sort((a, b) => a - b);
            
            // Buscar todos os sabores clássicos com seus ingredientes
            const result = await db.query(`
                SELECT 
                    sc.id,
                    sc.nome,
                    sc.descricao,
                    array_agg(si.ingrediente_id ORDER BY si.ingrediente_id) as ingredientes_ids
                FROM sabores_classicos sc
                JOIN sabor_ingredientes si ON sc.id = si.sabor_id
                GROUP BY sc.id, sc.nome, sc.descricao
            `);

            // Procurar correspondência exata
            const saborEncontrado = result.rows.find(sabor => {
                const ingredientesSabor = sabor.ingredientes_ids;
                return JSON.stringify(ingredientesSelecionados) === JSON.stringify(ingredientesSabor);
            });

            return saborEncontrado ? SaborClassico.fromRow(saborEncontrado) : null;
            
        } catch (error) {
            console.error('Erro ao identificar sabor clássico:', error);
            throw error;
        }
    },

    // Buscar todos os sabores clássicos
    async listarSaboresClassicos() {
        try {
            const result = await db.query(`
                SELECT 
                    sc.*,
                    array_agg(si.ingrediente_id ORDER BY si.ingrediente_id) as ingredientes_ids
                FROM sabores_classicos sc
                LEFT JOIN sabor_ingredientes si ON sc.id = si.sabor_id
                GROUP BY sc.id
                ORDER BY sc.nome
            `);
            
            return result.rows.map(row => SaborClassico.fromRow(row));
        } catch (error) {
            console.error('Erro ao listar sabores clássicos:', error);
            throw error;
        }
    },

    // Validar ingredientes base
    validarIngredientesBase(ingredientes) {
        if (!ingredientes || ingredientes.length === 0) {
            return 'Selecione pelo menos 1 ingrediente base';
        }
        if (ingredientes.length > 5) {
            return 'Máximo de 5 ingredientes base permitido';
        }
        return null;
    },

    // Validar ingredientes adicionais
    validarIngredientesAdicionais(ingredientes) {
        if (ingredientes && ingredientes.length > 2) {
            return 'Máximo de 2 ingredientes adicionais permitido';
        }
        return null;
    },

    // Gerar nome da bebida final
    gerarNomeBebida(saborClassico, ingredientesAdicionais) {
        let nome = saborClassico ? saborClassico.nome : 'Café Personalizado';
        
        if (ingredientesAdicionais && ingredientesAdicionais.length > 0) {
            const adicionaisNomes = ingredientesAdicionais
                .map(i => i.nome)
                .join(' e ');
            nome += ` com ${adicionaisNomes}`;
        }
        
        return nome;
    },

    // Calcular preço total
    async calcularPreco(ingredientesBase, ingredientesAdicionais) {
        try {
            const todosIngredientes = [...ingredientesBase, ...(ingredientesAdicionais || [])];
            
            if (todosIngredientes.length === 0) return 0;
            
            const total = todosIngredientes.reduce((sum, item) => {
                return sum + (parseFloat(item.preco) || 0);
            }, 0);
            
            return total;
        } catch (error) {
            console.error('Erro ao calcular preço:', error);
            return 0;
        }
    },

    // Criar um pedido
    async criarPedido(dadosPedido) {
        const { nome_bebida, sabor_id, preco_total, ingredientes } = dadosPedido;
        
        // Iniciar transação
        const client = await db.pool.connect();
        
        try {
            await client.query('BEGIN');
            
            // Inserir pedido
            const pedidoResult = await client.query(
                `INSERT INTO pedidos (nome_bebida, sabor_identificado_id, preco_total)
                 VALUES ($1, $2, $3) RETURNING id`,
                [nome_bebida, sabor_id, preco_total]
            );
            
            const pedidoId = pedidoResult.rows[0].id;
            
            // Inserir itens do pedido
            for (const item of ingredientes) {
                await client.query(
                    `INSERT INTO pedido_itens (pedido_id, ingrediente_id, quantidade, preco_unitario)
                     VALUES ($1, $2, $3, $4)`,
                    [pedidoId, item.id, item.quantidade || 1, item.preco]
                );
            }
            
            await client.query('COMMIT');
            return pedidoId;
            
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Erro ao criar pedido:', error);
            throw error;
        } finally {
            client.release();
        }
    },

    // Buscar histórico de pedidos
    async listarPedidos(limite = 10) {
        try {
            const result = await db.query(`
                SELECT p.*, 
                       array_agg(json_build_object(
                           'id', i.id,
                           'nome', i.nome,
                           'quantidade', pi.quantidade,
                           'preco', pi.preco_unitario
                       )) as itens
                FROM pedidos p
                LEFT JOIN pedido_itens pi ON p.id = pi.pedido_id
                LEFT JOIN ingredientes i ON pi.ingrediente_id = i.id
                GROUP BY p.id
                ORDER BY p.created_at DESC
                LIMIT $1
            `, [limite]);
            
            return result.rows;
        } catch (error) {
            console.error('Erro ao listar pedidos:', error);
            throw error;
        }
    }
};

module.exports = cafeService;