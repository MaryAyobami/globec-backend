const passport = require('passport')

const dotenv = require('dotenv')
dotenv.config()

const Auth = () =>{
    passport.authenticate("google", {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: process.env.CLIENT_URL
    })
}

module.exports = Auth