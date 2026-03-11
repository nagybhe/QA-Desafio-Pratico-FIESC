import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { PassoAPassoModal } from './Modals/PassoAPassoModal';
import { ComoFuncionaModal } from './Modals/ComoFuncionaModal';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const InfoHighlight = styled.section`
  text-align: center;
  margin: 40px auto;
`;

const InfoTitle = styled.h2`
  font-weight: 600;
  margin-bottom: 30px;
`;

const CardGrid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const InfoCard = styled.div`
  background: #fff;
  border: none;
  border-radius: 16px;
  padding: 20px;
  width: 260px;
  box-shadow: none;
  text-align: center;
  animation: ${fadeIn} 0.4s ease-in-out;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.12);
  }
`;

const Icon = styled.div`
  font-size: 28px;
  margin-bottom: 10px;
`;

const CardTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  margin: 0 0 16px 0;
  color: #666;
`;

const AnimatedLink = styled.button`
  background: none;
  border: none;
  color: #000;
  font-weight: bold;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 0;
  position: relative;
  &:after {
    content: '>';
    margin-left: 6px;
    transition: transform 0.2s ease;
  }
  &:hover:after {
    transform: translateX(4px);
  }
`;

export function InfoCards() {
    const [modalPassoAberto, setModalPassoAberto] = useState(false);
    const [modalComoFuncionaAberto, setModalComoFuncionaAberto] = useState(false);

    return (
        <>
            <PassoAPassoModal 
                aberto={modalPassoAberto} 
                onClose={() => setModalPassoAberto(false)} 
            />
            
            <ComoFuncionaModal 
                aberto={modalComoFuncionaAberto} 
                onClose={() => setModalComoFuncionaAberto(false)} 
            />

            <InfoHighlight>
                <InfoTitle>Descubra como é personalizar seu café de forma simples e rápida</InfoTitle>
                <CardGrid>
                    <InfoCard onClick={() => setModalPassoAberto(true)}>
                        <Icon>🥤</Icon>
                        <CardTitle>Passo a passo para criar sua bebida</CardTitle>
                        <CardDescription>
                            Escolha seus ingredientes, identifique seu sabor clássico e veja o resumo da sua bebida
                        </CardDescription>
                        <AnimatedLink onClick={() => setModalPassoAberto(true)}>
            Saiba mais
                        </AnimatedLink>
                    </InfoCard>

                    <InfoCard onClick={() => setModalComoFuncionaAberto(true)}>
                        <Icon>❓</Icon>
                        <CardTitle>Como funciona a identificação do sabor clássico?</CardTitle>
                        <CardDescription>
                            Entenda como o sistema reconhece automaticamente se sua combinação forma um sabor clássico
                        </CardDescription>
                        <AnimatedLink onClick={() => setModalComoFuncionaAberto(true)}>
                            Confira
                        </AnimatedLink>
                    </InfoCard>
                </CardGrid>
            </InfoHighlight>
        </>
    );
}