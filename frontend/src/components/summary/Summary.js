import React from 'react';
import styled, { keyframes } from 'styled-components';
import { SummaryCard } from './SummaryCard';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

const SummarySection = styled.section`
  margin-top: 40px;
`;

const SummaryContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
`;

const LeftInfo = styled.div`
  flex: 1;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RightCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  min-width: 250px;
`;

const SaborIdentificado = styled.div`
  background: ${({ identificado }) => identificado ? '#e8f5e9' : '#fff3e0'};
  border-left: 4px solid ${({ identificado }) => identificado ? '#4caf50' : '#ff9800'};
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  animation: ${({ identificado }) => identificado ? pulse : 'none'} 0.5s ease;
`;

const SaborTitulo = styled.h4`
  margin: 0 0 8px 0;
  color: ${({ identificado }) => identificado ? '#2e7d32' : '#e65100'};
  font-size: 1.1rem;
`;

const SaborNome = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ identificado }) => identificado ? '#1b5e20' : '#bf360c'};
`;

const SaborDescricao = styled.p`
  margin: 8px 0 0 0;
  color: #555;
  font-size: 0.9rem;
`;

const EmptyState = styled.div`
  background: #f5f5f5;
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  color: #777;
  font-style: italic;
`;

const VerificacaoHint = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  font-size: 0.85rem;
  color: #666;
  
  span {
    background: #e0e0e0;
    padding: 2px 8px;
    border-radius: 12px;
    font-weight: 600;
  }
`;

export function Summary({ saborClassico, adicionaisSelecionados }) {
    const temSaborIdentificado = saborClassico && saborClassico !== 'Café personalizado';
    
    return (
        <SummarySection>
            <SummaryContent>
                <LeftInfo>
                    <div>
                        <h3>Identificação do Sabor Clássico</h3>
                        <p>Verifique se sua combinação forma um sabor clássico.</p>
                        
                        {temSaborIdentificado ? (
                            <SaborIdentificado identificado={true}>
                                <SaborTitulo identificado={true}>✨ Sabor Clássico Reconhecido!</SaborTitulo>
                                <SaborNome identificado={true}>{saborClassico}</SaborNome>
                                <SaborDescricao>
                                    Sua combinação de ingredientes forma um sabor clássico da casa!
                                </SaborDescricao>
                            </SaborIdentificado>
                        ) : saborClassico === 'Café personalizado' ? (
                            <SaborIdentificado identificado={false}>
                                <SaborTitulo identificado={false}>☕ Café Personalizado</SaborTitulo>
                                <SaborNome identificado={false}>{saborClassico}</SaborNome>
                                <SaborDescricao>
                                    Esta combinação não corresponde a um sabor clássico, mas criamos um café exclusivo para você!
                                </SaborDescricao>
                            </SaborIdentificado>
                        ) : (
                            <EmptyState>
                                <p>👈 Selecione os ingredientes base e clique em "Confirmar sabor"</p>
                                <VerificacaoHint>
                                    <span>Dica:</span> Experimente combinações como Espresso + Leite para Latte
                                </VerificacaoHint>
                            </EmptyState>
                        )}
                    </div>
                </LeftInfo>

                <RightCards>
                    <SummaryCard
                        image="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80"
                        title="Sabor Clássico Reconhecido"
                        clickable={false}
                    >
                        {temSaborIdentificado ? (
                            <strong style={{ color: '#2e7d32' }}>{saborClassico}</strong>
                        ) : saborClassico === 'Café personalizado' ? (
                            <span style={{ color: '#bf360c' }}>{saborClassico}</span>
                        ) : (
                            'Aguardando confirmação...'
                        )}
                    </SummaryCard>

                    <SummaryCard
                        image="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80"
                        title="Adicionais"
                        clickable={false}
                    >
                        {adicionaisSelecionados.length > 0
                            ? adicionaisSelecionados.join(' + ')
                            : 'Nenhum adicional selecionado'}
                    </SummaryCard>
                </RightCards>
            </SummaryContent>
        </SummarySection>
    );
}