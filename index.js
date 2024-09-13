// para instalar o nodemon npm install -g nodemon
// para instalar o sequelize: npm install --save sequelize
// para importar mysql2: npm install --save mysql2
// importa o express, depois cria o app com express, por fim importa o body-parser (precisa ser instalado com o comando npm install body-parser --save)
const express = require("express"); 
const app = express(); // 
const bodyParser = require("body-parser"); 
const Pergunta = require("./database/pergunta");

//database
const connection = require("./database/database");
//promise
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com o banco de dados!");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

// seta o motor de views como ejs, seta o diretorio publico para acessar os arquivos estaticos
app.set("view engine", "ejs"); 
app.use(express.static("public"));

// habilita o body-parser, permite a leitura de json através do body-parser
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json()); 

// declaração da rota principal junto com sua renderização
app.get("/", (req, res) => {
  var nome = "Davi";
  var lang = "Python";
  var exibirMsg = false;
  const perguntas = [
    { id: 1, titulo: "O que é Node.js?", descricao: "Gostaria de saber o que é e como funciona o Node.js." },
    { id: 2, titulo: "Como usar Express com MySQL?", descricao: "Alguém pode me ajudar a conectar o Express ao MySQL?" },
    { id: 3, titulo: "Como usar EJS com Node JS?", descricao: "Alguém pode me ajudar a conectar o EJS ao NojdeJS?" }
  ]

  //Aqui realizamos a renderização da INDEX via EJS, também "passamos" as variaveis que serão utilizadas.
  res.render("index", {
    nome: nome, 
    lang: lang, 
    msg : exibirMsg, 
    perguntas: perguntas
  });
});

app.get("/perguntar", (req, res)=>{
  res.render("perguntar");
});

app.post("/formpergunta", (req, res) => {
  var titulo = req.body.pergunta;  // Alterar para titulo
  var descricao = req.body.descricao;
  Pergunta.create({
    titulo: titulo,  // Alterar para titulo
    descricao: descricao
  }).then(() => {
    res.redirect("/");
  }).catch((erro) => {
    console.log(erro);
  });
});
/*realizando requisição de parametros pelo http
rota raiz//
app.get("/:nome/:lang", (req, res) => {
var nome = req.params.nome; // variáveis passadas para o ejs
var lang = req.params.lang;
var exibirMsg = true; // variável para exibir a mensagem
  res.render("index", {
    // renderiza o ejs
    nome: nome, // passa a variável para o ejs
    lang: lang, // passa a variável para o ejs
    msg: exibirMsg, // passa a variável para o ejs
  });
});*/

app.listen(8080, () => {
  console.log("Servidor iniciado na porta 8080"); 
});
