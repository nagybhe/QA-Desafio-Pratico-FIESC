import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '../components/common/Container';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { IngredientSelector } from '../components/ingredients/IngredientSelector';
import { Summary } from '../components/summary/Summary';
import { ModalResumoRobusto } from '../components/summary/ModalResumoRobusto';
import { Alert } from '../components/ui/Alert';
import { InfoCards } from '../components/ui/InfoCards';
import { GlobalStyle } from '../components/ui/GlobalStyles';
import { Tabs } from '../components/ui/Tabs';
import { PedidosConfirmados } from '../components/pedidos/PedidosConfirmados';
import { TodosIngredientes } from '../components/ingredientes/TodosIngredientes';
import { useCafe } from '../hooks/useCafe';
import { api } from '../services/api';

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

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 10px;
`;

const LoadingMessage = styled.p`
  color: #666;
  text-align: center;
  margin-top: 20px;
  font-style: italic;
`;

const ConfirmOrderButton = styled.button`
  margin-top: 30px;
  padding: 15px 30px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  user-select: none;
  font-weight: 700;
  font-size: 1.2rem;
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  transition: background-color 0.3s;
  
  &:hover:not(:disabled) {
    background-color: #218838;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ClearButton = styled.button`
  margin-top: 30px;
  padding: 15px 30px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  user-select: none;
  font-weight: 700;
  font-size: 1.2rem;
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  transition: background-color 0.3s;
  
  &:hover:not(:disabled) {
    background-color: #5a6268;
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const InfoTabContainer = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: center;
`;

export function Home() {
    const [ingredientesBase, setIngredientesBase] = useState([]);
    const [ingredientesAdicionais, setIngredientesAdicionais] = useState([]);
    const [loadingIngredientes, setLoadingIngredientes] = useState(true);
    const [errorIngredientes, setErrorIngredientes] = useState(null);
    const [precosBase, setPrecosBase] = useState({});
    const [precosAdicionais, setPrecosAdicionais] = useState({});
    const [precoTotal, setPrecoTotal] = useState(0);
    const [mostrarResumoPedido, setMostrarResumoPedido] = useState(false);

    const {
        baseSelecionados,
        adicionaisSelecionados,
        saborNome,
        loading,
        error,
        alertVisible,
        alertMessage,
        alertType,
        modalAberto,
        setModalAberto,
        toggleBase,
        toggleAdicional,
        confirmarBase,
        confirmarPedido,
        limparSelecao,
        closeAlert
    } = useCafe(ingredientesBase, ingredientesAdicionais);

    // Buscar ingredientes da API
    useEffect(() => {
        const fetchIngredientes = async () => {
            try {
                setLoadingIngredientes(true);
                const [base, adicionais] = await Promise.all([
                    api.getIngredientesBase(),
                    api.getIngredientesAdicionais()
                ]);
                
                setIngredientesBase(base);
                setIngredientesAdicionais(adicionais);
                
                // Criar objetos de preço para lookup
                const precosBaseObj = {};
                base.forEach(ing => {
                    precosBaseObj[ing.nome] = ing.preco;
                });
                setPrecosBase(precosBaseObj);
                
                const precosAdicionaisObj = {};
                adicionais.forEach(ing => {
                    precosAdicionaisObj[ing.nome] = ing.preco;
                });
                setPrecosAdicionais(precosAdicionaisObj);
                
                setErrorIngredientes(null);
            } catch (err) {
                console.error('Erro ao buscar ingredientes:', err);
                setErrorIngredientes('Não foi possível carregar os ingredientes. Tente novamente mais tarde.');
            } finally {
                setLoadingIngredientes(false);
            }
        };

        fetchIngredientes();
    }, []);

    // Calcular preço total quando seleções mudarem
    useEffect(() => {
        let total = 0;
        
        baseSelecionados.forEach(id => {
            const ing = ingredientesBase.find(i => i.id === id);
            if (ing) total += ing.preco;
        });
        
        adicionaisSelecionados.forEach(id => {
            const ing = ingredientesAdicionais.find(i => i.id === id);
            if (ing) total += ing.preco;
        });
        
        setPrecoTotal(total);
    }, [baseSelecionados, adicionaisSelecionados, ingredientesBase, ingredientesAdicionais]);

    // Função para lidar com o clique em confirmar pedido
    const handleConfirmarPedido = async () => {
        const resultado = await confirmarPedido();
        if (resultado && resultado.sucesso) {
            setMostrarResumoPedido(true);
            // Abrir modal automaticamente após 1 segundo
            setTimeout(() => {
                setModalAberto(true);
            }, 1000);
        }
    };

    // Funções auxiliares para converter ID <-> Nome
    const getNomeById = (id, lista) => {
        const item = lista.find(i => i.id === id);
        return item ? item.nome : id;
    };

    const getIdByNome = (nome, lista) => {
        const item = lista.find(i => i.nome === nome);
        return item ? item.id : null;
    };

    if (loadingIngredientes) {
        return (
            <>
                <GlobalStyle />
                <Container>
                    <Header />
                    <LoadingMessage>Carregando ingredientes...</LoadingMessage>
                    <Footer />
                </Container>
            </>
        );
    }

    if (errorIngredientes) {
        return (
            <>
                <GlobalStyle />
                <Container>
                    <Header />
                    <ErrorMessage>{errorIngredientes}</ErrorMessage>
                    <Footer />
                </Container>
            </>
        );
    }

    // Conteúdo da aba "Realizar Pedido" (sem os cards)
    const RealizarPedidoContent = (
        <>
            <SelectorWrapper>
                <IngredientSelector
                    title="Base:"
                    ingredientes={ingredientesBase.map(i => i.nome)}
                    selecionados={baseSelecionados.map(id => getNomeById(id, ingredientesBase))}
                    toggle={(nome) => {
                        const id = getIdByNome(nome, ingredientesBase);
                        if (id) toggleBase(id);
                    }}
                    confirmLabel={loading ? 'Carregando...' : 'Confirmar sabor'}
                    onConfirm={confirmarBase}
                    confirmDisabled={loading}
                />

                <IngredientSelector
                    title="Adicionais:"
                    ingredientes={ingredientesAdicionais.map(i => i.nome)}
                    selecionados={adicionaisSelecionados.map(id => getNomeById(id, ingredientesAdicionais))}
                    toggle={(nome) => {
                        const id = getIdByNome(nome, ingredientesAdicionais);
                        if (id) toggleAdicional(id);
                    }}
                    confirmLabel="Adicionar"
                    onConfirm={() => {}}
                />
            </SelectorWrapper>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Summary 
                saborClassico={saborNome} 
                adicionaisSelecionados={adicionaisSelecionados.map(id => getNomeById(id, ingredientesAdicionais))} 
            />

            <ButtonContainer>
                <ConfirmOrderButton 
                    onClick={handleConfirmarPedido}
                    disabled={baseSelecionados.length === 0 || loading}
                >
                    {loading ? 'Processando...' : 'Confirmar Pedido'}
                </ConfirmOrderButton>
                
                <ClearButton 
                    onClick={limparSelecao}
                    disabled={baseSelecionados.length === 0 && adicionaisSelecionados.length === 0}
                >
                    Limpar Seleção
                </ClearButton>
            </ButtonContainer>
        </>
    );

    // Conteúdo da aba "Informações" usando o componente InfoCards existente
    const InformacoesContent = (
        <InfoTabContainer>
            <InfoCards />
        </InfoTabContainer>
    );

    // Definir as abas - AGORA COM 4 TABS
    const tabs = [
        {
            title: '📝 Realizar Pedido',
            content: RealizarPedidoContent
        },
        {
            title: '✅ Pedidos Confirmados',
            content: <PedidosConfirmados />
        },
        {
            title: '📦 Todos Ingredientes',
            content: <TodosIngredientes />
        },
        {
            title: 'ℹ️ Informações',
            content: InformacoesContent
        }
    ];

    return (
        <>
            <GlobalStyle />
            
            <Alert 
                visible={alertVisible} 
                message={alertMessage}
                type={alertType}
                onClose={closeAlert} 
            />

            <ModalResumoRobusto
                aberto={modalAberto}
                onClose={() => {
                    setModalAberto(false);
                    setMostrarResumoPedido(false);
                }}
                saborClassico={saborNome}
                baseSelecionados={baseSelecionados.map(id => getNomeById(id, ingredientesBase))}
                adicionaisSelecionados={adicionaisSelecionados.map(id => getNomeById(id, ingredientesAdicionais))}
                precosBase={precosBase}
                precosAdicionais={precosAdicionais}
                precoTotal={precoTotal}
            />

            <Container>
                <Header />

                <Subtitle><strong>O café do jeito!</strong></Subtitle>
                <Title>Monte Seu Café</Title>
                <Description>Descubra como criar a bebida perfeita para você! Escolha seus ingredientes e personalize seu café de forma simples e divertida.</Description>

                <Tabs tabs={tabs} defaultTab={0} />

                <Footer />
            </Container>
        </>
    );
}