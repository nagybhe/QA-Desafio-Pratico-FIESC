const express = require('express');
const router = express.Router();

const IngredienteController = require('../controllers/IngredienteController');

router.get('/base', IngredienteController.getBase);
router.get('/adicionais', IngredienteController.getAdicionais);

module.exports = router;
