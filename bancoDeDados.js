const mongoose = require("mongoose");
require("dotenv").config();

async function conectaBancoDeDados() {
  try {
    console.log("Conexão com o BD iniciada");

    await mongoose.connect(process.env.MONGO_URL); // abstração de conexão do Mongoose
    console.log("Conexão com o BD feita com sucesso!");
  } catch (erro) {
    console.error("Erro ao conectar com o BD: ", erro);
  }
}

module.exports = conectaBancoDeDados;
