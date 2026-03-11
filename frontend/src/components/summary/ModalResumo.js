import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const ModalBox = styled.div`
  background: #fff;
  padding: 30px 40px;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
`;

const ModalTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 20px;
`;

const ModalSection = styled.div`
  margin-bottom: 16px;
`;

const ModalList = styled.ul`
  padding-left: 20px;
  margin: 0;
`;

const ModalListItem = styled.li`
  margin-bottom: 6px;
`;

const ModalCloseButton = styled.button`
  padding: 10px 24px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1rem;
  width: 100%;
  margin-top: 20px;
  &:hover {
    background-color: #222;
  }
`;

export function ModalResumo({ aberto, onClose, saborClassico, baseSelecionados, adicionaisSelecionados }) {
    if (!aberto) return null;

    return (
        <ModalOverlay>
            <ModalBox>
                <ModalTitle>Resumo da sua bebida</ModalTitle>

                <ModalSection>
                    <strong>Nome da Bebida:</strong> {saborClassico || 'Café personalizado'}
                </ModalSection>

                <ModalSection>
                    <strong>Ingredientes Base:</strong>
                    {baseSelecionados.length > 0 ? (
                        <ModalList>
                            {baseSelecionados.map((item) => (
                                <ModalListItem key={item}>{item}</ModalListItem>
                            ))}
                        </ModalList>
                    ) : (
                        <p>Nenhum ingrediente base selecionado</p>
                    )}
                </ModalSection>

                <ModalSection>
                    <strong>Ingredientes Adicionais:</strong>
                    {adicionaisSelecionados.length > 0 ? (
                        <ModalList>
                            {adicionaisSelecionados.map((item) => (
                                <ModalListItem key={item}>{item}</ModalListItem>
                            ))}
                        </ModalList>
                    ) : (
                        <p>Nenhum adicional selecionado</p>
                    )}
                </ModalSection>

                <ModalCloseButton onClick={onClose}>Fechar</ModalCloseButton>
            </ModalBox>
        </ModalOverlay>
    );
}