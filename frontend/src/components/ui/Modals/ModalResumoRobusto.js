import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const ModalBox = styled.div`
  background: #fff;
  padding: 30px 40px;
  border-radius: 20px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 15px 50px rgba(0,0,0,0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 15px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: #222;
  font-size: 1.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #666;
  &:hover {
    color: #000;
  }
`;

const DrinkName = styled.div`
  background: ${({ classico }) => classico ? '#e8f5e9' : '#fff3e0'};
  border: 2px solid ${({ classico }) => classico ? '#4caf50' : '#ff9800'};
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  margin-bottom: 25px;
`;

const DrinkNameLabel = styled.p`
  margin: 0 0 5px 0;
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const DrinkNameValue = styled.h3`
  margin: 0;
  font-size: 1.8rem;
  color: ${({ classico }) => classico ? '#2e7d32' : '#e65100'};
`;

const Section = styled.div`
  margin-bottom: 25px;
`;

const SectionTitle = styled.h4`
  margin: 0 0 15px 0;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
`;

const IngredientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
`;

const IngredientCard = styled.div`
  background: #f9f9f9;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #eee;
`;

const IngredientName = styled.span`
  font-weight: 500;
`;

const IngredientPrice = styled.span`
  background: #000;
  color: #fff;
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 0.8rem;
`;

const PriceSection = styled.div`
  background: #f5f5f5;
  padding: 20px;
  border-radius: 12px;
  margin-top: 20px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 1rem;
`;

const TotalRow = styled(PriceRow)`
  font-weight: 700;
  font-size: 1.3rem;
  border-top: 2px solid #ddd;
  padding-top: 15px;
  margin-top: 10px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 15px 0;
`;

const EmptyState = styled.p`
  color: #999;
  font-style: italic;
  text-align: center;
  padding: 20px;
`;

const Badge = styled.span`
  background: ${({ cor }) => cor || '#000'};
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  margin-left: 8px;
`;

export function ModalResumoRobusto({ 
    aberto, 
    onClose, 
    saborClassico, 
    baseSelecionados = [], 
    adicionaisSelecionados = [],
    precosBase = {},
    precosAdicionais = {},
    precoTotal = 0
}) {
    if (!aberto) return null;

    const isClassico = saborClassico && saborClassico !== 'Café personalizado';
    const temIngredientes = baseSelecionados.length > 0 || adicionaisSelecionados.length > 0;

    // Calcular preços (exemplo - ajustar conforme necessidade)
    const calcularPrecoBase = () => {
        return baseSelecionados.reduce((acc, item) => {
            return acc + (precosBase[item] || 3.0);
        }, 0);
    };

    const calcularPrecoAdicionais = () => {
        return adicionaisSelecionados.reduce((acc, item) => {
            return acc + (precosAdicionais[item] || 1.5);
        }, 0);
    };

    const subtotalBase = calcularPrecoBase();
    const subtotalAdicionais = calcularPrecoAdicionais();
    const total = precoTotal || subtotalBase + subtotalAdicionais;

    return (
        <ModalOverlay onClick={onClose}>
            <ModalBox onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>Resumo da sua bebida</ModalTitle>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </ModalHeader>

                {!temIngredientes ? (
                    <EmptyState>
                        Nenhum ingrediente selecionado ainda.
                        Volte e monte seu café!
                    </EmptyState>
                ) : (
                    <>
                        <DrinkName classico={isClassico}>
                            <DrinkNameLabel>Nome da Bebida</DrinkNameLabel>
                            <DrinkNameValue classico={isClassico}>
                                {saborClassico || 'Café Personalizado'}
                                {isClassico && <Badge cor="#4caf50">Clássico</Badge>}
                            </DrinkNameValue>
                        </DrinkName>

                        {baseSelecionados.length > 0 && (
                            <Section>
                                <SectionTitle>
                                    <span>☕</span> Ingredientes Base
                                </SectionTitle>
                                <IngredientsGrid>
                                    {baseSelecionados.map((item, index) => (
                                        <IngredientCard key={index}>
                                            <IngredientName>{item}</IngredientName>
                                            <IngredientPrice>
                                                R$ {precosBase[item]?.toFixed(2) || '3.00'}
                                            </IngredientPrice>
                                        </IngredientCard>
                                    ))}
                                </IngredientsGrid>
                            </Section>
                        )}

                        {adicionaisSelecionados.length > 0 && (
                            <Section>
                                <SectionTitle>
                                    <span>➕</span> Ingredientes Adicionais
                                </SectionTitle>
                                <IngredientsGrid>
                                    {adicionaisSelecionados.map((item, index) => (
                                        <IngredientCard key={index}>
                                            <IngredientName>{item}</IngredientName>
                                            <IngredientPrice>
                                                R$ {precosAdicionais[item]?.toFixed(2) || '1.50'}
                                            </IngredientPrice>
                                        </IngredientCard>
                                    ))}
                                </IngredientsGrid>
                            </Section>
                        )}

                        <PriceSection>
                            <PriceRow>
                                <span>Subtotal (Base):</span>
                                <span>R$ {subtotalBase.toFixed(2)}</span>
                            </PriceRow>
                            {subtotalAdicionais > 0 && (
                                <PriceRow>
                                    <span>Subtotal (Adicionais):</span>
                                    <span>R$ {subtotalAdicionais.toFixed(2)}</span>
                                </PriceRow>
                            )}
                            <Divider />
                            <TotalRow>
                                <span>Total</span>
                                <span>R$ {total.toFixed(2)}</span>
                            </TotalRow>
                        </PriceSection>
                    </>
                )}
            </ModalBox>
        </ModalOverlay>
    );
}