const cafeService = require('../../../backend/src/services/cafeService');
const db = require('../../../backend/src/config/database');

// Mock do banco de dados
jest.mock('../../../backend/src/config/database');

describe('CafeService - Testes Unitários', () => {
    // Limpar todos os mocks antes de cada teste
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // =====================================
    // TESTES: identificarSaborClassico
    // =====================================
    describe('identificarSaborClassico()', () => {
        it('deve retornar Latte quando ingredientes [1, 2] (Espresso + Leite)', async () => {
            // Mock da resposta do banco
            db.query.mockResolvedValueOnce({
                rows: [
                    {
                        id: 2,
                        nome: 'Latte',
                        descricao: 'Espresso e leite',
                        ingredientes_ids: [1, 2]
                    },
                    {
                        id: 1,
                        nome: 'Macchiato',
                        descricao: 'Espresso com leite e espuma',
                        ingredientes_ids: [1, 2, 5]
                    }
                ]
            });

            const resultado = await cafeService.identificarSaborClassico([1, 2]);
            
            expect(resultado).toBeTruthy();
            expect(resultado.nome).toBe('Latte');
            expect(resultado.id).toBe(2);
            expect(db.query).toHaveBeenCalledTimes(1);
        });

        it('deve retornar Macchiato quando ingredientes [1, 2, 5]', async () => {
            db.query.mockResolvedValueOnce({
                rows: [
                    {
                        id: 1,
                        nome: 'Macchiato',
                        descricao: 'Espresso com leite e espuma',
                        ingredientes_ids: [1, 2, 5]
                    },
                    {
                        id: 2,
                        nome: 'Latte',
                        descricao: 'Espresso e leite',
                        ingredientes_ids: [1, 2]
                    }
                ]
            });

            const resultado = await cafeService.identificarSaborClassico([1, 2, 5]);
            
            expect(resultado).toBeTruthy();
            expect(resultado.nome).toBe('Macchiato');
            expect(resultado.id).toBe(1);
        });

        it('deve retornar null quando combinação não corresponde a nenhum sabor', async () => {
            db.query.mockResolvedValueOnce({
                rows: [
                    {
                        id: 2,
                        nome: 'Latte',
                        descricao: 'Espresso e leite',
                        ingredientes_ids: [1, 2]
                    }
                ]
            });

            const resultado = await cafeService.identificarSaborClassico([1, 3]); // Espresso + Chocolate
            
            expect(resultado).toBeNull();
        });

        it('deve retornar null quando ingredientesIds é vazio', async () => {
            const resultado = await cafeService.identificarSaborClassico([]);
            
            expect(resultado).toBeNull();
            expect(db.query).not.toHaveBeenCalled();
        });

        it('deve retornar null quando ingredientesIds é null', async () => {
            const resultado = await cafeService.identificarSaborClassico(null);
            
            expect(resultado).toBeNull();
            expect(db.query).not.toHaveBeenCalled();
        });

        it('deve lançar erro quando banco falha', async () => {
            db.query.mockRejectedValueOnce(new Error('Erro no banco'));

            await expect(cafeService.identificarSaborClassico([1, 2]))
                .rejects
                .toThrow('Erro no banco');
        });
    });

    // =====================================
    // TESTES: listarSaboresClassicos
    // =====================================
    describe('listarSaboresClassicos()', () => {
        it('deve retornar lista de todos os sabores clássicos', async () => {
            const mockSabores = [
                {
                    id: 1,
                    nome: 'Macchiato',
                    descricao: 'Espresso com leite e espuma',
                    ingredientes_ids: [1, 2, 5]
                },
                {
                    id: 2,
                    nome: 'Latte',
                    descricao: 'Espresso e leite',
                    ingredientes_ids: [1, 2]
                }
            ];

            db.query.mockResolvedValueOnce({ rows: mockSabores });

            const resultado = await cafeService.listarSaboresClassicos();
            
            expect(resultado).toHaveLength(2);
            expect(resultado[0].nome).toBe('Macchiato');
            expect(resultado[1].nome).toBe('Latte');
            expect(resultado[0].ingredientes).toEqual([1, 2, 5]);
        });

        it('deve retornar array vazio quando não há sabores', async () => {
            db.query.mockResolvedValueOnce({ rows: [] });

            const resultado = await cafeService.listarSaboresClassicos();
            
            expect(resultado).toEqual([]);
        });
    });

    // =====================================
    // TESTES: validarIngredientesBase
    // =====================================
    describe('validarIngredientesBase()', () => {
        it('deve retornar erro quando nenhum ingrediente base selecionado', () => {
            const resultado = cafeService.validarIngredientesBase([]);
            expect(resultado).toBe('Selecione pelo menos 1 ingrediente base');
        });

        it('deve retornar erro quando ingredientesBase é null', () => {
            const resultado = cafeService.validarIngredientesBase(null);
            expect(resultado).toBe('Selecione pelo menos 1 ingrediente base');
        });

        it('deve retornar erro quando ingredientesBase é undefined', () => {
            const resultado = cafeService.validarIngredientesBase(undefined);
            expect(resultado).toBe('Selecione pelo menos 1 ingrediente base');
        });

        it('deve retornar erro quando mais de 5 ingredientes base', () => {
            const resultado = cafeService.validarIngredientesBase([1, 2, 3, 4, 5, 6]);
            expect(resultado).toBe('Máximo de 5 ingredientes base permitido');
        });

        it('deve retornar null quando ingredientes base válidos (1-5)', () => {
            expect(cafeService.validarIngredientesBase([1])).toBeNull();
            expect(cafeService.validarIngredientesBase([1, 2])).toBeNull();
            expect(cafeService.validarIngredientesBase([1, 2, 3, 4, 5])).toBeNull();
        });
    });

    // =====================================
    // TESTES: validarIngredientesAdicionais
    // =====================================
    describe('validarIngredientesAdicionais()', () => {
        it('deve retornar erro quando mais de 2 ingredientes adicionais', () => {
            const resultado = cafeService.validarIngredientesAdicionais([1, 2, 3]);
            expect(resultado).toBe('Máximo de 2 ingredientes adicionais permitido');
        });

        it('deve retornar null quando 2 ou menos ingredientes adicionais', () => {
            expect(cafeService.validarIngredientesAdicionais([])).toBeNull();
            expect(cafeService.validarIngredientesAdicionais([1])).toBeNull();
            expect(cafeService.validarIngredientesAdicionais([1, 2])).toBeNull();
        });

        it('deve retornar null quando ingredientesAdicionais é null', () => {
            const resultado = cafeService.validarIngredientesAdicionais(null);
            expect(resultado).toBeNull();
        });

        it('deve retornar null quando ingredientesAdicionais é undefined', () => {
            const resultado = cafeService.validarIngredientesAdicionais(undefined);
            expect(resultado).toBeNull();
        });
    });

    // =====================================
    // TESTES: gerarNomeBebida
    // =====================================
    describe('gerarNomeBebida()', () => {
        it('deve gerar nome apenas com sabor clássico (sem adicionais)', () => {
            const sabor = { nome: 'Latte' };
            const nome = cafeService.gerarNomeBebida(sabor, []);
            
            expect(nome).toBe('Latte');
        });

        it('deve gerar nome com sabor clássico e 1 adicional', () => {
            const sabor = { nome: 'Latte' };
            const adicionais = [{ nome: 'Chantilly' }];
            
            const nome = cafeService.gerarNomeBebida(sabor, adicionais);
            
            expect(nome).toBe('Latte com Chantilly');
        });

        it('deve gerar nome com sabor clássico e 2 adicionais', () => {
            const sabor = { nome: 'Latte' };
            const adicionais = [{ nome: 'Chantilly' }, { nome: 'Canela' }];
            
            const nome = cafeService.gerarNomeBebida(sabor, adicionais);
            
            expect(nome).toBe('Latte com Chantilly e Canela');
        });

        it('deve gerar nome para café personalizado (sem sabor)', () => {
            const nome = cafeService.gerarNomeBebida(null, []);
            
            expect(nome).toBe('Café Personalizado');
        });

        it('deve gerar nome para café personalizado com adicionais', () => {
            const adicionais = [{ nome: 'Chantilly' }, { nome: 'Canela' }];
            
            const nome = cafeService.gerarNomeBebida(null, adicionais);
            
            expect(nome).toBe('Café Personalizado com Chantilly e Canela');
        });

        it('deve tratar adicionais como array vazio quando não fornecido', () => {
            const sabor = { nome: 'Latte' };
            const nome = cafeService.gerarNomeBebida(sabor);
            
            expect(nome).toBe('Latte');
        });
    });

    // =====================================
    // TESTES: calcularPreco
    // =====================================
    describe('calcularPreco()', () => {
        it('deve calcular preço correto para ingredientes base apenas', async () => {
            const base = [{ preco: 3.5 }, { preco: 2.0 }];
            const adicionais = [];

            const total = await cafeService.calcularPreco(base, adicionais);
            
            expect(total).toBe(5.5);
        });

        it('deve calcular preço correto para ingredientes base e adicionais', async () => {
            const base = [{ preco: 3.5 }, { preco: 2.0 }];
            const adicionais = [{ preco: 1.5 }, { preco: 0.5 }];

            const total = await cafeService.calcularPreco(base, adicionais);
            
            expect(total).toBe(7.5);
        });

        it('deve retornar 0 quando não há ingredientes', async () => {
            const total = await cafeService.calcularPreco([], []);
            
            expect(total).toBe(0);
        });

        it('deve lidar com preços como string', async () => {
            const base = [{ preco: '3.5' }, { preco: '2.0' }];
            const adicionais = [];

            const total = await cafeService.calcularPreco(base, adicionais);
            
            expect(total).toBe(5.5);
        });

        it('deve ignorar valores inválidos', async () => {
            const base = [{ preco: 3.5 }, { preco: 'invalido' }, { preco: null }];
            const adicionais = [];

            const total = await cafeService.calcularPreco(base, adicionais);
            
            expect(total).toBe(3.5);
        });
    });

    // =====================================
    // TESTES: criarPedido (com transação)
    // =====================================
    describe('criarPedido()', () => {
        let mockClient;

        beforeEach(() => {
            mockClient = {
                query: jest.fn(),
                release: jest.fn()
            };
            db.pool.connect = jest.fn().mockResolvedValue(mockClient);
        });

        it('deve criar pedido com sucesso', async () => {
            const dadosPedido = {
                nome_bebida: 'Latte com Chantilly',
                sabor_id: 2,
                preco_total: 7.5,
                ingredientes: [
                    { id: 1, preco: 3.5, quantidade: 1 },
                    { id: 2, preco: 2.0, quantidade: 1 },
                    { id: 8, preco: 2.0, quantidade: 1 }
                ]
            };

            mockClient.query
                .mockResolvedValueOnce({}) // BEGIN
                .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // INSERT pedido
                .mockResolvedValueOnce({}) // INSERT item 1
                .mockResolvedValueOnce({}) // INSERT item 2
                .mockResolvedValueOnce({}) // INSERT item 3
                .mockResolvedValueOnce({}); // COMMIT

            const pedidoId = await cafeService.criarPedido(dadosPedido);

            expect(pedidoId).toBe(1);
            expect(db.pool.connect).toHaveBeenCalled();
            expect(mockClient.query).toHaveBeenCalledWith('BEGIN');
            expect(mockClient.query).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO pedidos'),
                [dadosPedido.nome_bebida, dadosPedido.sabor_id, dadosPedido.preco_total]
            );
            expect(mockClient.query).toHaveBeenCalledTimes(6); // BEGIN + INSERT pedido + 3 itens + COMMIT
            expect(mockClient.release).toHaveBeenCalled();
        });

        it('deve fazer rollback em caso de erro', async () => {
            const dadosPedido = {
                nome_bebida: 'Latte',
                sabor_id: 2,
                preco_total: 5.5,
                ingredientes: [
                    { id: 1, preco: 3.5, quantidade: 1 }
                ]
            };

            mockClient.query
                .mockResolvedValueOnce({}) // BEGIN
                .mockRejectedValueOnce(new Error('Erro ao inserir')); // INSERT pedido falha

            await expect(cafeService.criarPedido(dadosPedido)).rejects.toThrow('Erro ao inserir');

            expect(mockClient.query).toHaveBeenCalledWith('ROLLBACK');
            expect(mockClient.release).toHaveBeenCalled();
        });
    });

    // =====================================
    // TESTES: listarPedidos
    // =====================================
    describe('listarPedidos()', () => {
        it('deve retornar lista de pedidos com limite padrão (10)', async () => {
            const mockPedidos = [
                { id: 1, nome_bebida: 'Latte', preco_total: 5.5, itens: [] },
                { id: 2, nome_bebida: 'Mocha', preco_total: 7.0, itens: [] }
            ];

            db.query.mockResolvedValueOnce({ rows: mockPedidos });

            const resultado = await cafeService.listarPedidos();

            expect(resultado).toHaveLength(2);
            expect(db.query).toHaveBeenCalledWith(expect.any(String), [10]);
        });

        it('deve aceitar limite personalizado', async () => {
            db.query.mockResolvedValueOnce({ rows: [] });

            await cafeService.listarPedidos(5);

            expect(db.query).toHaveBeenCalledWith(expect.any(String), [5]);
        });
    });
});