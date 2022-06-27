function authADM(req, res, next){
    if(req.session.adm != undefined){
        next();
    }else{
        res.redirect("/");
    }
}

module.exports = authADM;