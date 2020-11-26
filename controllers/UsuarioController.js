const { request, response } = require("express");
const personaTabla=require('../models/persona');


exports.iniciarSesion=(request, response)=>{

    const error = response.locals.mensajes;

    //console.log(error);

    response.render('iniciarSesion',{
        nombrePagina:'Sinfit | Ingreso ',
        error
    });
}

exports.formularioRegistro=(request, response)=>{
   
    //const administradorId=response.locals.usuarios.administradorId;
    response.render('registroUsuario',{
        nombrePagina:'Sinfit | Registro'
    });
}

exports.registrarUsuario=async(request, response)=>{
    console.log(request.body);
    
    const { txtNombreRegistro }= request.body;
    const { txtApellidoRegistro }= request.body;
    const { cmbTipoDocumento }= request.body;
    const { txtNumeroDocumentoRegistro }= request.body;
    const { cmbGeneroRegistro }= request.body;
    const { txtDireccionRegistro }= request.body;
    const { txtCorreoRegistro }= request.body;
    const { txtContrasenaRegistro }= request.body;
    const { dateFechaNacimientoRegistro }= request.body;
    const { txtNumeroTelefonoRegistro }= request.body;
    const { chkTerminos }= request.body;

    const administradorId=response.locals.user.administradorId;

    try{   
        const personaInsercion = await personaTabla.create(
            { 
                personaDocumento:txtNumeroDocumentoRegistro,
                personaTipoDocumento:cmbTipoDocumento,
                personaNombre:txtNombreRegistro,
                personaApellido:txtApellidoRegistro,
                personaGenero:cmbGeneroRegistro,
                personaFechaNacimiento:dateFechaNacimientoRegistro,
                personaTelefono:txtNumeroTelefonoRegistro,
                personaDireccion:txtDireccionRegistro,
                personaEmail:txtCorreoRegistro,
                personaContrasena:txtContrasenaRegistro,
                personaCondicion: chkTerminos,
                personaEstado:'A',
                administradorAdministradorId:administradorId
            }
            
        );
            response.redirect('/administrador')

        }catch(error){
            request.flash('error', error.errors.map(error => error.message));
            
            response.render('registroUsuario',{
                mensajes: request.flash(),
                nombrePagina:'Sinfit | registro',
                txtNumeroDocumentoRegistro,
                txtNombreRegistro,
                txtApellidoRegistro,
                dateFechaNacimientoRegistro,
                txtNumeroTelefonoRegistro,
                txtDireccionRegistro,
                txtCorreoRegistro
            });
        }        
}

exports.cuentaUsuario=async(request, response)=>{

    const usuarios= await personaTabla.findAll();
    response.render('cuentaUsuario',{
        nombrePagina:'Sinfit | Mi perfil',
        usuarios
    });

}

exports.formRestablecerPassword = (request,response)=>{
    response.render('recuperarContraseña',{
        nombrePagina:'Restablecer contraseña'
    });
}
