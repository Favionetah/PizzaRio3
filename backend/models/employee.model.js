const db = require('../config/db');

const Employee = {};

Employee.create = async (employee) => {
    try {
        const sql = `
            INSERT INTO templeados
            (CIEmpleado, idUsuario, idSucursal, nombre1, nombre2, apellido1, apellido2, telefono, direccion, fechaNacimiento, fechaContratacion, salario, descripcion, usuarioA)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            employee.CIEmpleado || null,
            employee.idUsuario,
            employee.idSucursal || null,
            employee.nombre1 || null,
            employee.nombre2 || null,
            employee.apellido1 || null,
            employee.apellido2 || null,
            employee.telefono || null,
            employee.direccion || null,
            employee.fechaNacimiento || null,
            employee.fechaContratacion || null,
            employee.salario || null,
            employee.descripcion || null,
            employee.usuarioA || null
        ];
        const [result] = await db.query(sql, params);
        return result;
    } catch (error) {
        console.error('Error Employee.create:', error);
        throw error;
    }
};

Employee.getByUserId = async (idUsuario) => {
    try {
        const sql = `SELECT * FROM templeados WHERE idUsuario = ? LIMIT 1`;
        const [rows] = await db.query(sql, [idUsuario]);
        return rows[0];
    } catch (error) {
        console.error('Error Employee.getByUserId:', error);
        throw error;
    }
};

Employee.updateByUserId = async (idUsuario, fields) => {
    try {
        // Build dynamic SET
        const setParts = [];
        const params = [];
        const allowed = ['CIEmpleado','idSucursal','nombre1','nombre2','apellido1','apellido2','telefono','direccion','fechaNacimiento','fechaContratacion','salario','descripcion','estadoA','usuarioA'];
        for (const key of allowed) {
            if (typeof fields[key] !== 'undefined') {
                setParts.push(`${key} = ?`);
                params.push(fields[key]);
            }
        }
        if (setParts.length === 0) return { affectedRows: 0 };
        params.push(idUsuario);
        const sql = `UPDATE templeados SET ${setParts.join(', ')} WHERE idUsuario = ?`;
        const [result] = await db.query(sql, params);
        return result;
    } catch (error) {
        console.error('Error Employee.updateByUserId:', error);
        throw error;
    }
};

Employee.deactivateByUserId = async (idUsuario) => {
    try {
        const sql = `UPDATE templeados SET estadoA = 0 WHERE idUsuario = ?`;
        const [result] = await db.query(sql, [idUsuario]);
        return result;
    } catch (error) {
        console.error('Error Employee.deactivateByUserId:', error);
        throw error;
    }
};

module.exports = Employee;
