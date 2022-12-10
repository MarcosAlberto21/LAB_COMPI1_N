const tipo = require("./tipo");


class Reportes {

    constructor(){
        this.clearAll();
    }

    clearAll() {
        /**
         * lo usamos para instanciar y a la vez para limpiar
         *  */
        this.errores_sintacticos = [];
        this.errores_lexicos = [];
        this.reporte_simbolos = [];
    }

    getErrores_sintacticos(){
        return this.errores_sintacticos;
    }

    putError_sintactico(body){
        body.tipo= tipo.SINTACTICO;
        this.errores_sintacticos.push(body)
    }


    getSimbolos(){
        return this.reporte_simbolos;
    }

    putSimbolo(body){
        this.reporte_simbolos.push(body)
    }


}


module.exports = Reportes;