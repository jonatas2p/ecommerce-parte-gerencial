const sequelize = require('sequelize');
const conection = require('../conection');


const tb_user = conection.define('user',{
    
    name:{
        type:sequelize.STRING(60),
        allowNull: false
    },
    user:{
        type:sequelize.STRING(25),
        allowNull: false
    },
    password:{
        type: sequelize.STRING,
        allowNull: false
    },
    email:{
        type: sequelize.STRING(70),
        allowNull: false
    }
});

tb_user.sync({force:false});
module.exports = tb_user;