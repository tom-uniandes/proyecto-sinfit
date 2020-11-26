import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar= document.querySelector('#eliminar-usuario');

if(btnEliminar){
btnEliminar.addEventListener('click', e =>{
  const urlUsuario = e.target.dataset.usuarioUrl;

    Swal.fire({
      title: '¿Estas seguro de eliminar la cuenta?',
      text: "Si la eliminas, no podrás recuperarla",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        const url =`${location.origin}/administrador/${urlUsuario}`;
  
        axios.delete(url, {params: {urlUsuario}})
          .then(function(respuesta){
            console.log(respuesta)
                Swal.fire(
                  'Cuenta eliminada',
                  respuesta.data,
                  'success'
                );
                
                setTimeout(()=>{
                  window.location.href='/administrador/'
                }, 2000);
          })
          .catch(()=>{
            Swal.fire({
              type: 'error',
              title: 'Hubo un error',
              text: 'No se pudo eliminar el usuario!',
              icon: 'error'
            })
          })
          }
      })  
  })
}

export default btnEliminar;




                