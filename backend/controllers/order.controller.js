const Order = require('../models/order.model');


const OrderController = {};

OrderController.createOrder = async (req, res) => {
    try {
        const { total, carrito } = req.body;

        const ciCliente = req.user.id;

        if (!carrito || carrito.length === 0) {
            return res.result(400).json({message: "El carrito está vacio"});
        }

        const idPedido = await Order.create({
            ciCliente,
            total,
            items: carrito

        });

        res.status(201).json({
            message: "Pedido Exitoso",
            idPedido: idPedido
        });

    } catch (error) {
        console.error("Error en la creacion de pedido:", error);
        res.status(500).json({ message: "Error al Procesar Pedido" });
    }
}

module.exports = OrderController;