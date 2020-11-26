const sequelize = require('sequelize');
const db = require('../config/bd');

const metodoPago = db.define('metodoPagos',{

    metodoPagoId:{
        primaryKey:true,
        type:sequelize.INTEGER,
        allowNull:false
    },
    metodoPagoNombre:{
        type:sequelize.STRING(10),
        allowNull:false
    }
})

module.exports = metodoPago;