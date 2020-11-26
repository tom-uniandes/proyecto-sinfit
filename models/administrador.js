const sequelize = require('sequelize');
const db = require('../config/bd');
const bcrypt =require('bcrypt-nodejs');
const persona=require('../models/persona');


const administrador = db.define('administrador', {
    administradorId:{
        type:sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    administradorNombre:{

        type:sequelize.STRING(40),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'Llene el campo de nombre'
            }
        }
    },
    administradorApellido:{

        type:sequelize.STRING(40),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'Llene el campo de apellido'
            }
        }
    },
    administradorEmail:{
        type:sequelize.STRING(40),
        allowNull:false,
        validate:{
            isEmail:{
                msg:"Agregue un Email válido" 
            },
            notEmpty:{
                msg:'Llene el campo de email'
            }
        },
        unique:{
            args: true,
            msg:'Administrador ya registrado'
        }
    },
    administradorContrasena:{
        type:sequelize.STRING(255),
        allowNull:false,
        validate:{
            notEmpty:{
             msg:'Llene el campo de contraseña'
            }
        }
    },
    activo:{
        type:sequelize.INTEGER,
        defaultValue: 0
    },
    token: sequelize.STRING,
    expiracion: sequelize.DATE

},
    {
        hooks:{
            beforeCreate(administrador){
             
                administrador.administradorContrasena = bcrypt.hashSync(administrador.administradorContrasena, bcrypt.genSaltSync(10));
            }
        }
    }
);

administrador.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password, this.administradorContrasena);
}

administrador.hasMany(persona);

module.exports = administrador;