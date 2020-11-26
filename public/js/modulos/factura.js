import axios from 'axios';
import Swal from 'sweetalert2';
import {actualizarAvance} from '../funciones/avance';

const factura = document.querySelector('.listado-facturas');

if(factura){
    factura.addEventListener('click', e=>{
        //console.log(e.target.classList);
        if(e.target.classList.contains('fa-check-circle') || e.target.classList.contains('fa-circle')){
            
            const icono=e.target;
            const idFactura=icono.parentElement.parentElement.parentElement.dataset.factura;
            const url = `${location.origin}/administrador/ver-facturas/${idFactura}`;
            axios.patch(url,{ idFactura })
            .then(function(respuesta){
               if(respuesta.status===200){
                   icono.classList.toggle('pagado');
                   icono.classList.toggle('fa-circle')
                   
                   actualizarAvance();
               }
               icono.classList.toggle('fa-check-circle')
            })
        }
        if(e.target.classList.contains('fa-trash')){

            const facturaHTML = e.target.parentElement.parentElement.parentElement,
            idFactura = facturaHTML.dataset.factura;

            Swal.fire({
                title: '¿Estás seguro de eliminar esta factura?',
                text: "Si se elimina se pierde la factura",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'Cancelar',
              }).then((result) => {
                if (result.value) {
                    const url = `${location.origin}/administrador/ver-facturas/${idFactura}`;
                    axios.delete(url,{params:{idFactura}})
                    .then(function(respuesta){
                        if(respuesta.status===200){
                            facturaHTML.parentElement.removeChild(facturaHTML);
                            console.log(facturaHTML);
                            console.log("Entro");

                            Swal.fire(
                                'factura eliminada',
                                respuesta.data,
                                'success'
                            );
                            
                            actualizarAvance();
                                
                        }
                    })
                }
            })
        }

      
    });

}
export default factura;