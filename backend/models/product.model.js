const db = require('../config/db');

const Product = {};

Product.getAll = async () => {
    try {
        const [pizzas] = await db.query( //Listado de Pizzas
            `
            SELECT 
                idPizza AS id, 
                nombrePizza AS nombre,
                precio,
                imagen,
                descripcion,
                'Pizzas' AS categoria
            FROM TPizza
            WHERE estadoA = 1
            `
        );

        const [otros] = await db.query( //Listado de Productos
            `
            SELECT 
                idProducto AS id,
                nombreProducto AS nombre,
                precio,
                descripcion,
                tipoProducto AS categoria
            FROM TProductos
            WHERE estadoA = 1
            `
        );

        return [...pizzas, ...otros];
    } catch (error) {
        throw error;
    }
};

Product.create = async (data) => {
    try {
        if (data.categoria === 'Pizzas') {
            const [result] = await db.query(
                `INSERT INTO TPizza (nombrePizza, precio, descripcion, imagen, estadoA) VALUES (?, ?, ?, ?, 1)`,
                [data.nombre, data.precio, data.descripcion, data.imagen]
            );
            return result.insertId;
        } else {
            const [result] = await db.query(
                `INSERT INTO TProductos (nombreProducto, precio, descripcion, tipoProducto, estadoA) VALUES (?, ?, ?, ?, 1)`,
                [data.nombre, data.precio, data.descripcion, data.categoria]
            );
            return result.insertId;
        }
    } catch (error) {
        throw error;
    }
};

Product.update = async (id, data) => {
    try {
        if (data.categoria === 'Pizzas') {
            await db.query(
                `UPDATE TPizza SET nombrePizza = ?, precio = ?, descripcion = ?, imagen = ? WHERE idPizza = ?`,
                [data.nombre, data.precio, data.descripcion, data.imagen, id]
            );
        } else {
            await db.query(
                `UPDATE TProductos SET nombreProducto = ?, precio = ?, descripcion = ?, tipoProducto = ? WHERE idProducto = ?`,
                [data.nombre, data.precio, data.descripcion, data.categoria, id]
            );
        }
    } catch (error) {
        throw error;
    }
};

Product.delete = async (id, categoria) => {
    try {
        if (categoria === 'Pizzas') {
            await db.query(`UPDATE TPizza SET estadoA = 0 WHERE idPizza = ?`, [id]);
        } else {
            await db.query(`UPDATE TProductos SET estadoA = 0 WHERE idProducto = ?`, [id]);
        }
    } catch (error) {
        throw error;
    }
};

module.exports = Product;