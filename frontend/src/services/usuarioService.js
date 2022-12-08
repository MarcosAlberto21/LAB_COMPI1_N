class usuarioService {//servicios para login
    axios
    baseUrl
  
    constructor(axios, baseUrl) {
      this.axios = axios;
      this.baseUrl = `${baseUrl}`;
    }

    realizarAnalisis(body){
      let ruta = `${this.baseUrl}/Analizador`
      return this.axios.post(ruta, body);
    }
}

export default usuarioService;