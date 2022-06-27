const sequelize = require('sequelize');
const conection = require('../conection');


const tb_produtos = conection.define('produtos',{
    
    name:{
        type:sequelize.STRING,
        allowNull: false
    },
    categoria: {
        type: sequelize.STRING,
        allowNull: false
    },
    valor:{
        type: sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: sequelize.TEXT,
        allowNull: false
    },
    frete:{
        type: sequelize.STRING(7),
        allowNull: false
    },
    image:{
        type:sequelize.STRING,
        allowNull: false
    },
    estoque:{
        type: sequelize.INTEGER,
        allowNull:false
    }
    // ok
});

tb_produtos.sync({force: false});
module.exports = tb_produtos;