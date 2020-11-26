const { request, response } = require("express");
const personaTabla=require('../models/persona');
const administradorTabla=require('../models/administrador');
const enviarEmail = require('../handlers/email');


exports.formularioRegistro=(request, response)=>{
    response.render('crearAdmin',{
        nombrePagina:'Sinfit | Registro Administrador'
    });
}

exports.registrarAdministrador=async(request, response)=>{
    console.log(request.body);
    
    const { txtNombreRegistro }= request.body;
    const { txtApellidoRegistro }= request.body;
    const { txtCorreoRegistro }= request.body;
    const { txtContrasenaRegistro }= request.body;

    try{   
        const administradorInsercion = await administradorTabla.create(
            { 
    
                administradorNombre:txtNombreRegistro,
                administradorApellido:txtApellidoRegistro,
                administradorEmail:txtCorreoRegistro,
                administradorContrasena:txtContrasenaRegistro
            
            }       
        );
        
        const confirmarUrl =`http://${request.headers.host}/confirmar/${txtCorreoRegistro}`;
        
        const administrador = await administradorTabla.findOne({where:{administradorEmail:txtCorreoRegistro}})

        await enviarEmail.enviar({
            administrador,
            subject: 'Sinfit - Confirmar cuenta',
            confirmarUrl,
            archivo: 'confirmar-cuenta'
        });
   
        request.flash('alert-success','Enviamos un correo confirma tu cuenta');
        response.redirect('/ingreso');

    }catch(error){
        request.flash('error', error.errors.map(error => error.message));
        
        response.render('crearAdmin',{
            mensajes: request.flash(),
            nombrePagina:'Sinfit | registro administrador',
            
            txtNombreRegistro,
            txtApellidoRegistro,
            txtCorreoRegistro,
        });
    }        
}

exports.administrador=async(request, response)=>{
    const administradorAdministradorId=response.locals.user.administradorId;
    const usuarios = await personaTabla.findAll({where:{administradorAdministradorId}});
    response.render('administrador',{
        nombrePagina:'Sinfit | administrador',
        usuarios
    });
}

exports.editarUsuario=async(request,response)=>{
    console.log(request.body);

    const { txtNombreUsuario }= request.body;
    const { txtApellidoUsuario }= request.body;
    const { txtNumeroDocumentoUsuario }= request.body;
    const { dateFechaNacimientoUsuario }= request.body;
    const { txtDireccionUsuario }= request.body;
    const { txtNumeroTelefonoUsuario }= request.body;
    const { txtCorreoUsuario }= request.body;

    let errores = [];

    if(!txtNombreUsuario){
        errores.push({'texto':'Digita tu nombre'})
    }
    if(!txtApellidoUsuario){
        errores.push({'texto':'Digita tu apellido'})
    }
    if(!dateFechaNacimientoUsuario){
        errores.push({'texto':'Digita la fecha de tu nacimiento'})
    }
    if(!txtDireccionUsuario){
        errores.push({'texto':'Digita tu dirección'})
    }
    if(!txtCorreoUsuario){
        errores.push({'texto':'Digita tu correo electrónico'})
    }

    if(!/^[a-záéíóúA-ZÁÉÍÓÚñÑ ]+$/.test(txtNombreUsuario)){
        errores.push({'texto':'Solo se aceptan Letras A-Z, ni caracteres especiales'});

    }

    if(errores.length>0){
        response.render('cuentaUsuario',{
            nombrePagina: 'Sinfit | Editar Usuario',
            errores
        })
    } else {

        await personaTabla.update(
            { 
                personaNombre:txtNombreUsuario,
                personaApellido:txtApellidoUsuario,
                personaDocumento:txtNumeroDocumentoUsuario,
                personaFechaNacimiento:dateFechaNacimientoUsuario,
                personaTelefono:txtNumeroTelefonoUsuario, 
                personaEmail:txtCorreoUsuario,
                personaDireccion:txtDireccionUsuario
            },
            {
                where:{url:request.params.url}
            });
            response.redirect(`/administrador/${request.params.url}`)
    }
};

exports.eliminarUsuario=async(request,response,next)=>{

    const {urlUsuario} = request.query;

    const resultado = await personaTabla.destroy({where:{url:urlUsuario}});

    if(!resultado){
        return next();
    }

    response.status(200).send('cuenta eliminada correctamente')
}

exports.usuarioUrl= async(request, response, next)=>{

    const administradorAdministradorId=response.locals.user.administradorId;

    const usuariosPromise = personaTabla.findAll({where:{administradorAdministradorId}});

    const usuarioPromise = personaTabla.findOne(
        {
            where:{
                url:request.params.url
            }
        }
    );

    const[usuarios, usuario] = await Promise.all([usuariosPromise,usuarioPromise]);

    if(!usuario) return next();

    response.render('datosUsuario', {
        nombrePagina: 'Sinfit | Gestión de usuarios',
        usuario, //findOne url
        usuarios // findAll
    })
}


exports.confirmarCuenta =async (request, response)=>{
 
    const administrador = await administradorTabla.findOne({
       where:{
          administradorEmail:request.params.correo
       }
    });
    if(!administrador){
       request.flash('alert-danger', 'No existe la cuenta');
       response.redirect('/registro-administrador');
    }
 
    administrador.activo =1;
 
    await administrador.save();
 
    request.flash('alert-success','Cuenta Activada Correctamente');
    response.redirect('/ingreso');
 }
