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
const narocilaService = require('../service/narocila');
const zalogaService = require("../service/zaloga");

const ime_priimek_uporabnik = function (id) {
    axios.get('/api/uporabniki/' + id, {
        params: {
        }
    })
        .then((odgovor) => {
            return odgovor.data.ime;
        })
        .catch(() => {
            return "Napaka uporabnika";
        });
}

const menu = function (req, res) {
    res.render('nadzorna_plosca_menu', { layout: 'layout_nadzorna_plosca.hbs', title: 'Nadzorna plošča', zaposleni_role: req.query.vloga, uporabnik_id: req.query.uporabnik_id });
}

const rezervacije = function (req, res) {
    axios.get('/api/rezervacija').then((rezervacije) => {
        axios.get('/api/meni').then((meni) => {
            let caka = rezervacije.data.filter(el => el.stanje == 'caka');
            let potrjene = rezervacije.data.filter(el => el.stanje == 'potrjena');
            res.render('nadzorna_plosca_rezervacije', { layout: 'layout_nadzorna_plosca.hbs', title: 'Nadzorna plošča - Rezervacije', caka: caka, potrjene: potrjene, meni:meni.data, zaposleni_role: req.query.vloga, uporabnik_id: req.query.uporabnik_id })
        }).catch((napaka) => {
            console.log(napaka);
        })
    }).catch((napaka) => {
        console.log(napaka);
    })
}

const prikaziUrnik = function (req, res, urnik, sporocilo) {
    if (sporocilo) {
        res.render('error', { layout: 'layout_nadzorna_plosca.hbs', title: 'Napaka', zaposleni_role: req.query.vloga, message: sporocilo });
    } else {
        res.render('nadzorna_plosca_urnik', {
            layout: 'layout_nadzorna_plosca.hbs',
            title: 'Nadzorna plošča - Urnik',
            zaposleni_role: req.query.vloga,
            urnik: urnik.dnevi,
            leto: urnik.leto,
            mesec: urnik.mesec,
            zac_dan: urnik.zac_dan,
            uporabnik_id: urnik.id_uporabnika,
            st_dni: urnik.st_dni
        });
    }
}
const prikaziZasluzek=function(req,res, urnik, sporocilo){
    if (sporocilo) {
        res.render('error',{layout:'layout_nadzorna_plosca.hbs',title:'Napaka',zaposleni_role:req.query.vloga, message:sporocilo});
    } else {
        res.render('nadzorna_plosca_zasluzek', {layout:'layout_nadzorna_plosca.hbs',
            title: 'Nadzorna plošča - Zasluzek',
            zaposleni_role:req.query.vloga,
            urnik:urnik.dnevi,
            leto:urnik.leto,
            mesec:urnik.mesec,
            zac_dan:urnik.zac_dan,
            uporabnik_id:urnik.uporabnik_id,
            st_dni:urnik.st_dni,
            ostevilceni_dnevi: {osi:urnik.ostevilceni_dnevi},
            zasluzek_dnevi: {podatki:urnik.zasluzek_dnevi},
            skupno_prilivi:urnik.skupno_prilivi
        });
    }
}
const zasluzek=function(req,res){
    var id = req.query.uporabnik_id;
    var mesec = req.query.mesec;
    var leto = req.query.leto;
    if (id && mesec && leto) {
        axios.get('/api/zasluzek', {
            params: {
                uporabnik_id: id,
                mesec: mesec,
                leto: leto
            }
        })
            .then((odgovor) => {
                prikaziZasluzek(req, res, odgovor.data);
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.sporocilo) {
                    prikaziZasluzek(req, res, [], error.response.data.sporocilo);
                } else {
                    prikaziZasluzek(req, res, [], "Napaka API-ja pri iskanju zasluzka.");
                }
            });
    } else {
        axios.get('/api/zasluzek', {
            params: {
                uporabnik_id: id
            }
        })
            .then((odgovor) => {
                prikaziZasluzek(req, res, odgovor.data);
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.sporocilo) {
                    prikaziZasluzek(req, res, [], error.response.data.sporocilo);
                } else {
                    prikaziZasluzek(req, res, [], "Napaka API-ja pri iskanju zasluzka.");
                }
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
    } else if (id) {
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

//ZALOGA

const shraniSestavino = (req, res) => {
    console.log("POST metoda");
    var kolicinaEnota = req.body.kolicinaEnota;
    var razdeli = kolicinaEnota.split(" ");
    var kolicina = razdeli[0];
    var enota = razdeli[1];
    axios({
        method: 'post',
        url: '/api/zaloga',
        data: {
            ime: req.body.sestavina,
            kolicina: kolicina,
            enota: enota,
            cena: req.body.cena
        }
    }).then(() => {
        console.log("POST uspesen");
        res.redirect('/zaloga');
    }).catch((napaka) => {
        res.render("Error:"+napaka);
    });
};

const seznamZaloge = (req, res) => {
  axios
    .get('/api/zaloga')
    .then((odgovor) => {
      zaloga(req, res, odgovor.data);
    });
};

const zaloga= function(req,res, seznamSestavin){
    const idUporabnika = req.session.id;
    if (!idUporabnika) {
        return res.render("404 NOT FOUND");
    }
    try {
        //const podatki = await axios.get(apiParametri.streznik + "/api/zaloga");
        //const sestavine = zalogaService.seznamSestavin(podatki.data);
        res.render('nadzorna_plosca_zaloga',{
            layout:'layout_nadzorna_plosca.hbs',
            title:'Nadzorna plošča - Zaloga',
            sestavine: seznamSestavin,
            zaposleni_role:req.query.vloga,
            uporabnik_id:req.query.uporabnik_id
        })
    }catch (err) {
        console.log(err);
        res.render("error");
    }
}

const zaposleni = function (req, res) {
    res.render('nadzorna_plosca_zaposleni', { layout: 'layout_nadzorna_plosca.hbs', title: 'Nadzorna plošča - Zaposleni', zaposleni_role: req.query.vloga, uporabnik_id: req.query.uporabnik_id })
}


const strezba= async function(req,res){
    const idUporabnika = req.session.uporabnik_id;
    console.log("iz seje " + idUporabnika)
    if (!idUporabnika) {
        return res.render("error");
    }
    try {
        let narocila = await axios.get(apiParametri.streznik + "/api/narocila");
        const natakarData = narocilaService.prepNatakar(narocila.data, idUporabnika);
        let meni = await axios.get(apiParametri.streznik + "/api/meni");

        res.render('nadzorna_plosca_strezba', {
            layout: 'layout_nadzorna_plosca.hbs',
            title: 'Nadzorna plošča - Strežba',
            zaposleni_role: req.query.vloga,
            narocila: natakarData,
            jedi: meni.data
        })
    } catch (err) {
        res.render('error');
    }
}

const narocila_kuhar = async function (req, res) {
    const idUporabnika = req.session.id;
    if (!idUporabnika) {
        return res.render("404 NOT FOUND");
    }
    try {
        const data = await axios.get(apiParametri.streznik + "/api/narocila");
        const narocila = narocilaService.prepKuhar(data.data);
        res.render('nadzorna_plosca_kuhar', { layout: 'layout_nadzorna_plosca.hbs', title: 'Nadzorna plošča - Narocila kuhinja', uporabnik_id: req.query.uporabnik_id, zaposleni_role: req.query.vloga, narocila });
    } catch (err) {
        console.log(err);
        res.render("error");
    }
}

const meni = async function (req, res) {
    try {
        const meniItems = await axios.get(apiParametri.streznik + "/api/meni");
        res.render('nadzorna_plosca_meni',
            { layout: 'layout_nadzorna_plosca.hbs', title: 'Al dente', izbrano_ime: 'menu', menu_items: meniItems.data, uporabnik_id: req.query.uporabnik_id, zaposleni_role: req.query.vloga });
    } catch (err) {
        console.log(err);
        res.render('error');
    }
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
module.exports = {
    menu,
    rezervacije,
    urnik,
    seznamZaloge,
    shraniSestavino,
    zaloga,
    zaposleni,
    narocila_kuhar,
    meni,
    strezba,
    zasluzek
}