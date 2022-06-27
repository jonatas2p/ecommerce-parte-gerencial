const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authsession = require('./../../../middles/authsesion');
const session = require('express-session');
const flash = require('connect-flash');
router.use(flash());

//tabelas
const tb_user = require('../../../database/tables/tb_user');
const tb_endereco = require('../../../database/tables/tb_endereco');
const tb_entrega = require('../../../database/tables/tb_entrega');


//rotas
router.get('/cadastro', (req, res) => {
    res.render('registerUser');
});

//insert
router.post('/user', (req, res) => {
    var nome = req.body.nome;
    var usercad = req.body.user;
    var password = req.body.password;
    var email = req.body.email

    tb_user.findOne({ where: { user: usercad } }).then(user => {
        if (user == undefined) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            tb_user.create({
                name: nome,
                user: usercad,
                password: hash,
                email: email
            }).then(() => {
                res.redirect('/login');
            });

        } else {
            res.redirect('/');
        }
    });

});

// gerenciamento do usuario logado

router.get('/paineluser', (req, res) => {
    if (req.session.user != undefined) {
        //mensagem de erro, alterdados
        const mensagem = req.flash('usererro')

        const user = `${req.session.user.usuario}`;

        //query de pedidos
        tb_entrega.findAll(
            { where: { user: user},
            order: [['id', 'DESC']]}).then((pedidosuser) => {
                
            res.render('paineluser', {
                dados: req.session.user,
                pedidos: pedidosuser,
                mensagem
            });
        })

    } else {
        res.redirect('/')
    }
});




/*  PAINEL DO USUARIO !!! */

//alter dados
router.post('/alteruser', (req, res) => {
    var passwordnew = req.body.passwordnew;
    var email = req.body.email;
    var pass = "123"

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(passwordnew, salt);

    var password_default = bcrypt.hashSync(pass, salt)


    if (passwordnew && email != undefined) {
        tb_user.update({ email: email, password: hash }, {
            where: {
                user: `${req.session.user.usuario}`
            }
        }).then(() => {
            setTimeout(() => {
                res.redirect('/logout');
            }, 1200);
        })
        // OK !!
    } else if (passwordnew != undefined) {
        // alteracao de senha !!
        tb_user.findOne({ where: { password: passwordnew } }).then(() => {
            tb_user.update({ password: hash }, {
                where: {
                    user: `${req.session.user.usuario}`
                }
            });
            setTimeout(() => {
                res.redirect('/logout');
            }, 1200);
        });
    }

});



module.exports = router;