const mongoose = require("mongoose"); // aqui estou importando o mongoose

// aqui estou criando um schema para o modelo de mulheres
const MulherSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  imagem: {
    type: String,
    required: true
  },
  minibio: {
    type: String,
    required: true
  },
  citacao: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("diva", MulherSchema); // aqui estou exportando o modelo de mulheres
