const menu=function(req,res){
    res.render('nadzorna_plosca_menu',{layout:'layout_nadzorna_plosca.hbs',title:'Nadzorna plošča'});
}

const rezervacije=function(req,res){
    res.render('nadzorna_plosca_rezervacije',{layout:'layout_nadzorna_plosca.hbs',title:'Nadzorna plošča - Rezervacije',zaposleni_role:req.query.vloga})
}

const urnik=function(req,res){
    res.render('nadzorna_plosca_urnik',{layout:'layout_nadzorna_plosca.hbs',title:'Nadzorna plošča - Urnik',zaposleni_role:req.query.vloga})
}

module.exports={
    menu,
    rezervacije,
    urnik
}