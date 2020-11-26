import Swal from 'sweetalert2';

export const actualizarAvance = ()=>{
    //Seleccionar Tareas (todas)
    const facturas = document.querySelectorAll('li.factura.list-group-item');

    if(facturas.length){
        //Seleccionar facturas completadas
        const facturasPagadas = document.querySelectorAll('i.pagado');
        //calcular el avance
        const avance = Math.round((facturasPagadas.length/facturas.length)*100);
        //rellenar barra
        const porcentaje = document.querySelector('#porcentaje');

        porcentaje.style.width = avance + '%';

        if(avance == 100){
            Swal.fire(
                'Pagos al día', 
                'El cliente no tiene pagos pendientes',
                'success'
            )
        }

    }
}