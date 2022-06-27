const sequelize = require('sequelize');
const conection = require('../conection');


const tb_entrega = conection.define('entrega',{
    
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
    endereco: {
        type: sequelize.TEXT,
        allowNull: false
    },
    frete:{
        type: sequelize.STRING,
        allowNull: false
    }
    
});

tb_entrega.sync({force:false});
module.exports = tb_entrega;