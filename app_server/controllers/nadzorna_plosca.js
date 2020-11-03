const menu=function(req,res){
    res.render('nadzorna_plosca_menu',{layout:'layout_nadzorna_plosca.hbs',title:'Express'});
}

module.exports={
    menu
}