const Sequelize = require('sequelize'); // importa o sequelize
const connection = require('./database'); // importa o database

const Pergunta = connection.define('perguntas', { // define o nome da tabela
    titulo: { // define o nome da coluna
        type: Sequelize.STRING,// define o tipo da coluna
        allowNull: false // define se o campo pode ser nulo
    },
    
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(() =>{ // sincroniza a tabela
    console.log('Tabela criada com sucesso!');
}).catch((erro) => {
    console.log(erro);
})

module.exports = Pergunta;