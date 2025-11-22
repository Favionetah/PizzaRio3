const db = require('../config/db'); // Importamos la conexión

const User = {};

User.findByEmail = async (email) => {
    try {
        // ¡Esta es la consulta clave!
        // 1. Unimos TUsuarios (u) con TRoles (r)
        // 2. Obtenemos el idUsuario, el password (para comparar) y el nombreRol
        // 3. Buscamos por email
        // 4. (Buena práctica) Añadimos "u.estadoA = 1" para que solo usuarios activos puedan loguearse
        const query = `
            SELECT 
                u.idUsuario, 
                u.password, 
                r.nombreRol
            FROM 
                TUsuarios u
            JOIN 
                TRoles r ON u.idRol = r.idRol
            WHERE 
                u.email = ? AND u.estadoA = 1
        `;

        const [rows] = await db.query(query, [email]);

        // Devuelve el primer usuario encontrado (o 'undefined')
        return rows[0];

    } catch (error) {
        console.error("Error al buscar usuario por email:", error);
        throw error; 
    }
};

module.exports = User;

// --- Funciones de gestión (Cajeros / Admin) ---
// Obtener usuarios por nombre de rol (ej: 'Cajero')
User.getByRole = async (roleName) => {
    try {
        const sql = `
            SELECT u.idUsuario, u.email, r.nombreRol, u.estadoA, u.fechaA,
                   e.CIEmpleado, e.nombre1, e.nombre2, e.apellido1, e.apellido2, e.idSucursal, e.telefono
            FROM tusuarios u
            JOIN troles r ON u.idRol = r.idRol
            LEFT JOIN templeados e ON e.idUsuario = u.idUsuario
            WHERE r.nombreRol = ?
            ORDER BY u.idUsuario
        `;
        const [rows] = await db.query(sql, [roleName]);
        return rows;
    } catch (error) {
        console.error('Error getByRole:', error);
        throw error;
    }
};

// Crear usuario (se asume password ya hasheado)
User.createUser = async ({ idUsuario, idRol, password, email, usuarioA }) => {
    try {
        const sql = `
            INSERT INTO tusuarios (idUsuario, idRol, password, email, usuarioA)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(sql, [idUsuario, idRol, password, email, usuarioA]);
        return result;
    } catch (error) {
        console.error('Error createUser:', error);
        throw error;
    }
};

// Obtener usuario por idUsuario
User.getById = async (idUsuario) => {
    try {
        const sql = `
            SELECT u.idUsuario, u.email, u.idRol, u.estadoA, u.fechaA,
                   e.CIEmpleado, e.idSucursal, e.nombre1, e.nombre2, e.apellido1, e.apellido2, e.telefono, e.direccion, e.fechaContratacion, e.salario
            FROM tusuarios u
            LEFT JOIN templeados e ON e.idUsuario = u.idUsuario
            WHERE u.idUsuario = ?
        `;
        const [rows] = await db.query(sql, [idUsuario]);
        return rows[0];
    } catch (error) {
        console.error('Error getById:', error);
        throw error;
    }
};

// Actualizar usuario (password debe llegar ya hasheada si se quiere cambiar)
User.updateUser = async (idUsuario, { password = null, email = null, estadoA = null }) => {
    try {
        const sql = `
            UPDATE tusuarios
            SET password = COALESCE(?, password),
                email = COALESCE(?, email),
                estadoA = COALESCE(?, estadoA)
            WHERE idUsuario = ?
        `;
        const [result] = await db.query(sql, [password, email, estadoA, idUsuario]);
        return result;
    } catch (error) {
        console.error('Error updateUser:', error);
        throw error;
    }
};

// Desactivar usuario (borrado lógico)
User.deactivateUser = async (idUsuario) => {
    try {
        const sql = `UPDATE tusuarios SET estadoA = 0 WHERE idUsuario = ?`;
        const [result] = await db.query(sql, [idUsuario]);
        return result;
    } catch (error) {
        console.error('Error deactivateUser:', error);
        throw error;
    }
};