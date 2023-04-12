const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const mysqlConnection = require('./dbconfig')
const router = require('./routes/products')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const cookieSession = require('cookie-session')
const session = require('express-session')
const passportSetup = require('./passport')
// require("./passport")(passport);

dotenv.config()
const app = express()
const PORT = process.env.PORT

mysqlConnection()

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors({ credentials:true, origin:'http://localhost:3000', methods: ["GET", "POST", "PUT","DELETE"] }));
app.use(cookieParser());
// app.use(cookieSession({
//     name:'session',
//     keys: ['bams'],
//     maxAge: 24*60*60*100
// }))

app.use(session({
    secret: 'somethingsecretgoeshere',
    resave: false,
    saveUninitialized: true
    // cookie: { secure: true }
 }));

app.use(passport.initialize())
app.use(passport.session())
app.use('/',router)
app.listen(PORT,()=>{console.log(`server is listening at ${PORT}`)})