const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./database/database");

const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./users/User");


//importando a rota de categoria
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const usersController = require("./users/UsersController");

//Carregando a view engine
app.set('view engine', 'ejs');

//Configuações de session
app.use(session({
    secret: "qualquercoisa", //colocar qualquer coisa para aumentar a segurança das session
    cookie: {
        maxAge: 300000 // colocar o tempo em milessegundos.
    }
}))

//Carregando os arquivos estaticos
app.use(express.static('public'));

//Carregando o Body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Conectando ao banco de dados
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
        console.log(error);
    })

app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", usersController);

app.get("/",(req,res) => {

    Article.findAll({
        order:[
            ['id', "DESC"]
        ],
        limit: 4
    }).then(articles => {
        Category.findAll().then(categories =>{
            res.render("index", {articles: articles, categories: categories});
        });
    });
});

app.get("/:slug", (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where:{
            slug:slug
        }
    }).then(article =>{
        if(article != undefined){
            Category.findAll().then(categories =>{
                res.render("article", {article: article, categories: categories});
            });
        }else{
            res.redirect("/");
        }
    }).catch( err => {
        res.redirect("/");
    })
});

app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where:{
            slug: slug
        },
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined){
            Category.findAll().then(categories => {
                res.render("index", {articles: category.articles, categories: categories});
            });
        }else{
            res.redirect("/");
        }
    }).catch( err =>{
        res.redirect("/");
    });
});

app.listen(8080, () => {
    console.log("O servidor está funcionando!");
})