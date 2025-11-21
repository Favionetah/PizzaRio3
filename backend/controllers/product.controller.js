const Product = require('../models/product.model');

const ProductController = {};

ProductController.getAllProducts = async (req,res) => {
    try {
        const menu = await Product.getAll(); //Guarda en Menu todo lo que reciba de "product.model"
        res.status(200).json(menu);
    } catch (error) {
        console.error('Error al mostrar productos: ', error);
        res.status(500).json({message: 'Error al obtener el menu'});
    }
};

module.exports = ProductController;