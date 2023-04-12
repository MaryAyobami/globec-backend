const fs = require("fs");
const Product = require('../modules/products')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const search= async(req,res) =>{
    try {
       
        const products = await Product.findAll({where: { name: {[Op.like]: `%${req.body.product}%`}}});
  
        if (products.length < 1) throw new Error('No product found');
        res.status(200).send(products)
    }
    catch(error){
        console.log(error)
    }
}

module.exports = search