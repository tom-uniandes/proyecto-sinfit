const passport = require('passport');
const LocalStrategy = require('passport-local');

const administrador = require('../models/administrador');

passport.use(

    new LocalStrategy(
        {
            usernameField:'txtCorreoIngreso',
            passwordField:'txtContrasenaIngreso'
        },

        async(email, password, done)=>{
            try {
                const usuario = await administrador.findOne({
                    where:{administradorEmail:email,
                        activo:1
                    }
                });

                if(!usuario.verificarPassword(password)){
                    return done(null, false, {
                        message: 'Contraseña incorrecta'
                    });
                }
                
                return done(null, usuario);

            } catch (error) {
                //console.log(error);
                return done(null, false,{
                    message: 'El usuario no existe'
                })
            }
        } 

    )
)

passport.serializeUser((usuario, callback)=>{
    callback(null, usuario);
});

passport.deserializeUser((usuario, callback)=>{
    callback(null, usuario);
});

module.exports= passport;