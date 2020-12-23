const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Article = connection.define('articles',{
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})
//Relacionamento 1:n usando o hasMany
Category.hasMany(Article);
//Relacionamento 1:1 usando o belongsTO
Article.belongsTo(Category);

//Article.sync({force:true});

module.exports = Article;