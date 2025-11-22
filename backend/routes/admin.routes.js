const express = require('express');
const router = express.Router();
const { authMiddleware, checkRole } = require('../middleware/auth');
const CashierController = require('../controllers/cashier.controller');

// Todas las rutas son accesibles solo por Administrador
router.get('/cashiers', [authMiddleware, checkRole(['Administrador'])], CashierController.listCashiers);
router.post('/cashiers', [authMiddleware, checkRole(['Administrador'])], CashierController.createCashier);
router.get('/cashiers/:id', [authMiddleware, checkRole(['Administrador'])], CashierController.getCashier);
router.put('/cashiers/:id', [authMiddleware, checkRole(['Administrador'])], CashierController.updateCashier);
router.delete('/cashiers/:id', [authMiddleware, checkRole(['Administrador'])], CashierController.deactivateCashier);

module.exports = router;
