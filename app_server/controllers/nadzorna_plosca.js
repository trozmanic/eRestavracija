const fs = require('fs');
const path = require('path');
const axios = require('axios');
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

const narocila_kuhar=function (req, res){
    read_json('./public/api_simulation/narocila/narocila_kuhinja.json')
        .then((data) => {
            res.render('nadzorna_plosca_kuhar',{layout:'layout_nadzorna_plosca.hbs',title:'Nadzorna plošča - Narocila kuhinja', narocila: data});
        })
        .catch( (err) => {
            console.log(err);
            //TODO: implement error handling for exmaple notFound/error page ...

        })
}
const meni=function (req, res){
    read_json('./public/api_simulation/meni/meni_items.json')
        .then((data) => {
            res.render('nadzorna_plosca_meni', {layout: 'layout_nadzorna_plosca.hbs', title:'Al dente', izbrano_ime:'menu', menu_items: data})
        })
        .catch((err) => {
            console.log(err);
            //TODO: implement error handling for exmaple notFound/error page ...

        })
}

const read_json = (pathJSON) => {
    return new Promise((resolve, reject) => {
        fs.readFile(pathJSON, (err, data) => {
            if (err) {
                reject (err);
            }
            else {
                resolve(JSON.parse(data))
            }
        })
    })
}
module.exports={
    menu,
    rezervacije,
    urnik,
    zaloga,
    zaposleni,
    narocila_kuhar,
    meni,
    strezba
}