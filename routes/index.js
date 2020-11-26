const express = require('express');
const { response } = require('express');
const router = express.Router();
const { body } = require('express-validator')

const controladorGeneral = require('../controllers/GeneralController');
const controladorUsuario = require('../controllers/UsuarioController');
const controladorFactura = require('../controllers/FacturaController');
const controladorAutenticacion = require('../controllers/authController');
const controladorAdministrador = require('../controllers/AdministradorController');


// Exporta al index principal las rutas para la página
module.exports = function () {
    router.get('/', controladorGeneral.paginaPrincipal);
    
    router.get('/registro-cliente', controladorAutenticacion.usuarioAutenticado, controladorUsuario.formularioRegistro);
    router.post('/registro-cliente',
    body('txtNombreRegistro').not().isEmpty().trim().escape(),
    body('txtApellidoRegistro').not().isEmpty().trim().escape(),
    body('txtNumeroDocumentoRegistro').not().isEmpty().trim().escape(),
    body('dateFechaNacimientoRegistro').not().isEmpty(),
    body('txtDireccionRegistro').not().isEmpty().trim(),
    body('txtNumeroTelefonoRegistro').not().isEmpty().trim().escape(),
    body('txtCorreoRegistro').not().isEmpty().trim(),
    body('txtRepetirCorreoRegistro').not().isEmpty().trim(),
    body('txtRepetirContrasenaRegistro').not().isEmpty(),
    body('txtContrasenaRegistro').not().isEmpty(), controladorAutenticacion.usuarioAutenticado,
    controladorUsuario.registrarUsuario);
    
    router.get('/compra', controladorGeneral.compraProductos);
    router.get('/productos', controladorGeneral.productosDisponibles);
    router.get('/blog', controladorGeneral.blog);
    router.get('/soporte',controladorGeneral.soporte);
    router.get('/usuario',controladorUsuario.cuentaUsuario);
    router.get('/navbar', controladorAutenticacion.usuarioAutenticado, controladorGeneral.navbar);
    router.get('/footer', controladorAutenticacion.usuarioAutenticado, controladorGeneral.footer);
    router.get('/footerDos', controladorAutenticacion.usuarioAutenticado, controladorGeneral.footerDos);

    //ruta para la pagina principal del administrador
    router.get('/administrador', controladorAutenticacion.usuarioAutenticado, controladorAdministrador.administrador);

    //ruta para listar
    router.get('/administrador/:url', controladorAutenticacion.usuarioAutenticado, controladorAdministrador.usuarioUrl);

    router.post('/administrador/:url', controladorAutenticacion.usuarioAutenticado, controladorAdministrador.editarUsuario);

    //ruta para eliminar
    router.delete('/administrador/:url', controladorAutenticacion.usuarioAutenticado, controladorAdministrador.eliminarUsuario);

    router.get('/administrador/facturas/:url', controladorAutenticacion.usuarioAutenticado, controladorFactura.formularioFactura);
    router.post('/administrador/facturas/:url', controladorAutenticacion.usuarioAutenticado, controladorFactura.registroFactura);

    router.get('/administrador/ver-facturas/:url', controladorAutenticacion.usuarioAutenticado, controladorFactura.listadoFactura);

    router.patch('/administrador/ver-facturas/:id', controladorAutenticacion.usuarioAutenticado, controladorFactura.cambiarEstadoFactura);

    router.delete('/administrador/ver-facturas/:id', controladorAutenticacion.usuarioAutenticado, controladorFactura.eliminarFactura);


    //registro administrador
    router.get('/registro-administrador', controladorAdministrador.formularioRegistro);
    router.post('/registro-administrador', controladorAdministrador.registrarAdministrador);
    router.get('/confirmar/:correo', controladorAdministrador.confirmarCuenta);

    //Inicio de sesion
    router.get('/ingreso', controladorUsuario.iniciarSesion);
    router.post('/ingreso', controladorAutenticacion.autenticarUsuario);
    
    router.get('/restablecer', controladorUsuario.formRestablecerPassword);
    router.post('/restablecer', controladorAutenticacion.enviarToken);

    router.get('/restablecer/:token', controladorAutenticacion.restablecerPassword);
    router.post('/restablecer/:token', controladorAutenticacion.actualizarPassword);
    
    router.get('/salir', controladorAutenticacion.cerrarSesion);

    return router;
}