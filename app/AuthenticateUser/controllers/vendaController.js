const express = require('express');
const routerBuy = express.Router();
const bodyparser = require('body-parser');
const tb_entrega = require('../../../database/tables/tb_entrega');
const tb_produtos = require('../../../database/tables/tb_produto');
const router = require('./Usercontroller');


//recebendo formulario do produto
routerBuy.post('/dadosvenda', (req, res) => {

    // armazena os dados do formulario direto em uma sessao !!
    req.session.venda = {
        produto: req.body.nomeProdu,
        valor: req.body.valorProdu,
        image: req.body.imgProdu,
        frete: req.body.freteProdu,
        descricao: req.body.descProdu,
        estoque: req.body.estoqueProdu
    }
    res.redirect('/venda');
    // ok

});

//enviando formulario do produto para pagina de venda
routerBuy.get('/venda', (req, res) => {

    // sessao do usuario e dos produtos
    if (req.session.user != undefined) {
        res.render('venda', {
            authUser: req.session.user,
            produto: req.session.venda.produto,
            valor: req.session.venda.valor,
            image: req.session.venda.image,
            frete: req.session.venda.frete,
            descricao: req.session.venda.descricao,
            quant: req.session.venda.estoque


        });
        //     Funcionando 

    } else {
        let authUser = "Entrar"
        res.render('venda', {
            authUser,
            produto: req.session.venda.produto,
            valor: req.session.venda.valor,
            image: req.session.venda.image,
            frete: req.session.venda.frete,
            descricao: req.session.venda.descricao,
            quant: req.session.venda.estoque


        });
    }

});

//Compra do usuario
routerBuy.post('/compraUser', (req, res) => {

    //  ok

    //formulario do usuario
    const user = req.body.nameuser
    const pagamento = req.body.pagamento;
    const local = req.body.enderecouser;
    const numero = req.body.numcasauser

    // produto
    const imagemProduto = req.body.image;
    const nomeProduto = req.body.produto;
    const valorProduto = req.body.valor;
    const frete = req.body.frete

    //estoque do produto
    var quantidade = parseInt(req.body.quant);

    // user , produto , image, valor, endereco , frete

    const endereco = `endereco: ${local}, numero: ${numero}`;
    const estoque = quantidade - 1;


    tb_entrega.create({
        user: `${req.session.user.usuario}`,
        produto: nomeProduto,
        image: imagemProduto,
        valor: valorProduto,
        pagamento: pagamento,
        endereco: endereco,
        frete: frete
    }).then(() => {
        tb_produtos.update(
            { estoque: estoque },
            { where: { name: nomeProduto } }
        )
        res.redirect('/')
    });



});



module.exports = routerBuy;



