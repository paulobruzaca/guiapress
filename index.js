const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const Article = require("./articles/Article");
const Category = require("./categories/Category");

//importando a rota de categoria
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

//Carregando a view engine
app.set('view engine', 'ejs');

//Carregando os arquivos estaticos
app.use(express.static('public'));

//Carregando o Body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//COnectando ao banco de dados
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
        console.log(error);
    })

app.use("/", categoriesController);
app.use("/", articlesController);

app.get("/",(req,res) => {
    res.render("index");
})

app.listen(8080, () => {
    console.log("O servidor está funcionando!");
})