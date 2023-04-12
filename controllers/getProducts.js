const fs = require("fs");
const Product = require('../modules/products')

const getProducts = async(req,res) =>{
    try {
        const products = await Product.findAll()

        res.status(200).send(products)
    }
    catch(error){
        console.log(error)
    }
}

module.exports = getProducts