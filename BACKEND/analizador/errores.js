const tipo = require("./tipo");


class Errores {

    constructor(){
        this.clearAll();
    }

    clearAll() {
        /**
         * lo usamos para instanciar y a la vez para limpiar
         *  */
        this.errores_sintacticos = [];
    }

    getErrores_sintacticos(){
        return this.errores_sintacticos;
    }

    putError_sintactico(body){
        body.tipo= tipo.SINTACTICO;
        this.errores_sintacticos.push(body)
    }


}


module.exports = Errores;