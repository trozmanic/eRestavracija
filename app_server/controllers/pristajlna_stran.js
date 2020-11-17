const fs = require('fs');
const path = require('path');
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

const index=function(req,res){
    res.render('index',{layout:'layout_pristajlna_stran.hbs',title:'Al Dente',izbrano_ime:'index'});
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
