class Simbolo {
    
    constructor(_identificador,_tipo_dato, _token,_lexema,_valor , _fila, _columna) {
        this.identificador = _identificador; //NOMBRE DEL ARREGLO ,VARIBALE , METODO
        this.tipo_dato = _tipo_dato; // INTEGER, DOUBLE, DECIMAL, STRING, OBJETO, FUNCION ...
        this.token = _token; //ARREGLO, LISTA, VARIABLE ... 
        this.lexema = _lexema 
        this.valor = _valor; // VALOR QUE RECIBE 
        this.fila = _fila; 
        this.columna = _columna
    }

}

module.exports = Simbolo;