const Symbol = require('./simbolo');
const Type = require('./tipo');

class Declaration {
    constructor(_identificador,_tipo_dato, _token,_lexema,_valor , _fila, _columna) {
        this.identificador = _identificador; //NOMBRE DEL ARREGLO ,VARIBALE , METODO
        this.tipo_dato = _tipo_dato; // INTEGER, DOUBLE, DECIMAL, STRING, OBJETO, FUNCION ...
        this.token = _token; //ARREGLO, LISTA, VARIABLE ... 
        this.lexema = _lexema 
        this.valor = _valor; // VALOR QUE RECIBE 
        this.fila = _fila; 
        this.columna = _columna
    }

    /**
     * La instruccion declaracion consta de la siguinete estructura
     * <Tipo de dato> <identificador> [ = <expresion> ]?;
     */

    operar(tabla_simbolos,reportes) {
        
        // let a = tabla_simbolos.existsDirect(this._identificador);        
        // if (a === false) {
            /**
             * Si la variable aun no ha sido declarado en el ambito actual entonces se procede a crear
             * el simbolo nuevo he insertarlo en la tabla_simbolosla de simbolos
             */
            tabla_simbolos.addSymbolDirect(new Symbol(this.identificador, this.tipo_dato, this.token,this.lexema, this.valor, this.fila,this.columna));
            /**
             * putSymbol sirve para almacenar los simbolos para el reporte final
             */
             reportes.putSimbolo(new Symbol(this.identificador, this.tipo_dato, this.token,this.lexema, this.valor, this.fila,this.columna));
            return true;
        // }else{
        //     console.log("el dato ya existe en la tabla de simbolos");
        // }

        // return null;
    }


}

module.exports = Declaration;