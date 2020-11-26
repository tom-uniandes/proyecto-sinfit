const sequelize = require('sequelize');
const db = require('../config/bd');

const helado = db.define('helados',{

    heladoId:{
        primaryKey:true,
        type:sequelize.INTEGER,
        allowNull:false,
    },

    heladoNombre:{
        type:sequelize.STRING(10),
        allowNull:false
    },

    heladoDescripcion:{
        type:sequelize.STRING(20),
        allowNull:false
    },
    heladoPrecio:{
        type:sequelize.FLOAT(6.2),
        allowNull:false
    }
})

module.exports = helado;