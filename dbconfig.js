// const mysql = require('mysql')

// const mysqlConnection = ()=>{
            
//         let dbconnection = mysql.createConnection({
//             host: "localhost",
//             user: "root",
//             password: "",
//             database: "electronics"
//         });

//         dbconnection.connect((err) => {
//             //check connection errors
//             if (err) {
//                 return console.error("ERROR: " + err.message);
//             }
//             // execute queries related to the database after a successful connection
//             console.log("connection established...");
//         });

// }
const {Sequelize} = require('sequelize')
const mysqlConnection = () =>{
    const sequelize = new Sequelize('electronics', 'root', '', {
        host: 'localhost',
        dialect: 'mysql'
      });

    sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
    });
}
module.exports = mysqlConnection