const menu=function(req,res){
    res.render('nadzorna_plosca_menu',{layout:'layout_nadzorna_plosca.hbs',title:'Nadzorna plošča',zaposleni_role:req.query.vloga});
}

const rezervacije=function(req,res){
    res.render('nadzorna_plosca_rezervacije',{layout:'layout_nadzorna_plosca.hbs',title:'Nadzorna plošča - Rezervacije',zaposleni_role:req.query.vloga})
}

const urnik=function(req,res){
    res.render('nadzorna_plosca_urnik',{layout:'layout_nadzorna_plosca.hbs',title:'Nadzorna plošča - Urnik',zaposleni_role:req.query.vloga})
}

const zaloga=function(req,res){
    res.render('nadzorna_plosca_zaloga',{layout:'layout_nadzorna_plosca.hbs',title:'Nadzorna plošča - Zaloga',zaposleni_role:req.query.vloga})
}

const zaposleni=function(req,res){
    res.render('nadzorna_plosca_zaposleni',{layout:'layout_nadzorna_plosca.hbs',title:'Nadzorna plošča - Zaposleni',zaposleni_role:req.query.vloga})
}

const strezba=function(req,res){
    res.render('nadzorna_plosca_strezba',{layout:'layout_nadzorna_plosca.hbs',title:'Nadzorna plošča - Strežba',zaposleni_role:req.query.vloga})
}

module.exports={
    menu,
    rezervacije,
    urnik,
    zaloga,
    zaposleni,
    strezba
}