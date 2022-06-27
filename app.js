const express = require('express');
const app = express();
const session = require('express-session');


//conection database
const conection = require('./database/conection');
conection.authenticate().then(() => {
    console.log('banco conectado !')
}).catch(() => {
    console.log('erro ao conectar !')
});

//import tabela de produtos no index
const tb_produto = require('./database/tables/tb_produto');


//Config da sessao !
app.use(session({
    secret: 'teste123',
    resave: false,
    saveUninitialized: false
}));



//import body-parser
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


// import Painel ADM
const painelADM = require('./app/adm/painelADM');
app.use('/', painelADM);

// import Configs do usuario
const Usercontroller = require('./app/AuthenticateUser/controllers/Usercontroller');
app.use('/', Usercontroller);

// import Login
const Logincontroller = require('./app/AuthenticateUser/controllers/Logincontroller');
app.use('/', Logincontroller);

// import Pagina venda
const vendacontroller = require('./app/AuthenticateUser/controllers/vendacontroller');
app.use('/', vendacontroller);

// import Paginas externas
const PageExtend = require('./app/AuthenticateUser/controllers/PageExtend');
app.use('/', PageExtend);


//import do ejs 
app.set('view engine', 'ejs');
//pasta dos arquivos ejs de forma estatica
app.use(express.static('documents'));

//router index
app.get('/', (req, res) => {

    tb_produto.findAll({
        raw: true, order: [['id', 'ASC']]
    }).then((tb_produtos => {
        if (req.session.user != undefined) {
            //let mensagem = req.session.user
            let user = `${req.session.user.usuario}`
            res.render('index', {

                produtos: tb_produtos,
                msg: user
                // ok
            });

        } else {
            let msg = "Entrar"
            res.render('index', {

                produtos: tb_produtos,
                msg
                // ok
            });
        }

    }));
});



//start app.js
app.listen(8080, () => {
    console.log('serv rodando !');
});