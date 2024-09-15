/* * para instalar o nodemon npm install -g nodemon
* para instalar o sequelize: npm install --save sequelize
*  para importar mysql2: npm install --save mysql2
* importar o express, depois cria o app com express, por fim importa o 
* body-parser (precisa ser instalado com o comando npm install body-parser --save)
* o body-parser é responsável por receber o corpo da requisição e transformar em um objeto de varios formatos (JSON, XML, etc). */

const express = require("express"); 
const app = express(); // 
const bodyParser = require("body-parser"); 
const Pergunta = require("./database/Pergunta");

//database: importa o sequelize
const connection = require("./database/database");
//promise: usado para tratar erros
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

/* A seguir, definimos uma rota que responde a requisições GET enviadas para o endpoint raiz ("/"). Isso significa que, quando o usuário acessa o endereço principal do site, esta função será chamada.

Usamos o método findAll() do Sequelize para buscar todas as entradas da tabela associada ao modelo Pergunta no banco de dados.

O parâmetro {raw: true} faz com que os resultados sejam retornados como objetos JavaScript puros (sem incluir metadados do Sequelize). Isso facilita o uso desses dados em templates ou outras partes da aplicação.

Como findAll() retorna uma Promise, o método .then() é usado para lidar com o resultado quando a consulta for bem-sucedida.*/
app.get("/", (req, res) => {
  Pergunta.findAll({raw: true, order: [['id', 'DESC']]}).then((perguntas) => { // seleciona todas as perguntas
    res.render("index", {
      perguntas: perguntas
   });
  });
});

app.get("/perguntar", (req, res)=>{ // rota para perguntar
  res.render("perguntar");
});

app.post("/formpergunta", (req, res) => { // rota para receber a pergunta
  var titulo = req.body.pergunta;  // Alterar para titulo
  var descricao = req.body.descricao; // Alterar para descricão
  Pergunta.create({
    titulo: titulo,
    descricao: descricao
  }).then(() => { // insere a pergunta no banco
    res.redirect("/"); // redireciona para a rota principal
  }).catch((erro) => { // caso ocorra um erro
    console.log(erro); // mostra o erro
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
