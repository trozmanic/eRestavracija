const fs = require('fs');
const path = require('path');
const axios = require('axios');
const apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)
};
const meni = require('../service/meni');
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

const renderDynamic = (uporabnik_id, res, layout, title, izbrano_ime, template, obj) => {
    console.log(obj);
    axios.get(apiParametri.streznik + "/api/uporabniki/" + uporabnik_id)
        .then((response) => {
            return res.render(template, {layout, title, izbrano_ime, uporabnik:response.data, dynamicData:obj})
        })
        .catch((err)=> {
            return res.render(template,{layout,title,izbrano_ime});
        })

}


const index=async function(req,res){
    const uporabnik_id = req.query.uporabnik_id;

    if (uporabnik_id) {
        renderDynamic(uporabnik_id,
            res,
            'layout_pristajlna_stran.hbs',
            'Al Dente',
            'index',
            'index_logged');
    }else {
        res.render('index',{layout:'layout_pristajlna_stran.hbs',title:'Al Dente',izbrano_ime:'index'});
    }
}

const onas=function(req,res){
    const uporabnik_id = req.query.uporabnik_id;
    if (uporabnik_id) {
        renderDynamic(uporabnik_id,
            res,
            'layout_pristajlna_stran.hbs',
            'Al Dente - O Nas',
            'onas',
            'onas')
    }
    else {
        res.render('onas',{layout:'layout_pristajlna_stran.hbs',title:'Al Dente - O Nas',izbrano_ime:'onas'});
    }
}

const rezerviraj=function(req,res){
    const uporabnik_id = req.query.uporabnik_id;
    res.render('rezervacija_prva',{layout:'layout_pristajlna_stran.hbs',title:'Al Dente - Rezerviraj',izbrano_ime:'rezerviraj_mizo'});
}

const rezerviraj_podatki=function(req,res){
    const uporabnik_id = req.query.uporabnik_id;
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
        res.render('rezervacija',{layout:'layout_pristajlna_stran.hbs',title:'Al Dente - Rezerviraj',izbrano_ime:'rezerviraj_mizo'})
    }
}

const rezerviraj_menu=function(req,res){
    const uporabnik_id = req.query.uporabnik_id;
    if (uporabnik_id) {
        renderDynamic(uporabnik_id,
            res,
            'layout_pristajlna_stran.hbs',
            'Al Dente - Rezerviraj',
            'rezerviraj_mizo')
    }
    res.render('rezervacija_menu',{layout:'layout_pristajlna_stran.hbs',title:'Al Dente - Rezerviraj',izbrano_ime:'rezerviraj_mizo'})
}

const menu = async function (req, res) {
    const uporabnik_id = req.query.uporabnik_id;
    console.log(uporabnik_id)
    try {
        if (uporabnik_id) {
            const menu_items = await meni.pridobiMeni(uporabnik_id);
            console.log ("menu_items: " +menu_items);
            return renderDynamic(uporabnik_id,
                            res,
                            'layout_pristajlna_stran.hbs',
                            'Al dente',
                            'menu',
                            'menu',
                            {menu_items: menu_items}
                            );
        }
        else {
            res.render('menu', {layout: 'layout_pristajlna_stran.hbs', title:'Al dente', izbrano_ime:'menu', menu_items: []})
        }


    }catch (err) {
        console.log(err);
    }
    // console.log(req.query.uporabnik_id);
    // let pathJSON = path.dirname(require.main.filename).split('/');
    // pathJSON.pop();
    // pathJSON = pathJSON.join('/') + "/public/api_simulation/meni/meni_items.json";
    // read_json(pathJSON)
    //     .then( (data) => {
    //         if (uporabnik_id) {
    //             console.log("da");
    //             const menu_items = data;
    //             return renderDynamic(uporabnik_id,
    //                 res,
    //                 'layout_pristajlna_stran.hbs',
    //                 'Al dente',
    //                 'menu',
    //                 'menu',
    //                 {menu_items: menu_items}
    //                 )
    //         }
    //         res.render('menu', {layout: 'layout_pristajlna_stran.hbs', title:'Al dente', izbrano_ime:'menu', menu_items: data})
    //     })
    //     .catch( (err) => {
    //         console.log(err);
    //         //TODO: implement error handling for exmaple notFound/error page ...
    //         res.render('not_found');
    //     });


}

module.exports={
    index,
    onas,
    rezerviraj,
    rezerviraj_podatki,
    rezerviraj_menu,
    menu
}
