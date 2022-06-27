const express = require('express');
const routerLogin = express.Router();
const bodyparser = require('body-parser');
const tb_user = require('../../../database/tables/tb_user');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const router = require('./Usercontroller');
const flash = require('connect-flash');
routerLogin.use(flash());



routerLogin.use(bodyparser.urlencoded({ extended: false }));
routerLogin.use(bodyparser.json());



routerLogin.get('/login', (req, res) => {
    const mensagem = req.flash('usererro')
    res.render('loginUser', { mensagem });
});

// autenticacao usuario
routerLogin.post('/authenticate', (req, res) => {
    var userlog = req.body.user;
    var passwordlog = req.body.password;

    tb_user.findOne({
        where: { user: userlog }
    }).then(user => {
        if (user != undefined) {
            if (userlog == "teste123" && passwordlog == 123) {
                var correct = bcrypt.compareSync(passwordlog, user.password);

                // authenticacao do ADM
                if (correct) {
                    req.session.adm = {
                        name: user.name,
                        email: user.email,
                        usuario: user.user,
                    }
                    res.redirect("/adm")
                }
                else {
                    req.flash("usererro", "dados incorretos, tente novamente !");
                    res.redirect('/login');

                }
            }
            else if (userlog != "teste123" && passwordlog != 123) {
                // Authenticacao do usuario comum
                var correct = bcrypt.compareSync(passwordlog, user.password);

                if (correct) {
                    req.session.user = {
                        name: user.name,
                        email: user.email,
                        usuario: user.user,
                    }


                    setTimeout(() => {
                        res.redirect('/')
                    }, 1200);

                } else {
                    req.flash("usererro", "dados incorretos, tente novamente !");
                    res.redirect('/login');

                }

            }

        } else {
            req.flash("usererro", "dados incorretos, tente novamente !");
            res.redirect('/login')
        }

    });

});


// logout do ADM !
router.get('/logoutADM', (req, res) => {
    req.session.adm = undefined
    res.redirect('/');
});

// logout do usuario !
router.get('/logout', (req, res) => {
    req.session.user = undefined
    res.redirect('/');
});



module.exports = routerLogin;