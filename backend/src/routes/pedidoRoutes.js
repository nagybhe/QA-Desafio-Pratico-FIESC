const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/PedidoController');

// Rotas de pedidos
router.get('/', PedidoController.listarTodos);
router.get('/periodo', PedidoController.listarPorPeriodo);
router.get('/estatisticas', PedidoController.estatisticas);
router.get('/:id', PedidoController.buscarPorId);
router.patch('/:id/status', PedidoController.atualizarStatus);

module.exports = router;