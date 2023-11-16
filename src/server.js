const express = require("express");
const app = express();
const bcryptjs = require("bcryptjs");
const jsw = require("jsonwebtoken");
const { eAdmin}=require('./middleware/auth')

app.use(express.json());

app.get('/',  eAdmin, async(req, res)=>{
    return res.json({
        erro:false,
        mensagem:" listar usarios"
    })
})

app.get("/", async (req, res) => {
  return res.json({
    erro: false,
    mensagem: "listar usarios",
    id_suario_logado:req.userId
  });
});

app.post("/cadastrar", async (req, res) => {
  const password = await bcryptjs.hash("123456", 8);

  console.log(password);
  return res.json({
    erro: false,
    mensagem: "cadastrado com sucesso",
  });
});

app.post("/login", async (req, res) => {
  console.log(req.body);

  if (req.body.email != "chilengue@gmail.com") {
    return res.status(400).json({
      erro: false,
      mensagem: "Erro: usuaario ou senha incorreto!",
    });
  }

  if (
    !(await bcryptjs.compare(
      req.body.password,
      "$2a$08$EtRg0TzSkuOYKCtUMb7HZ.mlXDrqi8I3NeUtH77TE5N1VQmMyQeMu"
    ))
  ) {
    return res.status(400).json({
      erro: true,
      mensagem: " Senha incoreta",
    });
  }
  var token = jsw.sign({ id: 1 }, "CHILENGUEJ29222739", {
    //expiresIn:"1h"
    expiresIn: "7d", // 7day
  });
  return res.json({
    erro: false,
    mensagem: "Login realisado com sucesso",
    token
  });
});

app.listen(8080, () => {
  console.log(`app listen http://localhost:8080`);
});
