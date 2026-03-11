import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { api } from '../../services/api';

const Container = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  margin: 0 0 20px 0;
  color: #333;
`;

const IngredientesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const CategoriaSection = styled.div`
  margin-bottom: 30px;
`;

const CategoriaTitle = styled.h3`
  margin: 0 0 15px 0;
  color: #000;
  border-bottom: 2px solid #000;
  padding-bottom: 5px;
`;

const IngredienteCard = styled.div`
  background: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(4px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
`;

const IngredienteInfo = styled.div`
  flex: 1;
`;

const IngredienteNome = styled.h4`
  margin: 0 0 5px 0;
  color: #333;
`;

const IngredienteTipo = styled.span`
  background: ${({ tipo }) => tipo === 'base' ? '#000' : '#666'};
  color: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.7rem;
  text-transform: uppercase;
`;

const IngredientePreco = styled.div`
  background: #000;
  color: #fff;
  padding: 8px 12px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 1.1rem;
  min-width: 80px;
  text-align: center;
`;

const Disponibilidade = styled.span`
  display: inline-block;
  margin-left: 8px;
  color: ${({ disponivel }) => disponivel ? '#4caf50' : '#f44336'};
  font-size: 0.8rem;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #666;
  padding: 20px;
`;

const EmptyState = styled.p`
  text-align: center;
  color: #999;
  padding: 40px;
  font-style: italic;
`;

export function TodosIngredientes() {
    const [ingredientesBase, setIngredientesBase] = useState([]);
    const [ingredientesAdicionais, setIngredientesAdicionais] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIngredientes = async () => {
            try {
                setLoading(true);
                const [base, adicionais] = await Promise.all([
                    api.getIngredientesBase(),
                    api.getIngredientesAdicionais()
                ]);
                
                setIngredientesBase(base);
                setIngredientesAdicionais(adicionais);
                setError(null);
            } catch (err) {
                console.error('Erro ao buscar ingredientes:', err);
                setError('Erro ao carregar ingredientes');
            } finally {
                setLoading(false);
            }
        };

        fetchIngredientes();
    }, []);

    if (loading) return <LoadingMessage>Carregando ingredientes...</LoadingMessage>;
    if (error) return <ErrorMessage>{error}</ErrorMessage>;

    return (
        <Container>
            <Title>📦 Todos os Ingredientes</Title>

            <CategoriaSection>
                <CategoriaTitle>☕ Ingredientes Base</CategoriaTitle>
                <IngredientesGrid>
                    {ingredientesBase.map(ing => (
                        <IngredienteCard key={ing.id}>
                            <IngredienteInfo>
                                <IngredienteNome>
                                    {ing.nome}
                                    <Disponibilidade disponivel={ing.disponivel}>
                                        {ing.disponivel ? '●' : '○'}
                                    </Disponibilidade>
                                </IngredienteNome>
                                <IngredienteTipo tipo="base">Base</IngredienteTipo>
                            </IngredienteInfo>
                            <IngredientePreco>R$ {ing.preco.toFixed(2)}</IngredientePreco>
                        </IngredienteCard>
                    ))}
                </IngredientesGrid>
            </CategoriaSection>

            <CategoriaSection>
                <CategoriaTitle>➕ Ingredientes Adicionais</CategoriaTitle>
                <IngredientesGrid>
                    {ingredientesAdicionais.map(ing => (
                        <IngredienteCard key={ing.id}>
                            <IngredienteInfo>
                                <IngredienteNome>
                                    {ing.nome}
                                    <Disponibilidade disponivel={ing.disponivel}>
                                        {ing.disponivel ? '●' : '○'}
                                    </Disponibilidade>
                                </IngredienteNome>
                                <IngredienteTipo tipo="adicional">Adicional</IngredienteTipo>
                            </IngredienteInfo>
                            <IngredientePreco>R$ {ing.preco.toFixed(2)}</IngredientePreco>
                        </IngredienteCard>
                    ))}
                </IngredientesGrid>
            </CategoriaSection>

            <Legenda>
                <span>● Disponível</span>
                <span>○ Indisponível</span>
            </Legenda>
        </Container>
    );
}

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  padding: 20px;
`;

const Legenda = styled.div`
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  color: #666;
  font-size: 0.9rem;
`;