const index=function(req,res){
    res.render('index',{layout:'layout_pristajlna_stran.hbs',title:'Al Dente',izbrano_ime:'index'});
}

const onas=function(req,res){
    res.render('onas',{layout:'layout_pristajlna_stran.hbs',title:'Al Dente - O Nas',izbrano_ime:'onas'});
}

const rezerviraj=function(req,res){
    res.render('rezervacija',{layout:'layout_pristajlna_stran.hbs',title:'Al Dente - O Nas',izbrano_ime:'rezerviraj_mizo'});
}

module.exports={
    index,
    onas,
    rezerviraj
}