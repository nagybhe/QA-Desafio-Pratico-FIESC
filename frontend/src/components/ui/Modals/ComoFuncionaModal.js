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
  max-width: 600px;
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

const Section = styled.div`
  margin-bottom: 25px;
`;

const SectionTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #333;
`;

const Text = styled.p`
  margin: 0 0 15px 0;
  line-height: 1.6;
  color: #555;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;
`;

const Th = styled.th`
  background: #f5f5f5;
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const ClassicFlavorList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin: 15px 0;
`;

const FlavorCard = styled.div`
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #000;
`;

const FlavorName = styled.h4`
  margin: 0 0 5px 0;
  color: #000;
`;

const FlavorIngredients = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.9rem;
`;

export function ComoFuncionaModal({ aberto, onClose }) {
    if (!aberto) return null;

    return (
        <ModalOverlay onClick={onClose}>
            <ModalBox onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>Como funciona a identificação do sabor clássico?</ModalTitle>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </ModalHeader>

                <Section>
                    <SectionTitle>🎯 O que é um sabor clássico?</SectionTitle>
                    <Text>
                        Nossa cafeteria possui receitas tradicionais que combinam ingredientes base de formas específicas.
                        Quando você seleciona ingredientes que correspondem exatamente a uma dessas receitas,
                        o sistema reconhece automaticamente o sabor clássico.
                    </Text>
                </Section>

                <Section>
                    <SectionTitle>📋 Sabores clássicos disponíveis:</SectionTitle>
                    <ClassicFlavorList>
                        <FlavorCard>
                            <FlavorName>Macchiato</FlavorName>
                            <FlavorIngredients>Espresso + Leite + Espuma</FlavorIngredients>
                        </FlavorCard>
                        <FlavorCard>
                            <FlavorName>Latte</FlavorName>
                            <FlavorIngredients>Espresso + Leite</FlavorIngredients>
                        </FlavorCard>
                        <FlavorCard>
                            <FlavorName>Mocha</FlavorName>
                            <FlavorIngredients>Espresso + Leite + Chocolate</FlavorIngredients>
                        </FlavorCard>
                        <FlavorCard>
                            <FlavorName>Affogato</FlavorName>
                            <FlavorIngredients>Sorvete + Espresso</FlavorIngredients>
                        </FlavorCard>
                        <FlavorCard>
                            <FlavorName>Espresso Puro</FlavorName>
                            <FlavorIngredients>Espresso</FlavorIngredients>
                        </FlavorCard>
                        <FlavorCard>
                            <FlavorName>Cappuccino</FlavorName>
                            <FlavorIngredients>Espresso + Leite + Espuma</FlavorIngredients>
                        </FlavorCard>
                    </ClassicFlavorList>
                </Section>

                <Section>
                    <SectionTitle>⚙️ Como funciona o reconhecimento?</SectionTitle>
                    <Text>
                        1. Você seleciona os ingredientes base<br/>
                        2. O sistema compara sua seleção com as receitas cadastradas<br/>
                        3. Se houver correspondência exata, o sabor clássico é identificado<br/>
                        4. Caso contrário, sua bebida é considerada um "Café Personalizado"<br/>
                    </Text>
                </Section>

                <Section>
                    <SectionTitle>🔍 Exemplo prático:</SectionTitle>
                    <Table>
                        <thead>
                            <tr>
                                <Th>Ingredientes Selecionados</Th>
                                <Th>Resultado</Th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <Td>Espresso + Leite</Td>
                                <Td><strong>Latte</strong> (Sabor Clássico)</Td>
                            </tr>
                            <tr>
                                <Td>Espresso + Leite + Chocolate</Td>
                                <Td><strong>Mocha</strong> (Sabor Clássico)</Td>
                            </tr>
                            <tr>
                                <Td>Espresso + Chocolate</Td>
                                <Td><strong>Café Personalizado</strong></Td>
                            </tr>
                        </tbody>
                    </Table>
                </Section>

                <TipBox>
                    <strong>💡 Sabia que?</strong> Você pode criar combinações únicas!
                    Mesmo que não forme um sabor clássico, seu café personalizado pode se tornar sua nova bebida favorita.
                </TipBox>
            </ModalBox>
        </ModalOverlay>
    );
}

const TipBox = styled.div`
  background: #f8f9fa;
  border-left: 4px solid #000;
  padding: 15px;
  margin-top: 20px;
  border-radius: 4px;
`;