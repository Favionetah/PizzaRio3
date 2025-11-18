const express = require('express');
const router = express.Router();

const { authMiddleware, checkRole } = require('../middleware/auth.js');

router.get(
    '/test-protegido',
    [ authMiddleware, checkRole(['Administrador', 'Cajero']) ],

    (req, res) => {
        res.status(200).json({
            message: 'Entro al sistema como Admin o Cajero',
            usuario: req.user
        });
    }
);

router.get(
    '/solo-admin',
    [ authMiddleware, checkRole(['Administrador']) ],
    (req, res) => {
        res.json({ message: 'Bienvenido ADMIN' });
    }
);

module.exports = router;