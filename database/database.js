const Sequelize = require("sequelize");
const connection = new Sequelize('guiapress', 'admin', 'brzsofthouse@2019', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
});

module.exports = connection;