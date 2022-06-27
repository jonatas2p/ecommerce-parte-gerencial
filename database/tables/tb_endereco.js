const sequelize = require('sequelize');
const conection = require('../conection');


const tb_endereco = conection.define('endereco',{
    
    id_user:{
        type: sequelize.INTEGER,
        allowNull: false
    },
    user: {
        type: sequelize.STRING(12),
        allowNull: false
    },
    endereco:{
        type: sequelize.TEXT,
        allowNull: false
    },
    numero:{
        type: sequelize.INTEGER,
        allowNull: false
    },
    estado: {
        type: sequelize.STRING(2),
        allowNull: false
    },
    pontoreferencia:{
        type: sequelize.TEXT,
        allowNull: false
    }
    
});

tb_endereco.sync({force:false});
module.exports = tb_endereco;