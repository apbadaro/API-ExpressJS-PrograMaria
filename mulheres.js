const express = require("express"); // aqui estou iniciando o express
const router = express.Router(); // aqui estou iniciando o router/primeira parte da rota
const cors = require("cors"); // aqui estou iniciando o pacote cors que permite consumir essa API no fronend

const conectaBancoDeDados = require("./bancoDeDados"); // aqui estou ligando ao arquivo bandoDeDados.js
conectaBancoDeDados(); // aqui estou chamando a função que conecta o BD

const Mulher = require("./mulherModel"); // aqui estou importando o modelo de mulheres

const app = express(); // aqui estou iniciando o app
app.use(express.json()); // aqui estou configurando o app para usar JSON
app.use(cors()); // libera esse app para ser consumida por qualquer frontend
const porta = process.env.PORT || 3333; // aqui estou definindo a porta

// GET
async function mostraMulheres(req, res) {
  try {
    const mulheresVindasDoBD = await Mulher.find();
    res.json(mulheresVindasDoBD);
  } catch (erro) {
    console.log(erro);
    res.status(500).json({ error: "Erro interno ao buscar mulheres" });
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
    const mulherSalva = await novaMulher.save();
    res.status(201).json(mulherSalva);
  } catch (erro) {
    console.log(erro);
    res.status(500).json({ error: "Erro interno ao adicionar mulher" });
  }
}

// PATCH
async function atualizaMulher(req, res) {
  try {
    const mulherEncontrada = await Mulher.findById(req.params.id);

    if (!mulherEncontrada) {
      return res.status(404).json({ error: "Mulher não encontrada" });
    }

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

    const mulherAtualizadaNoBD = await mulherEncontrada.save();
    res.json(mulherAtualizadaNoBD);
  } catch (erro) {
    console.log(erro);
    res.status(500).json({ error: "Erro interno ao atualizar mulher" });
  }
}

// DELETE
async function apagaMulher(req, res) {
  try {
    const resultado = await Mulher.findByIdAndDelete(req.params.id);

    if (!resultado) {
      return res.status(404).json({ error: "Mulher não encontrada" });
    }

    res.json({ mensagem: "Mulher apagada com sucesso!" });
  } catch (erro) {
    console.log(erro);
    res.status(500).json({ error: "Erro interno ao apagar mulher" });
  }
}

// PORTA
function mostraPorta() {
  console.log(`Servidor criado e rodando na porta: ${porta}`);
}

// Configurando as rotas
router.get("/mulheres", mostraMulheres);
router.post("/mulheres", adicionaMulher);
router.patch("/mulheres/:id", atualizaMulher);
router.delete("/mulheres/:id", apagaMulher);

// Usando o router
app.use(router);

// PORTA
function mostraPorta() {
  console.log(`Servidor criado e rodando na porta: ${porta}`);
}

// Iniciando o servidor
app.listen(porta, mostraPorta);
