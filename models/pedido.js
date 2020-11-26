const sequelize = require('sequelize');
const db = require('../config/bd');

const pedido = db.define('pedidos',{

    pedidoId:{
        primaryKey:true,
        type:sequelize.INTEGER,
        allowNull:false
    },
    pedidoClienteId:{
        type:sequelize.INTEGER,
        allowNull:false
    },
    pedidoHeladoId:{
        type:sequelize.INTEGER,
        allowNull:false
    },
    pedidoMetodoPagoId:{
        type:sequelize.INTEGER,
        allowNull:false
    },
    pedioTotal:{
        type:sequelize.FLOAT(6.2),
        allowNull:false
    }
})
module.exports = pedido;