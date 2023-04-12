const productController = require('../controllers/productsController')
const imageUpload = require('../controllers/images')
const express = require('express')
const getProducts = require('../controllers/getProducts')
const getSingleProduct = require('../controllers/getSingleProduct')
const searchproduct = require('../controllers/search')
const UserOrders = require('../controllers/getOrders')
const saveOrders = require('../controllers/saveOrders')
const router = express.Router()
const passport = require('passport')
const Auth = require('../controllers/auth')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const Users = require('../modules/users')

router.post('/upload/product', productController)
router.get('/all/products',getProducts)
router.get('/product/:id', getSingleProduct )
router.post('/search/product',searchproduct)
router.post('/user/save/orders', passport.authenticate('jwt'), (req,res)=>{
    //console.log(req.session.passport.user)
   // console.log(req.user)
    // console.log(req.body)
    const order = Order.create({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        user : req.user.id

    })

    console.log(order)
})

router.post('user/address', async(req,res)=>{
    await Users.update(
        {address: req.body.address},
        {where: {googleId: req.user.id}}
        )
       
})

router.post('user/contact', async(req,res)=>{
       await Users.update(
        {contact: req.body.contact},
        {where: {googleId: req.user.id}}
        )
     
})


router.get('/auth/google/callback',  passport.authenticate("google",{
    //successRedirect: process.env.CLIENT_URL,
    failureRedirect: process.env.CLIENT_URL
}), async (req,res)=>{
           const user = await req.user
           const token =  jwt.sign({id: user[0].dataValues.googleId},
                "secretKey",
                { expiresIn: "24h" }
                
                )

                try{
                    res.cookie('jwt',token, {withCredentials:true , httpOnly: false })
                    res.redirect('http://localhost:3000')
                }
                catch(error){
                    console.log(error)
                }
              
            }
)






router.get('/auth/google', passport.authenticate("google" , {scope:['openid', 'email', 'profile']}))
router.get('/profile',passport.authenticate("jwt"),(req,res,next)=>{
    if(req.user){
        res.send('welcome')
    }
})
router.get("/logout",(req,res)=>{
    req.logout(),
    res.redire>ct(process.env.CLIENT_URL)
})
module.exports = router