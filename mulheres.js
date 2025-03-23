const express = require("express"); // aqui estou iniciando o express
const router = express.Router(); // aqui estou iniciando o router/primeira parte da rota
const cors = require("cors"); // aqui estou iniciando o pacote cors que permite consumir essa API no fronend

const conectaBancoDeDados = require("./bancoDeDados"); // aqui estou ligando ao arquivo bandoDeDados.js
conectaBancoDeDados(); // aqui estou chamando a função que conecta o BD

const Mulher = require("./mulherModel"); // aqui estou importando o modelo de mulheres

const app = express(); // aqui estou iniciando o app
app.use(express.json()); // aqui estou configurando o app para usar JSON
app.use(cors()); // libera esse app para ser consumida por qualquer frontend
const porta = 3333; // aqui estou definindo a porta

// GET
async function mostraMulheres(req, res) {
  try {
    const mulheresVindasDoBD = await Mulher.find(); // aqui estou buscando todas as mulheres no BD
    res.json(mulheresVindasDoBD); // aqui estou retornando as mulheres encontradas
  } catch (erro) {
    console.log(erro); // aqui estou tratando o erro
  }
}

// POST
async function adicionaMulher(req, res) {
  const novaMulher = new Mulher({
    nome: req.body.nome,
    imagem: req.body.imagem,
    minibio: req.body.minibio,
    citacao: req.body.citacao
  });

  try {
    const mulherSalva = await novaMulher.save(); // aqui estou salvando a nova mulher no BD
    res.status(201).json(mulherSalva); // aqui estou retornando a mulher salva
  } catch (erro) {
    console.log(erro); // aqui estou tratando o erro
  }
}

// PATCH
async function atualizaMulher(req, res) {
  try {
    const mulherEncontrada = await Mulher.findById(req.params.id); // aqui estou buscando a mulher no BD
    if (req.body.nome) {
      mulherEncontrada.nome = req.body.nome;
    }
    if (req.body.imagem) {
      mulherEncontrada.imagem = req.body.imagem;
    }
    if (req.body.minibio) {
      mulherEncontrada.minibio = req.body.minibio;
    }
    if (req.body.citacao) {
      mulherEncontrada.citacao = req.body.citacao;
    }

    const mulherAtualizadaNoBD = await mulherEncontrada.save(); // aqui estou salvando a mulher atualizada no BD
    res.json(mulherAtualizadaNoBD); // aqui estou retornando a mulher atualizada
  } catch (erro) {
    console.log(erro); // aqui estou tratando o erro
  }
}

// DELETE
async function apagaMulher(req, res) {
  try {
    await Mulher.findByIdAndDelete(req.params.id); // aqui estou apagando a mulher no BD
    res.json({ mensagem: "Mulher apagada com sucesso!" }); // aqui estou retornando a mensagem de sucesso
  } catch {
    console.log(erro); // aqui estou tratando o erro
  }
}

// PORTA
function mostraPorta() {
  console.log(`Servidor criado e rodando na porta: ${porta}`);
}

// aqui estou iniciando o servidor
app.listen(porta, mostraPorta); // configurando a rota GET '/mulheres'
app.use(router.post("/mulheres", adicionaMulher)); // configurando a rota POST '/mulheres'
app.use(router.get("/mulheres", mostraMulheres)); // servidor ouvindo a porta
app.use(router.patch("/mulheres/:id", atualizaMulher)); // configurando a rota PATCH '/mulheres/:id'
app.use(router.delete("/mulheres/:id", apagaMulher)); // configurando a rota DELETE '/mulheres/:id'
