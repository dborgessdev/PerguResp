const Sequelize = require("sequelize"); 
const connection = require("./database");

const Resposta = connection.define // importa o connection para a model Resposta
('respostas',{
    resposta:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force:false}).then(() =>{
    console.log('Tabela criada com sucesso!');
}).catch((erro)=>{
    console.log(erro);
});

module.exports = Resposta;