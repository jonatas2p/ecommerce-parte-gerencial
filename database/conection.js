const sequelize = require('sequelize');


const conection = new sequelize('ecommerce','root','9807531_jo',{
    host : 'localhost',
    dialect: 'mysql'
});

module.exports = conection;