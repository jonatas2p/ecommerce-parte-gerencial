const express = require('express');
const router = express.Router();
const authADM = require('../../middles/authsesionADM');


//tabelas
const tb_produtos = require('../../database/tables/tb_produto');
const tb_categoria = require('../../database/tables/tb_categoria');
const tb_user = require('../../database/tables/tb_user');
const tb_entregas = require('../../database/tables/tb_entrega');



//upload
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "documents/uploadProdut");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
    // OK
});
const upload = multer({storage});




//rotas

router.get('/adm',authADM,(req,res)=>{

    var entregas = undefined;
    var users = undefined;
    
    //query entregas
    tb_entregas.findAll({
        raw: true, order: [['id', 'ASC']]
    }).then((tb_entregas => {
        entregas = tb_entregas
    }));

    //query users
    tb_user.findAll({
        raw: true, order: [['id', 'DESC']]
    }).then((tb_user => {
        users = tb_user
    }));

    //query principal
    tb_categoria.findAll({
        raw: true, order: [['id', 'DESC']]
    }).then((tb_categoria => {
        res.render("painelADM", {
            categoria: tb_categoria,
            logADM: req.session.adm,
            allpedidos: entregas,
            allusers: users
        });
    }));
   

}); // OK


router.post('/registerProd', upload.single("imagem"),authADM, (req,res)=>{
   

    if(req.body.frete == 0){
        tb_produtos.create({
            name: req.body.nome,
            descricao: req.body.descricao,
            valor: req.body.valor,
            frete: 'Gratis',
            image: req.file.filename,
            estoque:req.body.estoque,
            categoria:req.body.categoria


        }).then(()=>{
            res.redirect('/adm');
        });
        
    }else{
        tb_produtos.create({
            name: req.body.nome,
            descricao: req.body.descricao,
            valor: req.body.valor,
            frete: req.body.frete,
            image: req.file.filename,
            estoque:req.body.estoque,
            categoria:req.body.categoria

        }).then(()=>{
            res.redirect('/adm');
        });
    } // oK

});

router.post('/insertcategoria',authADM,(req,res)=>{
    var nomecat = req.body.nome;

    tb_categoria.create({
        nome: nomecat
    }).then(()=>{
        res.redirect('/adm');
    });
    // ok
});


module.exports = router;