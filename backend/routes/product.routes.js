const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const { authMiddleware } = require('../middleware/auth');

// Public
router.get('/', ProductController.getAllProducts);

// Admin Only (Protected)
router.post('/', authMiddleware, ProductController.createProduct);
router.put('/:id', authMiddleware, ProductController.updateProduct);
router.delete('/:id', authMiddleware, ProductController.deleteProduct);

module.exports = router;
