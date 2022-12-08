import Axios from 'axios'
// import router from '../router'
import serviciosUsuario from "../services/usuarioService"

let baseUrl = process.env.VUE_APP_SERVICE_URL1


Axios.interceptors.response.use(response => {
    return response
  }, error => {
    if (!error.response) {
      console.log("No hay conexión con el servidor");
      return
    } if (error.response.status === 404) {
      // router.push('/404')
      // toastr.warning(error.response.data.error, "Advertencia");
      console.log('Error 404 en el consumo');
      return;
    } else {
        console.log("Error en el consumo");
    }
    return error
  });
  

  export default {
    serviciosUsuario : new serviciosUsuario(Axios, baseUrl)
  }