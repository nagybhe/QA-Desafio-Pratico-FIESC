const cafeService = require('../services/cafeService');
const ingredienteService = require('../services/ingredienteService');

const CafeController = {
    // POST /cafes/identificar
    async identificarSabor(req, res) {
        try {
            const { ingredientes } = req.body;

            if (!ingredientes || !Array.isArray(ingredientes)) {
                return res.status(400).json({
                    erro: 'Lista de ingredientes é obrigatória'
                });
            }

            // Validar se os ingredientes existem
            const ingredientesValidos = await ingredienteService.buscarPorIds(ingredientes);
            if (ingredientesValidos.length !== ingredientes.length) {
                return res.status(400).json({
                    erro: 'Um ou mais ingredientes não existem'
                });
            }

            const saborClassico = await cafeService.identificarSaborClassico(ingredientes);

            res.json({
                saborClassico: saborClassico ? {
                    id: saborClassico.id,
                    nome: saborClassico.nome,
                    descricao: saborClassico.descricao
                } : null,
                mensagem: saborClassico
                    ? `Sabor clássico reconhecido: ${saborClassico.nome}`
                    : 'Café personalizado'
            });

        } catch (error) {
            console.error('Erro ao identificar sabor:', error);
            res.status(500).json({ erro: 'Erro interno do servidor' });
        }
    },

    // POST /cafes/montar
    async montarCafe(req, res) {
        try {
            const { ingredientesBase, ingredientesAdicionais = [] } = req.body;

            // Validar limites
            const erroBase = cafeService.validarIngredientesBase(ingredientesBase);
            if (erroBase) {
                return res.status(400).json({ erro: erroBase });
            }

            const erroAdicional = cafeService.validarIngredientesAdicionais(ingredientesAdicionais);
            if (erroAdicional) {
                return res.status(400).json({ erro: erroAdicional });
            }

            // Buscar detalhes dos ingredientes
            const baseDetalhes = await ingredienteService.buscarPorIds(ingredientesBase);
            const adicionaisDetalhes = await ingredienteService.buscarPorIds(ingredientesAdicionais);

            // Verificar disponibilidade
            const todosIds = [...ingredientesBase, ...ingredientesAdicionais];
            const disponibilidade = await ingredienteService.validarDisponibilidade(todosIds);

            if (!disponibilidade.valido) {
                return res.status(400).json({
                    erro: 'Ingredientes indisponíveis',
                    indisponiveis: disponibilidade.indisponiveis
                });
            }

            // Identificar sabor clássico
            const saborClassico = await cafeService.identificarSaborClassico(ingredientesBase);

            // Gerar nome da bebida
            const nomeBebida = cafeService.gerarNomeBebida(saborClassico, adicionaisDetalhes);

            // Calcular preço
            const precoTotal = await cafeService.calcularPreco(baseDetalhes, adicionaisDetalhes);

            res.json({
                nome: nomeBebida,
                saborIdentificado: saborClassico ? {
                    id: saborClassico.id,
                    nome: saborClassico.nome
                } : null,
                ingredientes: {
                    base: baseDetalhes.map(i => ({ id: i.id, nome: i.nome, preco: i.preco })),
                    adicionais: adicionaisDetalhes.map(i => ({ id: i.id, nome: i.nome, preco: i.preco }))
                },
                precoTotal: parseFloat(precoTotal).toFixed(2),
                mensagem: saborClassico
                    ? `Você criou um ${saborClassico.nome}!`
                    : 'Café personalizado criado com sucesso'
            });

        } catch (error) {
            console.error('Erro ao montar café:', error);
            res.status(500).json({ erro: 'Erro interno do servidor' });
        }
    },

    // POST /cafes/confirmar
    async confirmarPedido(req, res) {
        try {
            const { ingredientesBase, ingredientesAdicionais = [] } = req.body;

            if (!ingredientesBase || ingredientesBase.length === 0) {
                return res.status(400).json({
                    erro: 'Selecione pelo menos um ingrediente base'
                });
            }

            // Buscar detalhes dos ingredientes
            const baseDetalhes = await ingredienteService.buscarPorIds(ingredientesBase);
            const adicionaisDetalhes = await ingredienteService.buscarPorIds(ingredientesAdicionais);

            // Identificar sabor para o nome
            const saborClassico = await cafeService.identificarSaborClassico(ingredientesBase);
            const nomeBebida = cafeService.gerarNomeBebida(saborClassico, adicionaisDetalhes);
            const precoTotal = await cafeService.calcularPreco(baseDetalhes, adicionaisDetalhes);

            // Salvar pedido no banco
            const pedidoId = await cafeService.criarPedido({
                nome_bebida: nomeBebida,
                sabor_id: saborClassico?.id,
                preco_total: precoTotal,
                ingredientes: [
                    ...baseDetalhes.map(i => ({ id: i.id, preco: i.preco, quantidade: 1 })),
                    ...adicionaisDetalhes.map(i => ({ id: i.id, preco: i.preco, quantidade: 1 }))
                ]
            });

            res.status(201).json({
                sucesso: true,
                pedidoId,
                mensagem: 'Pedido confirmado com sucesso!',
                nomeBebida,
                precoTotal: parseFloat(precoTotal).toFixed(2)
            });

        } catch (error) {
            console.error('Erro ao confirmar pedido:', error);
            res.status(500).json({ erro: 'Erro interno do servidor' });
        }
    },

    // GET /cafes/sabores
    async listarSaboresClassicos(req, res) {
        try {
            const sabores = await cafeService.listarSaboresClassicos();
            res.json(sabores);
        } catch (error) {
            console.error('Erro ao listar sabores:', error);
            res.status(500).json({ erro: 'Erro interno do servidor' });
        }
    },

    // GET /cafes/pedidos
    async listarPedidos(req, res) {
        try {
            const { limite = 10 } = req.query;
            const pedidos = await cafeService.listarPedidos(limite);
            res.json(pedidos);
        } catch (error) {
            console.error('Erro ao listar pedidos:', error);
            res.status(500).json({ erro: 'Erro interno do servidor' });
        }
    }
};

module.exports = CafeController;