const db = require('../config/db');

const Order = {}

Order.create = async (orderData) => {
    const { ciCliente, total, items } = orderData;
    try {
        const [result] = await db.query(
            `
            INSERT INTO TPedidos
            (CICliente, idSucursal, CIEmpleado, tipoPedido, estadoPedido, totalPedido, fechaPedido)
            VALUES (?, 'SC-01', '1234567', 'Para llevar', 'Pendiente', ?, NOW())
            `
        , [ciCliente, total]);
        const idPedidoGenerado = result.insertId;
        for (const item of items) {
            let idPizza = null;
            let idProducto = null;

            if (item.categoria === 'Pizzas') {
                idPizza = item.id;
            } else {
                idProducto = item.id;
            }

            await db.query(
                `
                INSERT  INTO TDetallePedidos
                (idPedido, idPizza, idProducto, cantidad, precioUnitario, subtotal)
                VALUES (?, ?, ?, ?, ?, ?)
                ` [
                    idPedidoGenerado,
                    idPizza,
                    idProducto,
                    item.cantidad,
                    item.precio,
                    (item.precio * item.cantidad)
                ]);
        }

        return idPedidoGenerado;
    } catch (error) {
        console.error("Error al crear pedido: ", error);
        throw error;
    }
};

module.export = Order;