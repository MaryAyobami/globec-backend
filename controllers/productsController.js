const fs = require("fs");
const Product = require('../modules/products')

const uploadProduct = async (req, res) => {
  try {
    console.log(req.file)
      await Product.create({
          name: req.body.productname,
          description: req.body.description,
          category: req.body.category,
          price: req.body.price,
          image: req.body.image
          })
     

      return res.send(`Product has been uploaded.`);
    
      }
   catch (error) {
    console.log(error);
    return res.send(`Error when trying upload product: ${error}`);
  }
};

module.exports = uploadProduct