import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const ModalBox = styled.div`
  background: #fff;
  padding: 30px 40px;
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
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
  font-size: 24px;
  cursor: pointer;
  color: #666;
  &:hover {
    color: #000;
  }
`;

const StepList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StepItem = styled.div`
  display: flex;
  gap: 15px;
  align-items: flex-start;
`;

const StepNumber = styled.div`
  width: 30px;
  height: 30px;
  background: #000;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h4`
  margin: 0 0 5px 0;
  font-size: 1.1rem;
`;

const StepDescription = styled.p`
  margin: 0;
  color: #666;
  line-height: 1.5;
`;

const TipBox = styled.div`
  background: #f8f9fa;
  border-left: 4px solid #000;
  padding: 15px;
  margin-top: 20px;
  border-radius: 4px;
`;

export function PassoAPassoModal({ aberto, onClose }) {
    if (!aberto) return null;

    return (
        <ModalOverlay onClick={onClose}>
            <ModalBox onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>Passo a Passo para Criar sua Bebida</ModalTitle>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </ModalHeader>

                <StepList>
                    <StepItem>
                        <StepNumber>1</StepNumber>
                        <StepContent>
                            <StepTitle>Escolha os Ingredientes Base</StepTitle>
                            <StepDescription>
                                Selecione um ou mais ingredientes base para começar seu café.
                                Você pode escolher entre Espresso, Leite, Chocolate, Sorvete e Espuma.
                            </StepDescription>
                        </StepContent>
                    </StepItem>

                    <StepItem>
                        <StepNumber>2</StepNumber>
                        <StepContent>
                            <StepTitle>Confirme o Sabor</StepTitle>
                            <StepDescription>
                                Clique em "Confirmar sabor" para verificar se sua combinação forma um sabor clássico
                                como Macchiato, Latte, Mocha ou Affogato.
                            </StepDescription>
                        </StepContent>
                    </StepItem>

                    <StepItem>
                        <StepNumber>3</StepNumber>
                        <StepContent>
                            <StepTitle>Adicione Ingredientes Extras</StepTitle>
                            <StepDescription>
                                Personalize ainda mais seu café com até 2 ingredientes adicionais
                                como Caramelo, Chantilly, Canela e muito mais.
                            </StepDescription>
                        </StepContent>
                    </StepItem>

                    <StepItem>
                        <StepNumber>4</StepNumber>
                        <StepContent>
                            <StepTitle>Confirme o Pedido</StepTitle>
                            <StepDescription>
                                Revise seu café personalizado e confirme o pedido.
                                Você verá o nome da bebida e todos os ingredientes selecionados.
                            </StepDescription>
                        </StepContent>
                    </StepItem>
                </StepList>

                <TipBox>
                    <strong>💡 Dica:</strong> Experimente combinações clássicas como Espresso + Leite para um Latte,
                    ou Espresso + Leite + Chocolate para um delicioso Mocha!
                </TipBox>
            </ModalBox>
        </ModalOverlay>
    );
}