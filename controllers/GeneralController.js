const { request, response } = require("express");


exports.paginaPrincipal=(request, response)=>{
   
    response.render('index',{
        nombrePagina:'Sinfit - Helados Saludables'
    });
}

exports.navbar=(request, response)=>{
    response.render('navbar');
}

exports.footer=(request, response)=>{
    response.render('footer')
}

exports.footerDos=(request, response)=>{
    response.render('footerDos')
}

exports.compraProductos=(request, response)=>{
    response.render('compra',{
        nombrePagina:'Sinfit | Compra'
    });

}

exports.productosDisponibles=(request, response)=>{
    response.render('productos',{
        nombrePagina:'Nuestros productos'
    });

}

exports.blog=(request, response)=>{
    response.render('blog',{
        nombrePagina:'Sinfit | Blog'
    });

}

exports.soporte=(request, response)=>{
    response.render('soporte',{
        nombrePagina:'Sinfit | Soporte'
    });
}