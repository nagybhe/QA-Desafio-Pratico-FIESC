const ingredienteService = require('../../../backend/src/services/ingredienteService');
const db = require('../../../backend/src/config/database');
const Ingrediente = require('../../../backend/src/models/Ingrediente');

// Mock do banco de dados
jest.mock('../../../backend/src/config/database');

describe('IngredienteService - Testes Unitários', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // =====================================
    // TESTES: listarTodos
    // =====================================
    describe('listarTodos()', () => {
        it('deve retornar todos os ingredientes ordenados por tipo e nome', async () => {
            const mockRows = [
                { id: 1, nome: 'Espresso', tipo: 'base', preco: 3.5, disponivel: true },
                { id: 2, nome: 'Leite', tipo: 'base', preco: 2.0, disponivel: true },
                { id: 6, nome: 'Caramelo', tipo: 'adicional', preco: 1.5, disponivel: true }
            ];

            db.query.mockResolvedValueOnce({ rows: mockRows });

            const resultado = await ingredienteService.listarTodos();

            expect(resultado).toHaveLength(3);
            expect(resultado[0]).toBeInstanceOf(Ingrediente);
            expect(resultado[0].nome).toBe('Espresso');
            expect(resultado[1].nome).toBe('Leite');
            expect(resultado[2].nome).toBe('Caramelo');
            expect(db.query).toHaveBeenCalledWith(
                'SELECT * FROM ingredientes ORDER BY tipo, nome'
            );
        });

        it('deve retornar array vazio quando não há ingredientes', async () => {
            db.query.mockResolvedValueOnce({ rows: [] });

            const resultado = await ingredienteService.listarTodos();

            expect(resultado).toEqual([]);
        });

        it('deve lançar erro quando banco falha', async () => {
            db.query.mockRejectedValueOnce(new Error('Erro no banco'));

            await expect(ingredienteService.listarTodos())
                .rejects
                .toThrow('Erro no banco');
        });
    });

    // =====================================
    // TESTES: listarPorTipo
    // =====================================
    describe('listarPorTipo()', () => {
        it('deve retornar apenas ingredientes base', async () => {
            const mockRows = [
                { id: 1, nome: 'Espresso', tipo: 'base', preco: 3.5, disponivel: true },
                { id: 2, nome: 'Leite', tipo: 'base', preco: 2.0, disponivel: true }
            ];

            db.query.mockResolvedValueOnce({ rows: mockRows });

            const resultado = await ingredienteService.listarPorTipo('base');

            expect(resultado).toHaveLength(2);
            expect(resultado[0].tipo).toBe('base');
            expect(resultado[1].tipo).toBe('base');
            expect(db.query).toHaveBeenCalledWith(
                'SELECT * FROM ingredientes WHERE tipo = $1 ORDER BY nome',
                ['base']
            );
        });

        it('deve retornar apenas ingredientes adicionais', async () => {
            const mockRows = [
                { id: 6, nome: 'Caramelo', tipo: 'adicional', preco: 1.5, disponivel: true },
                { id: 7, nome: 'Chantilly', tipo: 'adicional', preco: 2.0, disponivel: true }
            ];

            db.query.mockResolvedValueOnce({ rows: mockRows });

            const resultado = await ingredienteService.listarPorTipo('adicional');

            expect(resultado).toHaveLength(2);
            expect(resultado[0].tipo).toBe('adicional');
            expect(resultado[1].tipo).toBe('adicional');
        });

        it('deve retornar array vazio quando tipo não tem ingredientes', async () => {
            db.query.mockResolvedValueOnce({ rows: [] });

            const resultado = await ingredienteService.listarPorTipo('base');

            expect(resultado).toEqual([]);
        });
    });

    // =====================================
    // TESTES: buscarPorId
    // =====================================
    describe('buscarPorId()', () => {
        it('deve retornar ingrediente quando ID existe', async () => {
            const mockRow = { id: 1, nome: 'Espresso', tipo: 'base', preco: 3.5, disponivel: true };

            db.query.mockResolvedValueOnce({ rows: [mockRow] });

            const resultado = await ingredienteService.buscarPorId(1);

            expect(resultado).toBeInstanceOf(Ingrediente);
            expect(resultado.id).toBe(1);
            expect(resultado.nome).toBe('Espresso');
            expect(db.query).toHaveBeenCalledWith(
                'SELECT * FROM ingredientes WHERE id = $1',
                [1]
            );
        });

        it('deve retornar null quando ID não existe', async () => {
            db.query.mockResolvedValueOnce({ rows: [] });

            const resultado = await ingredienteService.buscarPorId(999);

            expect(resultado).toBeNull();
        });
    });

    // =====================================
    // TESTES: buscarPorIds
    // =====================================
    describe('buscarPorIds()', () => {
        it('deve retornar múltiplos ingredientes por IDs', async () => {
            const mockRows = [
                { id: 1, nome: 'Espresso', tipo: 'base', preco: 3.5, disponivel: true },
                { id: 2, nome: 'Leite', tipo: 'base', preco: 2.0, disponivel: true }
            ];

            db.query.mockResolvedValueOnce({ rows: mockRows });

            const resultado = await ingredienteService.buscarPorIds([1, 2]);

            expect(resultado).toHaveLength(2);
            expect(resultado[0].id).toBe(1);
            expect(resultado[1].id).toBe(2);
            expect(db.query).toHaveBeenCalledWith(
                'SELECT * FROM ingredientes WHERE id = ANY($1::int[]) ORDER BY id',
                [[1, 2]]
            );
        });

        it('deve retornar array vazio quando lista de IDs vazia', async () => {
            const resultado = await ingredienteService.buscarPorIds([]);

            expect(resultado).toEqual([]);
            expect(db.query).not.toHaveBeenCalled();
        });

        it('deve retornar apenas IDs que existem', async () => {
            const mockRows = [
                { id: 1, nome: 'Espresso', tipo: 'base', preco: 3.5, disponivel: true }
            ];

            db.query.mockResolvedValueOnce({ rows: mockRows });

            const resultado = await ingredienteService.buscarPorIds([1, 999]);

            expect(resultado).toHaveLength(1);
            expect(resultado[0].id).toBe(1);
        });
    });

    // =====================================
    // TESTES: validarDisponibilidade
    // =====================================
    describe('validarDisponibilidade()', () => {
        it('deve retornar válido quando todos ingredientes disponíveis', async () => {
            const mockRows = [
                { id: 1, nome: 'Espresso', disponivel: true },
                { id: 2, nome: 'Leite', disponivel: true }
            ];

            db.query.mockResolvedValueOnce({ rows: mockRows });

            const resultado = await ingredienteService.validarDisponibilidade([1, 2]);

            expect(resultado.valido).toBe(true);
            expect(resultado.indisponiveis).toEqual([]);
        });

        it('deve retornar inválido quando algum ingrediente indisponível', async () => {
            const mockRows = [
                { id: 1, nome: 'Espresso', disponivel: true },
                { id: 2, nome: 'Leite', disponivel: false }
            ];

            db.query.mockResolvedValueOnce({ rows: mockRows });

            const resultado = await ingredienteService.validarDisponibilidade([1, 2]);

            expect(resultado.valido).toBe(false);
            expect(resultado.indisponiveis).toEqual(['Leite']);
        });

        it('deve retornar inválido quando múltiplos ingredientes indisponíveis', async () => {
            const mockRows = [
                { id: 1, nome: 'Espresso', disponivel: false },
                { id: 2, nome: 'Leite', disponivel: false }
            ];

            db.query.mockResolvedValueOnce({ rows: mockRows });

            const resultado = await ingredienteService.validarDisponibilidade([1, 2]);

            expect(resultado.valido).toBe(false);
            expect(resultado.indisponiveis).toHaveLength(2);
            expect(resultado.indisponiveis).toContain('Espresso');
            expect(resultado.indisponiveis).toContain('Leite');
        });
    });
});