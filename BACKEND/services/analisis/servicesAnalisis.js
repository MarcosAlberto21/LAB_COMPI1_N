const { Router, json } = require('express');
const router = Router();
const parser = require('../../analizador/gramatica') 
const tabla_simbolos = require("../../analizador/tabla_simbolos");
const Simbolo = require('../../analizador/simbolo.js');

let id_n = 1;
let salida_dot="";
let tabla = new tabla_simbolos(null);
router.post("/Analizador", async (req, res) => {
    salida_dot = "";
    id_n = 1;

    tabla = new tabla_simbolos(null);

    console.log(req.body);

    let raiz = parser.parse(req.body.text);

    recorrer_arbol(raiz);
    recorrer_arbol_para_analisis(raiz);

    imprimir_tabla(tabla);
   
    res.send({raiz:salida_dot})
  })


function recorrer_arbol(nodo){

  if(nodo.id == 0){
    nodo.id = id_n;
    id_n++;
  }

  salida_dot = salida_dot + `${nodo.id}[label= "${nodo.valor}" fillcolor="#d62728" shape="circle"];`

  nodo.hijos.forEach(element => {
    salida_dot = salida_dot + `${nodo.id} -> ${id_n} ;`
    recorrer_arbol(element)
  });

}

function recorrer_arbol_para_analisis(nodo){
  if(nodo.valor == 'LEXPRESION'){
    // console.log("Encontré una lista de expresiones");
  }else if(nodo.valor == 'EXPRESION'){
    // console.log("tengo que analizar esta expresion");
    var calculo = analizar_expresion(nodo.hijos[0]);
    // console.log("El resulta de la expresion es: " + calculo);
  }else if(nodo.valor == 'DECLARACION'){
    ejecutar_declaracion(nodo.hijos[0], nodo.hijos[1], nodo.hijos[2].hijos[0], 1,2);
  }

  nodo.hijos.forEach(element => {
    // salida_dot = salida_dot + `${nodo.id} -> ${id_n} ;`
    recorrer_arbol_para_analisis(element)
  });


}

function analizar_expresion(expresion){
  // console.log("lista para analizar",expresion.valor);

  var respuesta = null;

  switch (expresion.tipo) {
    case "suma":
        respuesta = parseFloat(analizar_expresion(expresion.hijos[0]) +  analizar_expresion(expresion.hijos[1]));

      break;
      case "resta":
        respuesta = parseFloat(analizar_expresion(expresion.hijos[0]) -  analizar_expresion(expresion.hijos[1]));
      
      break;
      case "division":
        respuesta = parseFloat(analizar_expresion(expresion.hijos[0]) /  analizar_expresion(expresion.hijos[1]));
      
      break;
      case "multiplicar":
        respuesta = parseFloat(analizar_expresion(expresion.hijos[0]) *  analizar_expresion(expresion.hijos[1]));

      break;

      case "decimal":
        respuesta = parseFloat(expresion.valor)
      break;

      case "id":
        //anda busca a mi tabla de simbolos
          console.log("aqui va un identificador que esta asociado a un valor");
        break;
    default:
      console.log("Error semantico en operadores");
      break;
  }

  return respuesta;
}


function ejecutar_declaracion(tipo, id, expresion, fila, columna){
  let r = tabla.addSymbol(new Simbolo(id.valor,tipo.valor, "variable","indentificador", analizar_expresion(expresion) , fila, columna));
  // console.log("respuesta del simbolo", r);

  if(!r){
    console.log("ERROR SEMANTICO LA VARIABLE " + id.valor + " YA EXISTE " + fila + " " + columna);
  }
}

function imprimir_tabla(ts){
  console.log(ts);
}

module.exports = router;