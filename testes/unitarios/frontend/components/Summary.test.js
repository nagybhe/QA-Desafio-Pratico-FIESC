import React from 'react';
import { render, screen } from '@testing-library/react';
import { Summary } from '../../../../frontend/src/components/summary/Summary';

describe('Summary - Componente', () => {
    it('deve mostrar sabor clássico quando identificado', () => {
        render(
            <Summary 
                saborClassico="Latte" 
                adicionaisSelecionados={[]} 
            />
        );

        expect(screen.getByText(/Latte/)).toBeInTheDocument();
        expect(screen.getByText('✨ Sabor Clássico Reconhecido!')).toBeInTheDocument();
    });

    it('deve mostrar café personalizado quando não há sabor clássico', () => {
        render(
            <Summary 
                saborClassico="Café personalizado" 
                adicionaisSelecionados={[]} 
            />
        );

        expect(screen.getByText('☕ Café Personalizado')).toBeInTheDocument();
        expect(screen.getByText(/Café personalizado/)).toBeInTheDocument();
    });

    it('deve mostrar estado vazio quando nenhum sabor confirmado', () => {
        render(
            <Summary 
                saborClassico={null} 
                adicionaisSelecionados={[]} 
            />
        );

        expect(screen.getByText(/Selecione os ingredientes base/)).toBeInTheDocument();
    });

    it('deve mostrar adicionais selecionados', () => {
        render(
            <Summary 
                saborClassico="Latte" 
                adicionaisSelecionados={['Chantilly', 'Canela']} 
            />
        );

        expect(screen.getByText(/Chantilly/)).toBeInTheDocument();
        expect(screen.getByText(/Canela/)).toBeInTheDocument();
    });

    it('deve mostrar "Nenhum adicional selecionado" quando não há adicionais', () => {
        render(
            <Summary 
                saborClassico="Latte" 
                adicionaisSelecionados={[]} 
            />
        );

        expect(screen.getByText('Nenhum adicional selecionado')).toBeInTheDocument();
    });

    it('deve mostrar dica quando nenhum sabor confirmado', () => {
        render(
            <Summary 
                saborClassico={null} 
                adicionaisSelecionados={[]} 
            />
        );

        expect(screen.getByText(/Dica:/)).toBeInTheDocument();
        expect(screen.getByText(/Espresso \+ Leite/)).toBeInTheDocument();
    });
});