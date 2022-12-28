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



module.exports = router;