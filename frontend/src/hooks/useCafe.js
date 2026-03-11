import { useState } from 'react';
import { api } from '../services/api';

export function useCafe(ingredientesBaseLista = [], ingredientesAdicionaisLista = []) {
    const [baseSelecionados, setBaseSelecionados] = useState([]);
    const [adicionaisSelecionados, setAdicionaisSelecionados] = useState([]);
    const [saborClassico, setSaborClassico] = useState(null);
    const [saborNome, setSaborNome] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('error');
    const [modalAberto, setModalAberto] = useState(false);

    const getNomeIngrediente = (id, tipo) => {
        const lista = tipo === 'base' ? ingredientesBaseLista : ingredientesAdicionaisLista;
        const ingrediente = lista.find(i => i.id === id);
        return ingrediente ? ingrediente.nome : 'Ingrediente desconhecido';
    };

    const toggleBase = (id) => {
        setBaseSelecionados(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleAdicional = (id) => {
        const nomeIngrediente = getNomeIngrediente(id, 'adicional');
        
        setAdicionaisSelecionados(prev => {
            if (prev.includes(id)) {
                setAlertMessage(`Ingrediente ${nomeIngrediente} removido`);
                setAlertType('warning');
                setAlertVisible(true);
                return prev.filter(i => i !== id);
            } else if (prev.length < 2) {
                setAlertMessage(`Ingrediente ${nomeIngrediente} adicionado`);
                setAlertType('success');
                setAlertVisible(true);
                return [...prev, id];
            } else {
                const selecionadosNomes = prev
                    .map(pid => getNomeIngrediente(pid, 'adicional'))
                    .join(', ');
                
                setAlertMessage(
                    `Limite máximo de 2 ingredientes adicionais atingido. ` +
                    `Selecionados: ${selecionadosNomes}`
                );
                setAlertType('error');
                setAlertVisible(true);
                return prev;
            }
        });
    };

    const confirmarBase = async () => {
        if (baseSelecionados.length === 0) {
            setAlertMessage('Selecione ao menos um ingrediente base');
            setAlertType('error');
            setAlertVisible(true);
            return;
        }

        setLoading(true);
        setError(null);
        setSaborClassico(null);
        setSaborNome(null);

        try {
            const data = await api.identificarSabor(baseSelecionados);
            
            if (data.saborClassico) {
                if (typeof data.saborClassico === 'object') {
                    setSaborClassico(data.saborClassico);
                    setSaborNome(data.saborClassico.nome);
                } else {
                    setSaborNome(data.saborClassico);
                }
                
                const ingredientesNomes = baseSelecionados
                    .map(id => getNomeIngrediente(id, 'base'))
                    .join(' + ');
                    
                setAlertMessage(
                    `Sabor clássico reconhecido: ${typeof data.saborClassico === 'object' ? data.saborClassico.nome : data.saborClassico} ` +
                    `(Ingredientes: ${ingredientesNomes})`
                );
                setAlertType('success');
            } else {
                setSaborNome('Café personalizado');
                
                const ingredientesNomes = baseSelecionados
                    .map(id => getNomeIngrediente(id, 'base'))
                    .join(' + ');
                    
                setAlertMessage(
                    `Café personalizado criado com os ingredientes: ${ingredientesNomes}`
                );
                setAlertType('success');
            }
            setAlertVisible(true);
            
        } catch (err) {
            setError('Erro ao verificar sabor clássico');
            setAlertMessage('Erro ao comunicar com o servidor');
            setAlertType('error');
            setAlertVisible(true);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const confirmarPedido = async () => {
        if (baseSelecionados.length === 0) {
            setAlertMessage('Selecione pelo menos um ingrediente base para confirmar o pedido');
            setAlertType('error');
            setAlertVisible(true);
            return null;
        }

        try {
            setLoading(true);
            const dados = {
                ingredientesBase: baseSelecionados,
                ingredientesAdicionais: adicionaisSelecionados
            };
            
            const response = await api.confirmarPedido(dados);
            
            const baseNomes = baseSelecionados
                .map(id => getNomeIngrediente(id, 'base'))
                .join(', ');
                
            const adicionaisNomes = adicionaisSelecionados
                .map(id => getNomeIngrediente(id, 'adicional'))
                .join(', ');
            
            let mensagem = `Pedido confirmado! Base: ${baseNomes}`;
            if (adicionaisNomes) {
                mensagem += ` | Adicionais: ${adicionaisNomes}`;
            }
            
            setAlertMessage(mensagem);
            setAlertType('success');
            setAlertVisible(true);
            
            return response;
            
        } catch (err) {
            setAlertMessage('Erro ao confirmar pedido');
            setAlertType('error');
            setAlertVisible(true);
            console.error(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const limparSelecao = () => {
        setBaseSelecionados([]);
        setAdicionaisSelecionados([]);
        setSaborClassico(null);
        setSaborNome(null);
        setAlertMessage('Seleção limpa');
        setAlertType('warning');
        setAlertVisible(true);
    };

    const closeAlert = () => {
        setAlertVisible(false);
    };

    return {
        baseSelecionados,
        adicionaisSelecionados,
        saborClassico,
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
    };
}