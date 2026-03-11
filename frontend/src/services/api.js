const API_URL = 'http://localhost:3000';

export const api = {
    // Ingredientes
    async getIngredientesBase() {
        const res = await fetch(`${API_URL}/ingredientes/base`);
        if (!res.ok) throw new Error('Erro ao buscar ingredientes base');
        return res.json();
    },

    async getIngredientesAdicionais() {
        const res = await fetch(`${API_URL}/ingredientes/adicionais`);
        if (!res.ok) throw new Error('Erro ao buscar ingredientes adicionais');
        return res.json();
    },

    // Café
    async identificarSabor(ingredientesIds) {
        const res = await fetch(`${API_URL}/cafes/identificar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ingredientes: ingredientesIds }),
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.erro || 'Erro ao identificar sabor');
        }
        return res.json();
    },

    async montarCafe(dados) {
        const res = await fetch(`${API_URL}/cafes/montar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados),
        });
        if (!res.ok) throw new Error('Erro ao montar café');
        return res.json();
    },

    async confirmarPedido(dados) {
        const res = await fetch(`${API_URL}/cafes/confirmar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados),
        });
        if (!res.ok) throw new Error('Erro ao confirmar pedido');
        return res.json();
    },

    // Pedidos - NOVOS MÉTODOS
    async getPedidos() {
        const res = await fetch(`${API_URL}/pedidos`);
        if (!res.ok) throw new Error('Erro ao buscar pedidos');
        return res.json();
    },

    async getPedidoById(id) {
        const res = await fetch(`${API_URL}/pedidos/${id}`);
        if (!res.ok) throw new Error('Erro ao buscar pedido');
        return res.json();
    },

    async getPedidosPorPeriodo(inicio, fim) {
        const res = await fetch(`${API_URL}/pedidos/periodo?inicio=${inicio}&fim=${fim}`);
        if (!res.ok) throw new Error('Erro ao buscar pedidos por período');
        return res.json();
    },

    async atualizarStatusPedido(id, status) {
        const res = await fetch(`${API_URL}/pedidos/${id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });
        if (!res.ok) throw new Error('Erro ao atualizar status do pedido');
        return res.json();
    },

    async getEstatisticasPedidos() {
        const res = await fetch(`${API_URL}/pedidos/estatisticas`);
        if (!res.ok) throw new Error('Erro ao buscar estatísticas');
        return res.json();
    }
};