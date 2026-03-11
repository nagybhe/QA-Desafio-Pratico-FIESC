const express = require('express');
const router = express.Router();
const IngredienteController = require('../controllers/IngredienteController');

router.get('/', IngredienteController.listarTodos);
router.get('/base', IngredienteController.getBase);
router.get('/adicionais', IngredienteController.getAdicionais);
router.get('/:id', IngredienteController.buscarPorId);

module.exports = router;