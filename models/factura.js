const sequelize = require('sequelize');
const db = require('../config/bd');
const persona = require('./persona');
const factura = db.define('facturas',{

    facturaId:{
        primaryKey:true,
        type:sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
    },

    facturaFecha:{
        type:sequelize.DATEONLY,
        allowNull:false
    },

    facturaSubtotal:{
        type:sequelize.INTEGER,
        allowNull:false
    },
    facturaIva:{
        type:sequelize.FLOAT(2.2),
        allowNull:false
    },
    facturaTotal:{
        type:sequelize.FLOAT(10.2),
        allowNull:false 
    },
    facturaEstado:{
        type:sequelize.INTEGER(1)
    }
})

module.exports = factura;

factura.belongsTo(persona);