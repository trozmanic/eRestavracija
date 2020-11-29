const fs = require('fs');
const path = require('path');
const axios = require('axios');
const meni = require('../service/meni');

const apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)
};

if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://aldente-sp-20-21.herokuapp.com/';
}

//NOTE: temporary function to get JSON data hardcoded on disk
const read_json = (pathJSON) => {
    return new Promise((resolve, reject) => {
        fs.readFile(pathJSON, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(data))
            }
        })
    })
}

const renderDynamic = (uporabnik_id, res, layout, title, izbrano_ime, template, obj) => {
    //console.log(obj);
    if (uporabnik_id) {
        axios.get(apiParametri.streznik + "/api/uporabniki/" + uporabnik_id)
            .then((response) => {
                //console.log(response.data);
                return res.render(template, { layout, title, izbrano_ime, uporabnik: response.data, dynamicData: obj })
            })
            .catch((err) => {
                return res.render(template, { layout, title, izbrano_ime });
            })
    }
    else {
        return res.render(template, { layout, title, izbrano_ime, dynamicData: obj })
    }

}


const index=async function(req,res){
    let uporabnik_id = req.session.uporabnik_id;
    if (uporabnik_id) {
        req.session.uporabnik_id = uporabnik_id;
        renderDynamic(uporabnik_id,
            res,
            'layout_pristajlna_stran.hbs',
            'Al Dente',
            'index',
            'index_logged');
    } else {
        res.render('index', { layout: 'layout_pristajlna_stran.hbs', title: 'Al Dente', izbrano_ime: 'index' });
    }
}

const onas=function(req,res){
    const uporabnik_id = req.session.uporabnik_id;
    if (uporabnik_id) {
        renderDynamic(uporabnik_id,
            res,
            'layout_pristajlna_stran.hbs',
            'Al Dente - O Nas',
            'onas',
            'onas')
    }
    else {
        res.render('onas', { layout: 'layout_pristajlna_stran.hbs', title: 'Al Dente - O Nas', izbrano_ime: 'onas' });
    }
}

const rezerviraj = function (req, res) {
    const uporabnik_id = req.session.uporabnik_id
    if (uporabnik_id) {
        axios.get(apiParametri.streznik+"/api/rezervacija/"+uporabnik_id).then((rezervacije)=>{
            axios.get(apiParametri.streznik+"/api/meni").then((meni)=>{
                renderDynamic(uporabnik_id, res, 'layout_pristajlna_stran.hbs', 'Al Dente - Rezerviraj', 'rezerviraj_mizo', 'rezervacija_prva',{rezervacije:rezervacije.data,meni:meni.data});
            })
        })
        
    } else {
        res.render('potrebna_prijava', { layout: 'layout_pristajlna_stran.hbs', title: "Potrebna prijava" })
    }
}

const rezerviraj_podatki = function (req, res) {
    const uporabnik_id = req.session.uporabnik_id;
    if (uporabnik_id) {
        renderDynamic(uporabnik_id,
            res,
            'layout_pristajlna_stran.hbs',
            'Al Dente - Rezerviraj',
            'rezerviraj_mizo',
            'rezervacija'
        )
    }
    else {
        res.render('potrebna_prijava', { layout: 'layout_pristajlna_stran.hbs', title: "Potrebna prijava" });
    }
}

const rezerviraj_menu=function(req,res){
    const uporabnik_id = req.session.uporabnik_id;
    if (uporabnik_id) {
        axios.get(apiParametri.streznik+"/api/meni").then((odgovor)=>{
            renderDynamic(uporabnik_id,res,'layout_pristajlna_stran.hbs','Al Dente - Rezerviraj','rezerviraj_mizo','rezervacija_menu',odgovor.data);
        })
    }else{
        res.render('potrebna_prijava', { layout: 'layout_pristajlna_stran.hbs', title: "Potrebna prijava" });
    }
}

const potrebna_prijava = function (req, res) {
    res.render('potrebna_prijava', { layout: 'layout_pristajlna_stran.hbs', title: "Potrebna prijava" })
}

const menu = async function (req, res) {
    const uporabnik_id = req.session.uporabnik_id;
    console.log(uporabnik_id)
    try {
        let menu_items = null;
        if (uporabnik_id) {
            menu_items = await meni.pridobiMeni(uporabnik_id);
            console.log(menu_items)
        }
        else {
            const data = await axios.get(apiParametri.streznik + "/api/meni");
            menu_items = data.data;
            menu_items.forEach((item) => {
                item.ocenjena = false;
                const ocena = parseInt(item.ocena);
                const ocena_count = parseInt(item.ocena_count);
                delete item.ocena
                delete item.ocena_count
                if (ocena_count === 0) {
                    item.ocena = 0;
                }else {
                    item.ocena =  Math.round(ocena/ocena_count);
                }
            })

        }
        renderDynamic(uporabnik_id,
            res,
            'layout_pristajlna_stran.hbs',
            'Al dente',
            'menu',
            'menu',
            { menu_items: menu_items }
        );


    } catch (err) {
        console.log(err);
    }

}

const logout = async function (req, res)  {
    console.log("LOGGIN OUT")
    req.session.destroy();
    res.status(200).json({});
}

module.exports = {
    index,
    onas,
    rezerviraj,
    rezerviraj_podatki,
    rezerviraj_menu,
    menu,
    logout
}
