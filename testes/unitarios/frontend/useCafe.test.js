import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useCafe } from '../../../frontend/src/hooks/useCafe';
import { api } from '../../../frontend/src/services/api';

// Mock da API
jest.mock('../../../frontend/src/services/api');

describe('useCafe - Hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('toggleBase()', () => {
        it('deve adicionar ingrediente base quando não selecionado', () => {
            const { result } = renderHook(() => useCafe([], []));

            act(() => {
                result.current.toggleBase(1);
            });

            expect(result.current.baseSelecionados).toContain(1);
        });

        it('deve remover ingrediente base quando já selecionado', () => {
            const { result } = renderHook(() => useCafe([], []));

            act(() => {
                result.current.toggleBase(1);
                result.current.toggleBase(1);
            });

            expect(result.current.baseSelecionados).not.toContain(1);
        });
    });

    describe('toggleAdicional()', () => {
        it('deve adicionar ingrediente adicional quando menos de 2', () => {
            const { result } = renderHook(() => useCafe([], []));

            act(() => {
                result.current.toggleAdicional(1);
            });

            expect(result.current.adicionaisSelecionados).toContain(1);
            expect(result.current.alertVisible).toBe(true);
            expect(result.current.alertType).toBe('success');
        });

        it('deve remover ingrediente adicional quando já selecionado', () => {
            const { result } = renderHook(() => useCafe([], []));

            act(() => {
                result.current.toggleAdicional(1);
                result.current.toggleAdicional(1);
            });

            expect(result.current.adicionaisSelecionados).not.toContain(1);
            expect(result.current.alertType).toBe('warning');
        });

        it('não deve adicionar mais de 2 ingredientes adicionais', () => {
            const { result } = renderHook(() => useCafe([], []));

            act(() => {
                result.current.toggleAdicional(1);
                result.current.toggleAdicional(2);
                result.current.toggleAdicional(3);
            });

            expect(result.current.adicionaisSelecionados).toHaveLength(2);
            expect(result.current.adicionaisSelecionados).toContain(1);
            expect(result.current.adicionaisSelecionados).toContain(2);
            expect(result.current.adicionaisSelecionados).not.toContain(3);
            expect(result.current.alertType).toBe('error');
        });
    });

    describe('confirmarBase()', () => {
        it('deve mostrar alerta quando nenhum ingrediente base selecionado', async () => {
            const { result } = renderHook(() => useCafe([], []));

            await act(async () => {
                await result.current.confirmarBase();
            });

            expect(result.current.alertVisible).toBe(true);
            expect(result.current.alertType).toBe('error');
            expect(result.current.alertMessage).toBe('Selecione ao menos um ingrediente base');
        });

        it('deve chamar API quando ingredientes selecionados', async () => {
            api.identificarSabor.mockResolvedValueOnce({ 
                saborClassico: 'Latte' 
            });

            const { result } = renderHook(() => useCafe(
                [{ id: 1, nome: 'Espresso' }], 
                []
            ));

            act(() => {
                result.current.toggleBase(1);
            });

            await act(async () => {
                await result.current.confirmarBase();
            });

            expect(api.identificarSabor).toHaveBeenCalledWith([1]);
            expect(result.current.saborNome).toBe('Latte');
            expect(result.current.alertType).toBe('success');
        });
    });

    describe('confirmarPedido()', () => {
        it('deve mostrar alerta quando nenhum ingrediente base', async () => {
            const { result } = renderHook(() => useCafe([], []));

            await act(async () => {
                await result.current.confirmarPedido();
            });

            expect(result.current.alertVisible).toBe(true);
            expect(result.current.alertType).toBe('error');
        });

        it('deve confirmar pedido com sucesso', async () => {
            api.confirmarPedido.mockResolvedValueOnce({ 
                sucesso: true,
                pedidoId: 1 
            });

            const { result } = renderHook(() => useCafe(
                [{ id: 1, nome: 'Espresso' }], 
                [{ id: 8, nome: 'Chantilly' }]
            ));

            act(() => {
                result.current.toggleBase(1);
                result.current.toggleAdicional(8);
            });

            await act(async () => {
                await result.current.confirmarPedido();
            });

            expect(api.confirmarPedido).toHaveBeenCalled();
            expect(result.current.alertType).toBe('success');
        });
    });

    describe('limparSelecao()', () => {
        it('deve limpar todas as seleções', () => {
            const { result } = renderHook(() => useCafe([], []));

            act(() => {
                result.current.toggleBase(1);
                result.current.toggleAdicional(8);
                result.current.limparSelecao();
            });

            expect(result.current.baseSelecionados).toHaveLength(0);
            expect(result.current.adicionaisSelecionados).toHaveLength(0);
            expect(result.current.saborNome).toBeNull();
            expect(result.current.alertVisible).toBe(true);
            expect(result.current.alertType).toBe('warning');
        });
    });
});