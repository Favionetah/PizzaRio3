const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({message: 'Acceso Denegado. No se proporcionó token.'});
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({message: 'Acceso Denegado. Formato de token Invalido.'});
    }

    try {
        const decoded = jwt.verify(token, 'PARALELEPIPEDO_FELIPE_NEDURO_SECRETO_JWT');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({message: 'Token No Valido pnpnpnpnpn'})
    }
}

function checkRole(allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(401).json({message: 'No autenticado'});
        }

        const userRole = req.user.role;
        
        if (allowedRoles.includes(userRole)) {
            next();
        } else {
            res.status(403).json({message: 'No tienes permiso de ingresar a esto'});
        }
    };
}

module.exports = {
    authMiddleware, checkRole
};