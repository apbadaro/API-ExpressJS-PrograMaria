const express = require("express"); // aqui estou iniciando o express
const router = express.Router(); // aqui estou iniciando o router/primeira parte da rota
const { v4: uuidv4 } = require("uuid"); // aqui estou importando a função uuidv4 para gerar um id único

const app = express(); // aqui estou iniciando o app
app.use(express.json()); // aqui estou configurando o app para usar JSON
const porta = 3333; // aqui estou definindo a porta

// aqui estou criando um array inicial de objetos com informações de mulheres
const mulheres = [
  {
    id: "1",
    nome: "Simara Conceição",
    imagem: "https://bit.ly/3LJIyOF",
    minibio: "Desenvolvedora e instrutora"
  },

  {
    id: "2",
    nome: "Iana Chan",
    imagem: "https://bit.ly/3JCXBqP",
    minibio: "CEO & Founder da PrograMaria"
  },

  {
    id: "3",
    nome: "Luana Pimentel",
    imagem: "https://bit.ly/3FKpFaz",
    minibio: "Senior Staff Software Engineer"
  }
];

// GET
function mostraMulheres(req, res) {
  res.json(mulheres);
}

// POST
function adicionaMulher(req, res) {
  const novaMulher = {
    id: uuidv4(),
    nome: req.body.nome,
    imagem: req.body.imagem,
    minibio: req.body.minibio
  };
  mulheres.push(novaMulher); // adiciona a nova mulher ao array
  res.json(mulheres); // retorna o array atualizado, com a nova mulher
}

// PATCH
function atualizaMulher(req, res) {
  // encontra a mulher no array pelo id
  function encontraMulher(mulher) {
    if (mulher.id === req.params.id) {
      return mulher;
    }
  }
  // encontra a mulher no array
  const mulherEncontrada = mulheres.find(encontraMulher);

  // atualiza os dados da mulher
  if (req.body.nome) {
    mulherEncontrada.nome = req.body.nome;
  }
  if (req.body.minibio) {
    mulherEncontrada.minibio = req.body.minibio;
  }
  if (req.body.imagem) {
    mulherEncontrada.imagem = req.body.imagem;
  }

  // retorna o array atualizado, com o(s) dado(s) da mulher alterado(s)
  res.json(mulheres);
}

// DELETE
function apagaMulher(req, res) {
  // filtra o array, removendo a mulher que tem o id igual ao id passado na URL
  function todasMenosEla(mulher) {
    if (mulher.id !== req.params.id) {
      return mulher;
    }
  }

  const mulherQueFicam = mulheres.filter(todasMenosEla);

  res.json(mulherQueFicam); // retorna o array atualizado, sem a mulher removida
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
