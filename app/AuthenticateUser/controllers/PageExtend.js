const express = require('express');
const routerExtend = express.Router();
const bodyparser = require('body-parser');
const tb_produto = require('../../../database/tables/tb_produto');
const tb_favorito = require('../../../database/tables/tb_favorito');


//tecnologia
routerExtend.get('/tecnologia', (req, res) => {

    tb_produto.findAll(
        {
            where: { categoria: 'tecnologia' }
        }).then((success) => {
            if (req.session.user != undefined) {
                //let mensagem = req.session.user
                let user = `${req.session.user.usuario}`
                res.render('tecnologia', {

                    tecProduto: success,
                    msg: user
                    // ok
                });

            } else {
                let msg = "Entrar"
                res.render('tecnologia', {

                    tecProduto: success,
                    msg
                    // ok
                });
            }
        });

});

// beleza
routerExtend.get('/beleza', (req, res) => {

    tb_produto.findAll(
        {
            where: { categoria: 'beleza' }
        }).then((success) => {
            if (req.session.user != undefined) {
                //let mensagem = req.session.user
                let user = `${req.session.user.usuario}`
                res.render('beleza', {

                    belezaProduto: success,
                    msg: user
                    // ok
                });

            } else {
                let msg = "Entrar"
                res.render('beleza', {

                    belezaProduto: success,
                    msg
                    // ok
                });
            }
        });

});

// Moda
routerExtend.get('/moda', (req, res) => {

    tb_produto.findAll(
        {
            where: { categoria: 'moda' }
        }).then((success) => {
            if (req.session.user != undefined) {
                let user = `${req.session.user.usuario}`
                res.render('moda', {

                    modaProduto: success,
                    msg: user
                    // ok
                });

            } else {
                let msg = "Entrar"
                res.render('moda', {

                    modaProduto: success,
                    msg
                    // ok
                });
            }
        });

});

//favorito index
routerExtend.get('/favorito', (req, res) => {

    if (req.session.user != undefined) {

        const user = `${req.session.user.usuario}`;
        //query do favorito
        tb_favorito.findAll(
            {
                where: { user: user },
                order: [['id', 'DESC']]
            }).then((favorito) => {

                res.render('favorito', {
                    msg: user,
                    favorito: favorito

                });

            });

    } else {
        res.redirect('/')
    }

});
// include item favorito
routerExtend.post('/favoritoadc', (req, res) => {

    var produto = req.body.nomeProdu;
    var image = req.body.imgProdu;
    var valor = req.body.valorProdu;
    var frete = req.body.freteProdu;

    tb_favorito.create({
        user: `${req.session.user.usuario}`,
        produto: produto,
        image: image,
        valor: valor,
        frete: frete
    }).then(() => {
        res.redirect('/')
    });
});

//remove item favorito
routerExtend.post('/removefavorito', (req, res) => {

    var user = `${req.session.user.usuario}`;
    tb_favorito.destroy({ where: { produto: req.body.produto } }, {
        produto: req.body.produto,
        image: req.body.image,
        valor: req.body.valor,
        frete: req.body.frete
    }).then(() => {
        res.redirect('/favorito')
    });
});






module.exports = routerExtend;