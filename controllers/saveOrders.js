const Order = require('../modules/orders')
const User = require('../modules/users')

const saveOrders = async(req,res,next)=>{
    //console.log(req.session.passport.user)
    console.log(req.user)
    // console.log(req.body)
    const order = await Order.create({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        user : req.user.id

    })

    console.log(order)
}

module.exports = saveOrders