const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('electronics', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });

sequelize.authenticate().then(() => {
console.log('Connection has been established successfully.');
}).catch((error) => {
console.error('Unable to connect to the database: ', error);
});

const Order = sequelize.define('Order',{
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        // category:{
        //     type: DataTypes.STRING,
        //     allowNull: false
        // }
        price:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
        ,
        image:{
            type:  DataTypes.STRING,
            allowNull: false
        }
        ,
        user:{
            type: DataTypes.STRING,
            allowNull: false
        }
}


)

sequelize.sync().then(() => {
    console.log('order table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports = Order