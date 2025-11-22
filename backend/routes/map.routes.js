const express = require('express');
const router = express.Router();
const MapController = require('../controllers/map.controller');

router.get('/sucursales', MapController.getSucursales);
router.get('/sucursales/:id', MapController.getSucursalById);

module.exports = router;
