const Product = require('../models/product.model');

const ProductController = {};

ProductController.getAllProducts = async (req, res) => {
    try {
        const menu = await Product.getAll(); //Guarda en Menu todo lo que reciba de "product.model"
        res.status(200).json(menu);
    } catch (error) {
        console.error('Error al mostrar productos: ', error);
        res.status(500).json({ message: 'Error al obtener el menu' });
    }
};

ProductController.createProduct = async (req, res) => {
    try {
        await Product.create(req.body);
        res.status(201).json({ message: 'Producto creado correctamente' });
    } catch (error) {
        console.error('Error al crear producto: ', error);
        res.status(500).json({ message: 'Error al crear producto' });
    }
};

ProductController.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.update(id, req.body);
        res.status(200).json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar producto: ', error);
        res.status(500).json({ message: 'Error al actualizar producto' });
    }
};

ProductController.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoria } = req.query; // Pasamos la categoría como query param para saber qué tabla tocar
        await Product.delete(id, categoria);
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar producto: ', error);
        res.status(500).json({ message: 'Error al eliminar producto' });
    }
};

module.exports = ProductController;