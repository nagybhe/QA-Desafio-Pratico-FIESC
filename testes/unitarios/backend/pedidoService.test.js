const pedidoService = require('../../../backend/src/services/pedidoService');
const db = require('../../../backend/src/config/database');

jest.mock('../../../backend/src/config/database');

describe('PedidoService - Testes Unitários', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // =====================================
    // TESTES: listarTodos
    // =====================================
    describe('listarTodos()', () => {
        it('deve retornar lista de todos os pedidos', async () => {
            const mockPedidos = [
                {
                    id: 1,
                    nome_bebida: 'Latte',
                    preco_total: 5.5,
                    status: 'finalizado',
                    created_at: '2024-03-10T10:00:00Z',
                    ingredientes: [
                        { id: 1, nome: 'Espresso', tipo: 'base', quantidade: 1, preco_unitario: 3.5 },
                        { id: 2, nome: 'Leite', tipo: 'base', quantidade: 1, preco_unitario: 2.0 }
                    ]
                }
            ];

            db.query.mockResolvedValueOnce({ rows: mockPedidos });

            const resultado = await pedidoService.listarTodos();

            expect(resultado).toHaveLength(1);
            expect(resultado[0].id).toBe(1);
            expect(resultado[0].nome_bebida).toBe('Latte');
        });

        it('deve retornar array vazio quando não há pedidos', async () => {
            db.query.mockResolvedValueOnce({ rows: [] });

            const resultado = await pedidoService.listarTodos();

            expect(resultado).toEqual([]);
        });
    });

    // =====================================
    // TESTES: buscarPorId
    // =====================================
    describe('buscarPorId()', () => {
        it('deve retornar pedido quando ID existe', async () => {
            const mockPedido = {
                id: 1,
                nome_bebida: 'Latte',
                preco_total: 5.5,
                status: 'finalizado',
                created_at: '2024-03-10T10:00:00Z',
                ingredientes: [
                    { id: 1, nome: 'Espresso', tipo: 'base', quantidade: 1, preco_unitario: 3.5 }
                ]
            };

            db.query.mockResolvedValueOnce({ rows: [mockPedido] });

            const resultado = await pedidoService.buscarPorId(1);

            expect(resultado).toBeTruthy();
            expect(resultado.id).toBe(1);
            expect(resultado.nome_bebida).toBe('Latte');
        });

        it('deve retornar undefined quando ID não existe', async () => {
            db.query.mockResolvedValueOnce({ rows: [] });

            const resultado = await pedidoService.buscarPorId(999);

            expect(resultado).toBeUndefined();
        });
    });

    // =====================================
    // TESTES: listarPorPeriodo
    // =====================================
    describe('listarPorPeriodo()', () => {
        it('deve retornar pedidos dentro do período', async () => {
            const mockPedidos = [
                { id: 1, nome_bebida: 'Latte', created_at: '2024-03-10T10:00:00Z' },
                { id: 2, nome_bebida: 'Mocha', created_at: '2024-03-11T15:00:00Z' }
            ];

            db.query.mockResolvedValueOnce({ rows: mockPedidos });

            const resultado = await pedidoService.listarPorPeriodo('2024-03-01', '2024-03-31');

            expect(resultado).toHaveLength(2);
            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('BETWEEN'),
                ['2024-03-01', '2024-03-31']
            );
        });

        it('deve retornar array vazio quando não há pedidos no período', async () => {
            db.query.mockResolvedValueOnce({ rows: [] });

            const resultado = await pedidoService.listarPorPeriodo('2024-01-01', '2024-01-31');

            expect(resultado).toEqual([]);
        });
    });

    // =====================================
    // TESTES: atualizarStatus
    // =====================================
    describe('atualizarStatus()', () => {
        it('deve atualizar status do pedido', async () => {
            const mockPedido = {
                id: 1,
                nome_bebida: 'Latte',
                status: 'preparando'
            };

            db.query.mockResolvedValueOnce({ rows: [mockPedido] });

            const resultado = await pedidoService.atualizarStatus(1, 'preparando');

            expect(resultado).toBeTruthy();
            expect(resultado.status).toBe('preparando');
            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('UPDATE pedidos'),
                ['preparando', 1]
            );
        });

        it('deve retornar undefined quando pedido não existe', async () => {
            db.query.mockResolvedValueOnce({ rows: [] });

            const resultado = await pedidoService.atualizarStatus(999, 'preparando');

            expect(resultado).toBeUndefined();
        });
    });

    // =====================================
    // TESTES: formatarParaFrontend
    // =====================================
    describe('formatarParaFrontend()', () => {
        it('deve formatar pedido corretamente para o frontend', () => {
            const pedido = {
                id: 1,
                nome_bebida: 'Latte com Chantilly',
                created_at: '2024-03-10T10:00:00Z',
                status: 'finalizado',
                preco_total: '7.50',
                ingredientes: [
                    { id: 1, nome: 'Espresso', tipo: 'base', quantidade: 1, preco_unitario: 3.5 },
                    { id: 2, nome: 'Leite', tipo: 'base', quantidade: 1, preco_unitario: 2.0 },
                    { id: 8, nome: 'Chantilly', tipo: 'adicional', quantidade: 1, preco_unitario: 2.0 }
                ]
            };

            const resultado = pedidoService.formatarParaFrontend(pedido);

            expect(resultado).toEqual({
                id: 1,
                nome: 'Latte com Chantilly',
                data: '2024-03-10T10:00:00Z',
                status: 'finalizado',
                ingredientes: {
                    base: [
                        { nome: 'Espresso', quantidade: 1, preco: 3.5 },
                        { nome: 'Leite', quantidade: 1, preco: 2.0 }
                    ],
                    adicionais: [
                        { nome: 'Chantilly', quantidade: 1, preco: 2.0 }
                    ]
                },
                preco: 7.5
            });
        });

        it('deve retornar null quando pedido é null', () => {
            const resultado = pedidoService.formatarParaFrontend(null);
            expect(resultado).toBeNull();
        });

        it('deve lidar com ingredientes vazios', () => {
            const pedido = {
                id: 1,
                nome_bebida: 'Latte',
                created_at: '2024-03-10T10:00:00Z',
                status: 'finalizado',
                preco_total: '5.50',
                ingredientes: []
            };

            const resultado = pedidoService.formatarParaFrontend(pedido);

            expect(resultado.ingredientes.base).toEqual([]);
            expect(resultado.ingredientes.adicionais).toEqual([]);
        });
    });

    // =====================================
    // TESTES: formatarLista
    // =====================================
    describe('formatarLista()', () => {
        it('deve formatar lista de pedidos', () => {
            const pedidos = [
                {
                    id: 1,
                    nome_bebida: 'Latte',
                    created_at: '2024-03-10T10:00:00Z',
                    status: 'finalizado',
                    preco_total: '5.50',
                    ingredientes: []
                },
                {
                    id: 2,
                    nome_bebida: 'Mocha',
                    created_at: '2024-03-10T11:00:00Z',
                    status: 'finalizado',
                    preco_total: '7.00',
                    ingredientes: []
                }
            ];

            const resultado = pedidoService.formatarLista(pedidos);

            expect(resultado).toHaveLength(2);
            expect(resultado[0].id).toBe(1);
            expect(resultado[1].id).toBe(2);
        });
    });
});