const { request, response } = require('express');
const passport = require('passport');
const Administrador=require('../models/administrador');
const crypto =require('crypto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const enviarEmail = require('../handlers/email');
const bcrypt = require('bcrypt-nodejs');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect:'/administrador',
    failureRedirect:'/ingreso',
    failureFlash: true,
    badRequestMessage: 'Ambos Campos Son Obligatorios'
});

exports.usuarioAutenticado = (request, response, next)=>{
    if(request.isAuthenticated()){
        return next();
    }

    return response.redirect('/ingreso');
}

exports.cerrarSesion = (request, response)=>{
    request.session.destroy(()=>{
        response.redirect('/');
    });

}

exports.enviarToken=async(request,response)=>{

    try{

        const administrador=await Administrador.findOne({where:{administradorEmail:request.body.txtCorreo}});

        if((request.body.txtCorreo)==''){
            request.flash('alert-danger', 'Debe digitar un correo');
            response.redirect('/restablecer');
        }
        else if (!administrador)
        {
            request.flash('alert-danger', 'No existe la cuenta');
            response.redirect('/restablecer');
        } else {
            //enviar token
            administrador.token=crypto.randomBytes(20).toString('hex');

            //console.log(token);

            administrador.expiracion = Date.now()+3600000;

            await administrador.save();

            const resetUrl=`http://${request.headers.host}/restablecer/${administrador.token}`;

            await enviarEmail.enviar({
                administrador,
                subject: 'Sinfit - Restablecer contraseña ',
                resetUrl,
                archivo:'restablecer-password'
            })

            request.flash('alert-success', 'se ha enviado a tu correo un mensaje');

            response.redirect('/ingreso');
        }
    }catch(error){

    }

}

exports.restablecerPassword = async(request,response)=>{
    
    try{

        const administrador =await Administrador.findOne({
            where:{token:request.params.token}
        });

        if(!administrador){
            request.flash('alert-danger', 'No es valido el token');
            response.redirect('/restablecer');
        }

        response.render('restablecerContrasena',{
            nombrePagina: 'Restablecer contraseña'
        });
    }catch(error){
        
    }
}

exports.actualizarPassword =async(request,response)=>{

    try{

        const administrador = await Administrador.findOne({
            where:{
                token:request.params.token,
                expiracion:{
                    [Op.gte]:Date.now()
                }
            }
        });

        if(!administrador){
            request.flash('alert-danger','Token no valido, excedio su límite de tiempo');
            response.redirect('/restablecer');
        
        } else if(!(request.body.password)=='') {

            administrador.administradorContrasena=bcrypt.hashSync(request.body.password, bcrypt.genSaltSync(10));

            administrador.token=null;
        
            administrador.expiracion=null;
        
            await administrador.save();
        
            request.flash('alert-success', 'Cambio existoso de contraseña');
            response.redirect('/ingreso');
        
        } else if((request.body.password)=='') {
            request.flash('alert-danger', 'Debes ingresar la nueva contraseña');
            response.redirect(`/restablecer/${request.params.token}`);
        }

    }catch(error){
        
    }
}