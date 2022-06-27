const sequelize = require('sequelize');
const conection = require('../conection');


const tb_favorito = conection.define('favoritos',{
    
    user:{
        type: sequelize.STRING,
        allowNull: false
    },
    produto:{
        type: sequelize.STRING,
        allowNull: false
    },
    image:{
        type: sequelize.STRING,
        allowNull: false
    },
    valor:{
        type: sequelize.STRING,
        allowNull: false
    },
    frete:{
        type: sequelize.STRING,
        allowNull: false
    }
    
});

tb_favorito.sync({force:false});
module.exports = tb_favorito;