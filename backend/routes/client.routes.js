const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const OrderController = require('../controllers/order.controller'); // <-- Importar nuevo
const { authMiddleware } = require('../middleware/auth'); // <-- Importar seguridad

// GET Productos (Manejado en product.routes.js)

// POST Pedidos (Privado - Requiere Login)
router.post('/orders', authMiddleware, OrderController.createOrder);

router.get('/orders/my-history', authMiddleware, OrderController.getMyHistory);

module.exports = router;