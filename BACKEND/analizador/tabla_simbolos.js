

class SymbolTable{
    
    constructor(_tsuper) {
        this.symbols = [];
        this.tsuper = _tsuper;
        this.reportes = null;
    }

    /**
     * 
     * @param {Symbol} symb 
     * @returns bool
     * 
     * Esta funcion busca en cada tabla de simbolos que pertenezcan 
     * a la lista de tablas de simbolos
     */
    addSymbol(symb) {
        if (!this.exists(symb.id)) {
            this.symbols.push(symb);
            return true;
        }
        return false;
    }

    /**
     * 
     * @param {Symbol} symb 
     * @returns bool
     * Esta funcion inserta un simbolo sin hacer verificacion previa de la existencia
     * de ese mismo simbolo en la tabla de simbolo
     */
    addSymbolDirect(symb) {
        this.symbols.push(symb);
        return true;
    }
    /**
     * 
     * @param {string} name 
     * @returns symbol
     * Esta funcion es recusiva y recorre la lista de simbolos si no encuentra el simbolo
     * ejecuta la busqueda pero para la tabla de simbolos del ambito superior
     */
    getSymbol(name) {
        for (let i=0; i<this.symbols.length; i++) {
            if (name === this.symbols[i].id) {
                return this.symbols[i];
            }
        }
        if (this.tsuper != null) {
            return this.tsuper.getSymbol(name);
        }
        return null;
    }

    /**
     * 
     * @param {*} val 
     * @returns bool
     * 
     * Funcion recursiva que busca en todas las tablas de simbolos disponibles
     */
    exists(val) {
        for (let i=0; i<this.symbols.length; i++) {
            if (this.symbols[i].id === val) {
                return true;
            }
        }
        if (this.tsuper != null) {
            return this.tsuper.exists(val);
        }
        return false;
    }

    /**
     * 
     * @param {*} val 
     * @returns bool
     * 
     * Unicamente se hace la busqueda en la tabla de simbolo actual
     * sin tener que saltar a una tabla de simbolo superior
     */
    existsDirect(val) {

        console.log("simbolos", this.symbols.length,"val",val);
        for (let i=0; i<this.symbols.length; i++) {
            if (this.symbols[i].id === val) {
                return true;
            }
        }
        return false;
    }

    /**
     * 
     * @param {List<Simbol>} t 
     * Concatenacion de tablas de simbolos
     */
    unionTables(t) {
        for (let s in t.symbols) {
            this.addSymbol(s);
        }
    }
   

}

module.exports = SymbolTable;