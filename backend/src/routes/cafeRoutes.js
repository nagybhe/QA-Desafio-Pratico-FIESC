const express = require('express');
const router = express.Router();
const CafeController = require('../controllers/CafeController');

router.post('/identificar', CafeController.identificarSabor);
router.post('/montar', CafeController.montarCafe);
router.post('/confirmar', CafeController.confirmarPedido);
router.get('/sabores', CafeController.listarSaboresClassicos);

module.exports = router;