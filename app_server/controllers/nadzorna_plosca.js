const fs = require('fs');
const path = require('path');
var apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)
};
if (process.env.NODE_ENV === 'production') {
    //TODO: include heroku
    apiParametri.streznik = "";
}
const axios = require('axios').create({
    baseURL: apiParametri.streznik,
    timeout: 5000
});

const menu=function(req,res){
    res.render('nadzorna_plosca_menu',{layout:'layout_nadzorna_plosca.hbs',title:'Nadzorna plošča',zaposleni_role:req.query.vloga});
}

const rezervacije=function(req,res){
    res.render('nadzorna_plosca_rezervacije',{layout:'layout_nadzorna_plosca.hbs',title:'Nadzorna plošča - Rezervacije',zaposleni_role:req.query.vloga})
}

const prikaziUrnik=function(req,res, urnik, sporocilo){
    if (sporocilo) {
        res.render('error',{layout:'layout_nadzorna_plosca.hbs',title:'Napaka',zaposleni_role:req.query.vloga, message:sporocilo});
    } else {
        res.render('nadzorna_plosca_urnik', {layout:'layout_nadzorna_plosca.hbs',
            title: 'Nadzorna plošča - Urnik',
            zaposleni_role:req.query.vloga,
            urnik:urnik.dnevi,
            leto:urnik.leto,
            mesec:urnik.mesec,
            zac_dan:urnik.zac_dan,
            uporabnik_id:urnik.id_uporabnika,
            st_dni:urnik.st_dni
        });
    }
}

const urnik=function(req,res){
    var id = req.query.uporabnik_id;
    var mesec = req.query.mesec;
    var leto = req.query.leto;
    if (id && mesec && leto) {
        axios.get('/api/urnik', {
            params: {
                uporabnik_id: id,
                mesec: mesec,
                leto: leto
            }
        })
            .then((odgovor) => {
                prikaziUrnik(req, res, odgovor.data);
            })
            .catch(() => {
                prikaziUrnik(req, res, [], "Napaka API-ja pri iskanju urnika.");
            });
    } else if (id){
        axios.get('/api/urnik', {
            params: {
                uporabnik_id: id
            }
        })
            .then((odgovor) => {
                prikaziUrnik(req, res, odgovor.data);
            })
            .catch(() => {
                prikaziUrnik(req, res, [], "Napaka API-ja pri iskanju urnika.");
            });
    } else {
        prikaziUrnik(req, res, [], "Ni niti ID-ja bilo poslanega.");
    }
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