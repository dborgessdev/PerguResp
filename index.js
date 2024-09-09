const express = require("express"); // importa o express
const app = express(); // cria o app com express

app.set("view engine", "ejs"); // seta o motor de views como ejs

app.get("/", (req, res) => {
  // rota raiz//
  var nome = "Davi"; // variáveis passadas para o ejs
  var lang = "Python";
  var exibirMsg = false; // variável para exibir a mensagem
  const perguntas = [
    { id: 1, titulo: "O que é Node.js?", descricao: "Gostaria de saber o que é e como funciona o Node.js." },
    { id: 2, titulo: "Como usar Express com MySQL?", descricao: "Alguém pode me ajudar a conectar o Express ao MySQL?" },
    { id: 3, titulo: "Como usar EJS com Node JS?", descricao: "Alguém pode me ajudar a conectar o EJS ao NojdeJS?" }
  ]


  res.render("index", {
    // renderiza o ejs
    nome: nome, // passa a variável para o ejs
    lang: lang, // passa a variável para o ejs
    msg : exibirMsg, // passa a variável para o ejs
    perguntas: perguntas
  });
});

// realizando requisição de parametros pelo http
// rota raiz//
//app.get("/:nome/:lang", (req, res) => {
//var nome = req.params.nome; // variáveis passadas para o ejs
//var lang = req.params.lang;
//var exibirMsg = true; // variável para exibir a mensagem
//  res.render("index", {
//    // renderiza o ejs
//    nome: nome, // passa a variável para o ejs
//    lang: lang, // passa a variável para o ejs
//    msg: exibirMsg, // passa a variável para o ejs
//  });
//});

app.listen(8080, () => {
  // inicia o servidor
  console.log("Servidor iniciado na porta 8080"); // mostra no console
});
