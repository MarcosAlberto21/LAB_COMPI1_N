const { Router, json } = require('express');
const router = Router();
const parser = require('../../analizador/gramatica') 

let id_n = 1;
let salida_dot="";
router.post("/Analizador", async (req, res) => {
    console.log("prueba");
    salida_dot = "";
    id_n = 1;
    console.log(req.body);

    let raiz = parser.parse(req.body.text);

    recorrer_arbol(raiz);
    recorrer_arbol_para_analisis(raiz);

    // res.send({errores_sintacticos:resultado.getErrores_sintacticos(), tabla_simbolos: resultado.getSimbolos()});
    res.send({raiz:salida_dot})
    // console.log(id_user.id_usuario_logueado)
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
    console.log("Encontré una lista de expresiones");
  }else if(nodo.valor == 'EXPRESION'){
    console.log("tengo que analizar esta expresion");
    var calculo = analizar_expresion(nodo.hijos[0]);
    console.log("El resulta de la expresion es: " + calculo);
  
  }


  nodo.hijos.forEach(element => {
    // salida_dot = salida_dot + `${nodo.id} -> ${id_n} ;`
    recorrer_arbol_para_analisis(element)
  });


}

function analizar_expresion(expresion){
  console.log("lista para analizar",expresion.valor);

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



module.exports = router;