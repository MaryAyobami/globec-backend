const { OAuth2Client } = require('google-auth-library')
const dotenv = require('dotenv')
dotenv.config()
const client = new OAuth2Client(process.env.CLIENT_ID)
const Users = require('../modules/users')


const Login = async (req, res) => {
    const { token , address , phonenumber}  = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const { name, email} = ticket.getPayload();    

    const user = await Users.upsert({ 
        name: name,
        email: email,
        address: address,
        phonenumber: phonenumber
    })
    
    console.log(email)
    res.status(201)
   
}

module.exports = Login