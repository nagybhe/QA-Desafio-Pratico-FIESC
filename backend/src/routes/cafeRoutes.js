const express = require('express');
const router = express.Router();

const CafeController = require('../controllers/CafeController');
console.log('CafeController:', CafeController); // para debug

router.post('/identificar', CafeController.identificarSabor);

module.exports = router;
