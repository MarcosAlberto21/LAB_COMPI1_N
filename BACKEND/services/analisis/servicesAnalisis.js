const { Router, json } = require('express');
const router = Router();
const parser = require('../../analizador/gramatica') 
router.post("/Analizador", async (req, res) => {
    console.log("prueba");

    console.log(req.body);

    let resultado = parser.parse(req.body.text);
    console.log("El resultado es:" , resultado);


    res.send({errores_sintacticos:resultado.getErrores_sintacticos(), tabla_simbolos: resultado.getSimbolos()});
    // console.log(id_user.id_usuario_logueado)
  })
  


module.exports = router;