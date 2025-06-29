import React, { useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

// Google Fonts - Inter
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background: #fafafa;
    color: #222;
  }
`;

const Container = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 20px;
`;

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #222;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin: 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: 700;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 30px;
`;

const SelectorWrapper = styled.section`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
`;

const SelectorBox = styled.div`
  flex: 1;
  min-width: 280px;
`;

const SelectorTitle = styled.h3`
  margin-bottom: 12px;
  text-align: left;
  font-weight: 600;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start;
`;

const IngredientButton = styled.button`
  padding: 6px 14px;
  font-size: 0.9rem;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#222')};
  border: 1.5px solid #222;
  border-radius: 20px;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  transition: 0.25s;
  &:hover {
    background-color: ${({ selected }) => (selected ? '#111' : '#eee')};
  }
`;

const ConfirmButton = styled.button`
  margin-top: 15px;
  padding: 10px 24px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  user-select: none;
  font-weight: 700;
  width: 100%;
  font-size: 1rem;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    background-color: #222;
  }
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

const SmallCard = styled.div`
  background: #fff;
  border: 1.5px solid #ccc;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 2px 5px rgb(0 0 0 / 0.08);
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: ${({ clickable }) =>
    clickable ? '0 6px 20px rgba(0,0,0,0.15)' : '0 2px 5px rgb(0 0 0 / 0.08)'};
  }
`;

const CardImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
`;

const CardText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FooterWrapper = styled.footer`
  margin-top: 60px;
  text-align: center;
  color: #777;
  font-size: 0.9rem;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 10px;
`;

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

// Alert styles

const AlertOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const AlertBox = styled.div`
  background: #fff;
  padding: 24px 30px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  max-width: 320px;
`;

const AlertTitle = styled.h4`
  margin: 0 0 16px;
  font-size: 1.2rem;
`;

const AlertButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const AlertButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  background-color: ${({ cancel }) => (cancel ? '#ccc' : '#000')};
  color: ${({ cancel }) => (cancel ? '#000' : '#fff')};
`;

// Modal styles

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

function Header() {
    return (
        <HeaderWrapper>
            <div><strong>Cafeteria CodeQual</strong></div>
            <nav><NavLink href="#contato">Contato</NavLink></nav>
        </HeaderWrapper>
    );
}

function IngredientSelector({ title, ingredientes, selecionados, toggle, confirmLabel, onConfirm, confirmDisabled }) {
    return (
        <SelectorBox>
            <SelectorTitle>{title}</SelectorTitle>
            <ButtonGroup>
                {ingredientes.map(item => (
                    <IngredientButton
                        key={item}
                        selected={selecionados.includes(item)}
                        onClick={() => toggle(item)}
                        type="button"
                    >
                        {item}
                    </IngredientButton>
                ))}
            </ButtonGroup>
            {onConfirm && (
                <ConfirmButton onClick={onConfirm} disabled={confirmDisabled} type="button">
                    {confirmLabel}
                </ConfirmButton>
            )}
        </SelectorBox>
    );
}

function Summary({ saborClassico, adicionaisSelecionados }) {
    return (
        <SummarySection>
            <SummaryContent>
                <LeftInfo>
                    <div>
                        <h3>Identificação do Sabor Clássico</h3>
                        <p>Verifique se sua combinação forma um sabor clássico.</p>
                    </div>
                </LeftInfo>

                <RightCards>
                    <SmallCard>
                        <CardImage
                            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80"
                            alt="Café"
                        />
                        <CardText>
                            <strong>Sabor Clássico Reconhecido</strong>
                            <p style={{ margin: 0 }}>
                                Você criou um <strong>{saborClassico || 'café personalizado'}</strong>
                            </p>
                        </CardText>
                    </SmallCard>

                    <SmallCard>
                        <CardImage
                            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80"
                            alt="Adicionais"
                        />
                        <CardText>
                            <strong>Adicionais</strong>
                            <p style={{ margin: 0 }}>
                                {adicionaisSelecionados.length > 0
                                    ? `Com ${adicionaisSelecionados.join(', ')}`
                                    : 'Nenhum adicional selecionado'}
                            </p>
                        </CardText>
                    </SmallCard>
                </RightCards>
            </SummaryContent>
        </SummarySection>
    );
}

function Footer() {
    return <FooterWrapper>SENAI Soluções Digitais</FooterWrapper>;
}

function ModalResumo({ aberto, onClose, saborClassico, baseSelecionados, adicionaisSelecionados }) {
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

function App() {
    const [baseSelecionados, setBaseSelecionados] = useState([]);
    const [adicionaisSelecionados, setAdicionaisSelecionados] = useState([]);
    const [saborClassico, setSaborClassico] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [alertVisible, setAlertVisible] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);

    const toggleBase = (item) => {
        setBaseSelecionados(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    };

    // Aqui só foi adicionada a restrição para máximo 2 adicionais
    const toggleAdicional = (item) => {
        setAdicionaisSelecionados(prev => {
            if (prev.includes(item)) {
                // Remove se já estava selecionado
                return prev.filter(i => i !== item);
            } else if (prev.length < 2) {
                // Adiciona somente se tiver menos de 2 selecionados
                return [...prev, item];
            } else {
                // Ignora se já tiver 2 selecionados
                return prev;
            }
        });
    };

    const confirmarBase = async () => {
        if (baseSelecionados.length === 0) {
            setAlertVisible(true);
            return;
        }

        setLoading(true);
        setError(null);
        setSaborClassico(null);

        try {
            const res = await fetch('http://localhost:3000/cafes/identificar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ingredientes: baseSelecionados }),
            });

            if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
            const data = await res.json();
            setSaborClassico(data.saborClassico || 'Café personalizado');
        } catch (err) {
            setError('Erro ao verificar sabor clássico');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <GlobalStyle />

            {/* Alert */}
            {alertVisible && (
                <AlertOverlay>
                    <AlertBox>
                        <AlertTitle>Selecione ao menos um ingrediente base!</AlertTitle>
                        <AlertButtonGroup>
                            <AlertButton onClick={() => setAlertVisible(false)}>OK</AlertButton>
                            <AlertButton cancel onClick={() => setAlertVisible(false)}>X</AlertButton>
                        </AlertButtonGroup>
                    </AlertBox>
                </AlertOverlay>
            )}

            {/* Modal resumo da bebida */}
            <ModalResumo
                aberto={modalAberto}
                onClose={() => setModalAberto(false)}
                saborClassico={saborClassico}
                baseSelecionados={baseSelecionados}
                adicionaisSelecionados={adicionaisSelecionados}
            />

            <Container>
                <Header />

                <Subtitle><strong>O café do jeito!</strong></Subtitle>
                <Title>Monte Seu Café</Title>
                <Description>Descubra como criar a bebida perfeita para você! Escolha seus ingredientes e personalize seu café de forma simples e divertida.</Description>

                <InfoHighlight>
                    <InfoTitle>Descubra como é personalizar seu café de forma simples e rápida</InfoTitle>
                    <CardGrid>
                        <InfoCard>
                            <Icon>🥤</Icon>
                            <CardTitle>Passo a passo para criar sua bebida</CardTitle>
                            <CardDescription>Escolha seus ingredientes, identifique seu sabor clássico e veja o resumo da sua bebida</CardDescription>
                            <AnimatedLink onClick={() => {}}>Confirmar</AnimatedLink>
                        </InfoCard>
                        <InfoCard>
                            <Icon>❓</Icon>
                            <CardTitle>Como funciona a identificação do sabor clássico?</CardTitle>
                            <CardDescription>
                                Nosso sistema reconhece automaticamente se sua combinação de ingredientes forma um sabor clássico
                            </CardDescription>
                            <AnimatedLink onClick={() => {}}>Confira</AnimatedLink>
                        </InfoCard>
                        <InfoCard>
                            <Icon>🍹</Icon>
                            <CardTitle>Resumo da sua escolha personalizada</CardTitle>
                            <CardDescription>Veja o nome da sua bebida e todos os ingredientes escolhidos</CardDescription>
                            {/* Aqui acionamos o modal */}
                            <AnimatedLink onClick={() => setModalAberto(true)}>Adicione</AnimatedLink>
                        </InfoCard>
                    </CardGrid>
                </InfoHighlight>

                <SelectorWrapper>
                    <IngredientSelector
                        title="Base:"
                        ingredientes={["Espresso", "Leite", "Chocolate", "Sorvete", "Espuma"]}
                        selecionados={baseSelecionados}
                        toggle={toggleBase}
                        confirmLabel={loading ? 'Carregando...' : 'Confirmar sabor'}
                        onConfirm={confirmarBase}
                        confirmDisabled={loading}
                    />

                    <IngredientSelector
                        title="Adicionais:"
                        ingredientes={["Caramelo", "Calda de Chocolate", "Chantilly", "Canela"]}
                        selecionados={adicionaisSelecionados}
                        toggle={toggleAdicional}
                        confirmLabel="Adicionar"
                        onConfirm={() => {}} // não faz nada, só botão visual
                    />
                </SelectorWrapper>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <Summary saborClassico={saborClassico} adicionaisSelecionados={adicionaisSelecionados} />

                <Footer />
            </Container>
        </>
    );
}

export default App;
