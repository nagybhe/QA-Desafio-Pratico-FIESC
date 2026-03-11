import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { IngredientSelector } from '../../../../frontend/src/components/ingredients/IngredientSelector';

describe('IngredientSelector - Componente', () => {
    const mockToggle = jest.fn();
    const mockOnConfirm = jest.fn();
    const ingredientes = ['Espresso', 'Leite', 'Chocolate'];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve renderizar título corretamente', () => {
        render(
            <IngredientSelector
                title="Base:"
                ingredientes={ingredientes}
                selecionados={[]}
                toggle={mockToggle}
            />
        );

        expect(screen.getByText('Base:')).toBeInTheDocument();
    });

    it('deve renderizar todos os ingredientes', () => {
        render(
            <IngredientSelector
                title="Base:"
                ingredientes={ingredientes}
                selecionados={[]}
                toggle={mockToggle}
            />
        );

        expect(screen.getByText('Espresso')).toBeInTheDocument();
        expect(screen.getByText('Leite')).toBeInTheDocument();
        expect(screen.getByText('Chocolate')).toBeInTheDocument();
    });

    it('deve chamar toggle ao clicar em ingrediente', () => {
        render(
            <IngredientSelector
                title="Base:"
                ingredientes={ingredientes}
                selecionados={[]}
                toggle={mockToggle}
            />
        );

        fireEvent.click(screen.getByText('Espresso'));
        expect(mockToggle).toHaveBeenCalledWith('Espresso');
    });

    it('deve mostrar ingredientes selecionados com estilo diferente', () => {
        render(
            <IngredientSelector
                title="Base:"
                ingredientes={ingredientes}
                selecionados={['Espresso']}
                toggle={mockToggle}
            />
        );

        const botao = screen.getByText('Espresso');
        expect(botao).toHaveAttribute('selected', 'true');
    });

    it('deve renderizar botão de confirmação quando onConfirm fornecido', () => {
        render(
            <IngredientSelector
                title="Base:"
                ingredientes={ingredientes}
                selecionados={[]}
                toggle={mockToggle}
                confirmLabel="Confirmar"
                onConfirm={mockOnConfirm}
            />
        );

        expect(screen.getByText('Confirmar')).toBeInTheDocument();
    });

    it('deve chamar onConfirm ao clicar no botão', () => {
        render(
            <IngredientSelector
                title="Base:"
                ingredientes={ingredientes}
                selecionados={[]}
                toggle={mockToggle}
                confirmLabel="Confirmar"
                onConfirm={mockOnConfirm}
            />
        );

        fireEvent.click(screen.getByText('Confirmar'));
        expect(mockOnConfirm).toHaveBeenCalled();
    });

    it('deve desabilitar botão quando confirmDisabled é true', () => {
        render(
            <IngredientSelector
                title="Base:"
                ingredientes={ingredientes}
                selecionados={[]}
                toggle={mockToggle}
                confirmLabel="Confirmar"
                onConfirm={mockOnConfirm}
                confirmDisabled={true}
            />
        );

        expect(screen.getByText('Confirmar')).toBeDisabled();
    });
});