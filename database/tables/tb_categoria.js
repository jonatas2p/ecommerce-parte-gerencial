const sequelize = require('sequelize');
const conection = require('../conection');


const tb_categoria = conection.define('categoria',{
    

    nome:{
        type: sequelize.STRING,
        allowNull: false
    }
    // talvez colocar mais alguma categoria !!

    
});

tb_categoria.sync({force:false});
module.exports = tb_categoria;