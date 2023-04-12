const fs = require("fs");
const Product = require('../modules/products')

const getSingleProduct = async(req,res) =>{
    try {
        const product = await Product.findByPk(req.params.id)

        res.status(200).send(product)
    }
    catch(error){
        console.log(error)
    }
}

module.exports = getSingleProduct