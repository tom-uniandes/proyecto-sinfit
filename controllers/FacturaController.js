const { request, response } = require("express");
const personaTabla=require('../models/persona');
const facturaTabla=require('../models/factura');

exports.formularioFactura=async(request, response)=>{
    const administradorAdministradorId=response.locals.user.administradorId;
    const usuariosPromise = personaTabla.findAll({where:{administradorAdministradorId}});
    const usuarioPromise=personaTabla.findOne(
        {
            where:{
                url:request.params.url
            }
        }
    );


    const[usuarios,usuario] = await Promise.all([usuariosPromise,usuarioPromise]);

    var fecha = new Date();
    var dd = fecha.getDate();
    var mm = fecha.getMonth()+1;
    var yyyy = fecha.getFullYear();

    fecha = yyyy+'-'+mm+'-'+dd;

    response.render('factura',{
        nombrePagina:'Sinfit | Registro de facturas',
        usuarios,
        usuario,
        fecha
    });

}

exports.registroFactura=async(request,response)=>{
    
    console.log(request.body);

    const persona=await personaTabla.findOne(
        {
            where:{
                url:request.params.url
            }
        }
    );

    const{txtIvaFactura}=request.body;
    const{txtSubtotalFactura}=request.body;
    const{txtTotalFactura}=request.body;

    const personaId= persona.personaId;
    
    var fecha = new Date();
    var dd = fecha.getDate();
    var mm = fecha.getMonth()+1;
    var yyyy = fecha.getFullYear();

    fecha = yyyy+'-'+mm+'-'+dd;

    //insertar
    let errores =[];
    let insercion =[];

    if(!txtSubtotalFactura){
        errores.push({'texto':'Ingrese el subtotal'})
    }
    if(!txtIvaFactura){
        errores.push({'texto':'Ingrese el iva'})
    }
    if(!txtTotalFactura){
        errores.push({'texto':'Ingrese el total'})
    }

    if(errores.length>0){
        
        response.render('factura',{
            nombrePagina:'Sinfit | Registro Facturas',
            errores, fecha
        });
    } else {  

        const resultado = await facturaTabla.create({
            facturaFecha:fecha,
            facturaIva:txtIvaFactura,
            facturaSubtotal:txtSubtotalFactura,
            facturaTotal:txtTotalFactura,
            facturaEstado:0,
            personaPersonaId:personaId
        })
        
        .catch(e=>{console.error(e)});
            
        insercion.push({'texto':'Registro Exitoso'});
    
        response.redirect(`/administrador/facturas/${request.params.url}`);

    }
}

exports.listadoFactura=async(request, response)=>{
    const administradorAdministradorId=response.locals.user.administradorId;
    const usuariosPromise = personaTabla.findAll({where:{administradorAdministradorId}});
    const usuarioPromise=personaTabla.findOne(
        {
            where:{
                url:request.params.url
            }
        }
    );

    const[usuarios,usuario] = await Promise.all([usuariosPromise,usuarioPromise]);

    const factura= await facturaTabla.findAll({
        where:{
            personaPersonaId:usuario.personaId
        }
    });


    response.render('listadoFactura',{
        nombrePagina:'Sinfit | Registro de facturas',
        usuarios,
        usuario,
        factura
    });
}

exports.cambiarEstadoFactura =async (request,response)=>{

    const { id }=request.params;

    const factura= await facturaTabla.findOne({where:{facturaId:id}})

    let estado =0;

    if(factura.facturaEstado === estado){
        estado=1;
    }
    factura.facturaEstado=estado;

    const resultado = await factura.save();

    if(!resultado) return next();

    response.status(200).send('actualizado');
}

exports.eliminarFactura = async(request,response)=>{

    const {id}=request.params;

    const resultado = await facturaTabla.destroy({where:{facturaId:id}});

    if(!resultado) return next();
    response.status(200).send("factura eliminada");

    
}
