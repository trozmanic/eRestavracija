const fs = require('fs');
const path = require('path');
const axios = require('axios');
const apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)
};
if (process.env.NODE_ENV === 'production') {
    //TODO: include heroku
    apiParametri.streznik = "";
}
//NOTE: temporary function to get JSON data hardcoded on disk
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


const index=async function(req,res){
    const uporabnik_id = req.query.uporabnik_id;
    //Specifiran je uporabnik_id, zato zaslonsko masko renderiramo
    //Glede na njegovo vlogo itd ...
    if (uporabnik_id) {
        axios.get(apiParametri.streznik + "/api/uporabniki/" + uporabnik_id)
            .then((response)=> {
                console.log(response.data);
                return res.render('index_logged', {layout:'layout_pristajlna_stran.hbs',
                    title:'Al Dente',izbrano_ime:'index',
                    ime_uporabnika:response.data.ime})
            })
            .catch((err) => {
                console.log(err);
                return res.render('index',{layout:'layout_pristajlna_stran.hbs',title:'Al Dente',izbrano_ime:'index'});
            })
    }else {
        res.render('index',{layout:'layout_pristajlna_stran.hbs',title:'Al Dente',izbrano_ime:'index'});
    }
}

const onas=function(req,res){
    res.render('onas',{layout:'layout_pristajlna_stran.hbs',title:'Al Dente - O Nas',izbrano_ime:'onas'});
}

const rezerviraj=function(req,res){
    res.render('rezervacija_prva',{layout:'layout_pristajlna_stran.hbs',title:'Al Dente - Rezerviraj',izbrano_ime:'rezerviraj_mizo'});
}

const rezerviraj_podatki=function(req,res){
    res.render('rezervacija',{layout:'layout_pristajlna_stran.hbs',title:'Al Dente - Rezerviraj',izbrano_ime:'rezerviraj_mizo'})
}

const rezerviraj_menu=function(req,res){
    res.render('rezervacija_menu',{layout:'layout_pristajlna_stran.hbs',title:'Al Dente - Rezerviraj',izbrano_ime:'rezerviraj_mizo'})
}

const menu = function (req, res) {
    let pathJSON = path.dirname(require.main.filename).split('/');
    pathJSON.pop();
    pathJSON = pathJSON.join('/') + "/public/api_simulation/meni/meni_items.json";
    read_json(pathJSON)
        .then( (data) => {
            res.render('menu', {layout: 'layout_pristajlna_stran.hbs', title:'Al dente', izbrano_ime:'menu', menu_items: data})
        })
        .catch( (err) => {
            console.log(err);
            //TODO: implement error handling for exmaple notFound/error page ...
            res.render('not_found');
        });


}

module.exports={
    index,
    onas,
    rezerviraj,
    rezerviraj_podatki,
    rezerviraj_menu,
    menu
}
