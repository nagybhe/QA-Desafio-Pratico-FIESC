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

const PedidosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
`;

const PedidoCard = styled.div`
  background: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 20px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const PedidoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #000;
`;

const PedidoNome = styled.h3`
  margin: 0;
  color: #000;
  font-size: 1.2rem;
  flex: 1;
`;

const PedidoData = styled.span`
  color: #666;
  font-size: 0.85rem;
`;

const IngredientesList = styled.div`
  margin: 15px 0;
`;

const IngredienteTag = styled.span`
  display: inline-block;
  background: ${({ tipo }) => tipo === 'base' ? '#000' : '#666'};
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  margin: 0 4px 4px 0;
`;

const PrecoTotal = styled.div`
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid #ddd;
  text-align: right;
  font-weight: 700;
  font-size: 1.2rem;
  color: #000;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #999;
  font-style: italic;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #666;
  padding: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  padding: 20px;
`;

const RefreshButton = styled.button`
  background: #000;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 0.9rem;
  
  &:hover {
    background: #333;
  }
`;

const HeaderWithRefresh = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PedidoId = styled.span`
  background: #e0e0e0;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.7rem;
  margin-left: 8px;
  color: #666;
`;

export function PedidosConfirmados() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPedidos = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Buscar pedidos da API
            const data = await api.getPedidos();
            console.log('Pedidos recebidos:', data); // Para debug
            setPedidos(data);
            
        } catch (err) {
            console.error('Erro ao buscar pedidos:', err);
            setError('Erro ao carregar pedidos confirmados');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPedidos();
    }, []);

    // Função corrigida para formatar data
    const formatarData = (dataString) => {
        if (!dataString) return 'Data indisponível';
        
        try {
            // Criar objeto Date
            const data = new Date(dataString);
            
            // Verificar se a data é válida
            if (isNaN(data.getTime())) {
                console.warn('Data inválida:', dataString);
                return 'Data inválida';
            }
            
            // Formatar data
            return data.toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
        } catch (error) {
            console.error('Erro ao formatar data:', error);
            return 'Data inválida';
        }
    };

    // Função para formatar preço (corrigindo vírgula)
    const formatarPreco = (preco) => {
        if (preco === undefined || preco === null) return '0,00';
        
        try {
            // Se for string, substituir vírgula por ponto e converter
            let valor = preco;
            if (typeof preco === 'string') {
                valor = parseFloat(preco.replace(',', '.'));
            }
            
            // Garantir que é número
            if (isNaN(valor)) return '0,00';
            
            // Formatar com 2 casas decimais e vírgula
            return valor.toFixed(2).replace('.', ',');
        } catch (error) {
            console.error('Erro ao formatar preço:', error);
            return '0,00';
        }
    };

    if (loading) return <LoadingMessage>Carregando pedidos...</LoadingMessage>;
    
    if (error) {
        return (
            <Container>
                <ErrorMessage>{error}</ErrorMessage>
                <RefreshButton onClick={fetchPedidos}>Tentar novamente</RefreshButton>
            </Container>
        );
    }

    return (
        <Container>
            <HeaderWithRefresh>
                <Title>📋 Pedidos Confirmados</Title>
                <RefreshButton onClick={fetchPedidos}>↻ Atualizar</RefreshButton>
            </HeaderWithRefresh>
            
            {pedidos.length === 0 ? (
                <EmptyState>Nenhum pedido confirmado ainda.</EmptyState>
            ) : (
                <PedidosGrid>
                    {pedidos.map(pedido => (
                        <PedidoCard key={pedido.id}>
                            <PedidoHeader>
                                <PedidoNome>
                                    {pedido.nome || 'Café'}
                                    <PedidoId>#{pedido.id}</PedidoId>
                                </PedidoNome>
                                <PedidoData>{formatarData(pedido.dados || pedido.data)}</PedidoData>
                            </PedidoHeader>
                            
                            <IngredientesList>
                                <strong>Ingredientes Base:</strong><br />
                                {pedido.ingredientes?.base?.length > 0 ? (
                                    pedido.ingredientes.base.map((ing, idx) => (
                                        <IngredienteTag key={idx} tipo="base">
                                            {ing.nome || ing} {ing.quantidade > 1 && `(x${ing.quantidade})`}
                                        </IngredienteTag>
                                    ))
                                ) : (
                                    <span style={{ color: '#999', fontStyle: 'italic' }}>Nenhum ingrediente base</span>
                                )}
                                
                                {pedido.ingredientes?.adicionais?.length > 0 && (
                                    <>
                                        <br /><strong>Adicionais:</strong><br />
                                        {pedido.ingredientes.adicionais.map((ing, idx) => (
                                            <IngredienteTag key={idx} tipo="adicional">
                                                {ing.nome || ing} {ing.quantidade > 1 && `(x${ing.quantidade})`}
                                            </IngredienteTag>
                                        ))}
                                    </>
                                )}
                            </IngredientesList>
                            
                            <PrecoTotal>R$ {formatarPreco(pedido.preco)}</PrecoTotal>
                        </PedidoCard>
                    ))}
                </PedidosGrid>
            )}
        </Container>
    );
}