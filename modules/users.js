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

const Users = sequelize.define('User',{
        googleId:{
            type: DataTypes.STRING,
            allowNull: false,
            
        },

        name:{
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        address:{
            type: DataTypes.STRING,
            allowNull: true,
        }
        ,
        contact:{
            type: DataTypes.STRING,
            allowNull: true,
        }
}


)

sequelize.sync().then(() => {
    console.log('users table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports = Users