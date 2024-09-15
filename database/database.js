const Sequelize = require('sequelize'); // importa o sequelize

const connection = new Sequelize('pergurespdb', 'root', 'Python__4590', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;