const index=function(req,res){
    res.render('index',{layout:'layout_pristajlna_stran.hbs',title:'Al Dente',izbrano_ime:'index'});
}

const onas=function(req,res){
    res.render('onas',{layout:'layout_pristajlna_stran.hbs',title:'Al Dente - O Nas',izbrano_ime:'onas'});
}

module.exports={
    index,
    onas
}