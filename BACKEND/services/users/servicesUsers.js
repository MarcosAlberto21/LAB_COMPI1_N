const { Router, json } = require('express');
const router = Router();

router.get("/getUsers", async (req, res) => {
    console.log("prueba");
    res.send({data:"esto es un get"})
    // console.log(id_user.id_usuario_logueado)
  })


  

module.exports = router;