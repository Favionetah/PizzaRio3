const User = require('../models/user.model');
const Employee = require('../models/employee.model');
const db = require('../config/db');
const bcrypt = require('bcryptjs');

const CashierController = {};

// Listar todos los cajeros
CashierController.listCashiers = async (req, res) => {
    try {
        const cashiers = await User.getByRole('Cajero');
        res.status(200).json(cashiers);
    } catch (error) {
        console.error('Error listCashiers:', error);
        res.status(500).json({ message: 'Error al obtener lista de cajeros' });
    }
};

// Crear nuevo cajero (Admin only)
CashierController.createCashier = async (req, res) => {
    try {
        const {
            idUsuario, password, email,
            CIEmpleado, idSucursal, nombre1, nombre2, apellido1, apellido2, telefono, direccion, fechaNacimiento, salario
        } = req.body;

        if (!idUsuario || !password) return res.status(400).json({ message: 'idUsuario y password son requeridos' });

        // Start transaction
        const conn = await db.getConnection();
        try {
            await conn.beginTransaction();

            // Obtener idRol para 'Cajero'
            const [r] = await conn.query("SELECT idRol FROM troles WHERE nombreRol = 'Cajero' LIMIT 1");
            const idRol = r && r[0] && r[0].idRol ? r[0].idRol : 2;

            const hashed = bcrypt.hashSync(password, 10);

            // Insert into tusuarios
            await conn.query(
                `INSERT INTO tusuarios (idUsuario, idRol, password, email, usuarioA) VALUES (?, ?, ?, ?, ?)`,
                [idUsuario, idRol, hashed, email || null, req.user.id]
            );

            // Insert into templeados (if provided)
            if (CIEmpleado || nombre1 || apellido1) {
                await conn.query(
                    `INSERT INTO templeados (CIEmpleado, idUsuario, idSucursal, nombre1, nombre2, apellido1, apellido2, telefono, direccion, fechaNacimiento, salario, usuarioA)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [CIEmpleado || null, idUsuario, idSucursal || 'SC-01', nombre1 || null, nombre2 || null, apellido1 || null, apellido2 || null, telefono || null, direccion || null, fechaNacimiento || null, salario || null, req.user.id]
                );
            }

            await conn.commit();
            res.status(201).json({ message: 'Cajero creado satisfactoriamente' });
        } catch (txErr) {
            await conn.rollback();
            console.error('Transaction error createCashier:', txErr);
            res.status(500).json({ message: 'Error al crear cajero' });
        } finally {
            conn.release();
        }
    } catch (error) {
        console.error('Error createCashier:', error);
        res.status(500).json({ message: 'Error al crear cajero' });
    }
};

// Actualizar cajero (email/password/estado)
CashierController.updateCashier = async (req, res) => {
    try {
        const { id } = req.params; // idUsuario
        const {
            password, email, estadoA,
            CIEmpleado, idSucursal, nombre1, nombre2, apellido1, apellido2, telefono, direccion, fechaNacimiento, salario
        } = req.body;

        const conn = await db.getConnection();
        try {
            await conn.beginTransaction();

            // Update tusuarios
            let hashed = null;
            if (password) hashed = bcrypt.hashSync(password, 10);
            await conn.query(`UPDATE tusuarios SET password = COALESCE(?, password), email = COALESCE(?, email), estadoA = COALESCE(?, estadoA) WHERE idUsuario = ?`, [hashed, email || null, typeof estadoA !== 'undefined' ? estadoA : null, id]);

            // Update templeados (by idUsuario)
            const empFields = {};
            if (CIEmpleado) empFields.CIEmpleado = CIEmpleado;
            if (idSucursal) empFields.idSucursal = idSucursal;
            if (typeof nombre1 !== 'undefined') empFields.nombre1 = nombre1;
            if (typeof nombre2 !== 'undefined') empFields.nombre2 = nombre2;
            if (typeof apellido1 !== 'undefined') empFields.apellido1 = apellido1;
            if (typeof apellido2 !== 'undefined') empFields.apellido2 = apellido2;
            if (typeof telefono !== 'undefined') empFields.telefono = telefono;
            if (typeof direccion !== 'undefined') empFields.direccion = direccion;
            if (typeof fechaNacimiento !== 'undefined') empFields.fechaNacimiento = fechaNacimiento;
            if (typeof salario !== 'undefined') empFields.salario = salario;
            if (Object.keys(empFields).length > 0) {
                // build dynamic update
                const setParts = [];
                const params = [];
                for (const k of Object.keys(empFields)) { setParts.push(`${k} = ?`); params.push(empFields[k]); }
                params.push(id);
                await conn.query(`UPDATE templeados SET ${setParts.join(', ')} WHERE idUsuario = ?`, params);
            }

            await conn.commit();
            res.status(200).json({ message: `Cajero ${id} actualizado` });
        } catch (txErr) {
            await conn.rollback();
            console.error('Transaction error updateCashier:', txErr);
            res.status(500).json({ message: 'Error al actualizar cajero' });
        } finally {
            conn.release();
        }
    } catch (error) {
        console.error('Error updateCashier:', error);
        res.status(500).json({ message: 'Error al actualizar cajero' });
    }
};

// Desactivar cajero (delete lógico)
CashierController.deactivateCashier = async (req, res) => {
    try {
        const { id } = req.params; // idUsuario
        const conn = await db.getConnection();
        try {
            await conn.beginTransaction();
            await conn.query(`UPDATE tusuarios SET estadoA = 0 WHERE idUsuario = ?`, [id]);
            await conn.query(`UPDATE templeados SET estadoA = 0 WHERE idUsuario = ?`, [id]);
            await conn.commit();
            res.status(200).json({ message: `Cajero ${id} desactivado` });
        } catch (txErr) {
            await conn.rollback();
            console.error('Transaction error deactivateCashier:', txErr);
            res.status(500).json({ message: 'Error al desactivar cajero' });
        } finally {
            conn.release();
        }
    } catch (error) {
        console.error('Error deactivateCashier:', error);
        res.status(500).json({ message: 'Error al desactivar cajero' });
    }
};

// Obtener cajero por id
CashierController.getCashier = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.getById(id);
        if (!user) return res.status(404).json({ message: 'Cajero no encontrado' });
        // Also fetch employee details if any
        const employee = await Employee.getByUserId(id);
        res.status(200).json(Object.assign({}, user, { employee }));
    } catch (error) {
        console.error('Error getCashier:', error);
        res.status(500).json({ message: 'Error al obtener cajero' });
    }
};

module.exports = CashierController;
