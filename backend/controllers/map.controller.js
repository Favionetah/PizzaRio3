const db = require('../config/db');

const MapController = {};

// Obtener todas las sucursales
MapController.getSucursales = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tsucursales');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener sucursales:', error);
        res.status(500).json({ message: 'Error al obtener sucursales' });
    }
};

// Obtener sucursal por ID
MapController.getSucursalById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM tsucursales WHERE idSucursal = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Sucursal no encontrada' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener sucursal:', error);
        res.status(500).json({ message: 'Error al obtener sucursal' });
    }
};

module.exports = MapController;
