const { Router, json } = require('express');
const router = Router();
const parser = require('../../analizador/gramatica') 
router.post("/Analizador", async (req, res) => {
    console.log("prueba");

    console.log(req.body);

    let resultado = parser.parse(req.body.text);
    console.log();

    if(!resultado){
        console.log("Error en el analisis");
    }else{
        console.log("Analisis exitoso");
    }
    res.send(req.body)
    // console.log(id_user.id_usuario_logueado)
  })
  

module.exports = router;