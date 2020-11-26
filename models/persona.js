const sequelize = require('sequelize');
const db = require('../config/bd');
const slug=require('slug');
const shortid=require('shortid')
const bcrypt =require('bcrypt-nodejs');


const persona = db.define('personas', {
    personaId:{
        type:sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    personaDocumento:{
        type:sequelize.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'Llene el campo de documento'
            }
        }
    },
    personaTipoDocumento:{
        type:sequelize.SMALLINT(1),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'Seleccione un tipo de documento'
            }
        }
    },
    personaNombre:{

        type:sequelize.STRING(40),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'Llene el campo de nombre'
            }
        }
    },
    personaApellido:{

        type:sequelize.STRING(40),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'Llene el campo de apellido'
            }
        }
    },
    personaGenero:{
        type:sequelize.SMALLINT(1),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'Seleccione un género'
            }
        }
    },
    personaFechaNacimiento:{
        type:sequelize.DATEONLY,
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'Llene el campo de fecha de nacimiento'
            }
        }
    },
    personaTelefono:{
        type:sequelize.STRING(15),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'Llene el campo de telefono'
            }
        }
    },
    personaDireccion:{
        type:sequelize.STRING(40),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'Llene el campo de direccion'
            }
        }
    },
    personaEmail:{
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
            msg:'Cliente ya registrado'
        }
    },
    personaContrasena:{
        type:sequelize.STRING(255),
        allowNull:false,
        validate:{
            notEmpty:{
             msg:'Llene el campo de contraseña'
            }
        }
    },
    personaCondicion:{
        type:sequelize.STRING(2),
        allowNull:false,
        validate:{
            notNull:{
                msg:'Acepte los términos y condiciones'
            }
        }
    },
    personaEstado:{
        type:sequelize.STRING(1),
        allowNull:false
    },
    url:sequelize.STRING
   
},
    {
        hooks:{
            beforeCreate(persona){
                const url = slug(persona.personaNombre).toLowerCase();
                persona.url=`${url}-${shortid.generate()}`;
                console.log(url);

                persona.personaContrasena = bcrypt.hashSync(persona.personaContrasena, bcrypt.genSaltSync(10));
            }
        }
    }
);


module.exports = persona;