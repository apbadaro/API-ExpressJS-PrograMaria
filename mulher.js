const express = require("express");
const router = express.Router();

const app = express();
const porta = 3333;

function mostraMulher(req, res) {
  res.json({
    nome: "Ada Lovelace",
    imagem:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/800px-Ada_Lovelace_portrait.jpg",
    minibio:
      "Foi uma matemática e escritora inglesa, considerada a primeira programadora da história."
  });
}

function mostraPorta() {
  console.log(`Servidor criado e rodando na porta: ${porta}`);
}

app.use(router.get("/mulher", mostraMulher));
app.listen(porta, mostraPorta);
