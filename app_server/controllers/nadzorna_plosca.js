const fs = require('fs');
const path = require('path');
const util = require('util')
var apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)
};

if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://aldente-sp-20-21.herokuapp.com';
}

const axios = require('axios').create({
    baseURL: apiParametri.streznik,
    timeout: 5000
});
const narocilaService = require('../service/narocila');

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
    var id_u = req.session.uporabnik_id;
    var vloga = req.session.vloga;
    var u_ime = req.session.ime;
    if (!id_u) {
        res.render('error', { layout: 'layout_nadzorna_plosca', message: "Potrebna prijava" });
    }
    res.render('nadzorna_plosca_menu', { layout: 'layout_nadzorna_plosca.hbs', title: 'Nadzorna plošča', zaposleni_role: vloga, uporabnik_id: id_u, u_ime: u_ime });
}

const rezervacije = function (req, res) {

    var id_u = req.session.uporabnik_id;
    var vloga = req.session.vloga;
    var u_ime = req.session.ime;

    let uporabnik_id = req.session.uporabnik_id;
    let uporabnik_ime = req.session.ime;
    if (uporabnik_id)
        axios.get('/api/rezervacija').then((rezervacije) => {
            axios.get('/api/meni').then((meni) => {
                let caka = rezervacije.data.filter(el => el.stanje == 'caka');
                let potrjene = rezervacije.data.filter(el => el.stanje == 'potrjena');
                res.render('nadzorna_plosca_rezervacije', { layout: 'layout_nadzorna_plosca.hbs', title: 'Nadzorna plošča - Rezervacije', caka: caka, potrjene: potrjene, meni: meni.data, zaposleni_role: vloga, uporabnik_id: id_u, uporabnik_ime: uporabnik_ime, u_ime: u_ime })
            }).catch((napaka) => {
                console.log(napaka);
            })
        }).catch((napaka) => {
            console.log(napaka);
        })
    else {
        res.render('error', { layout: 'layout_nadzorna_plosca', message: "Potrebna prijava" });
    }
}

const prikaziUrnik = function (req, res, urnik, sporocilo) {
    if (sporocilo) {
        res.render('error', { layout: 'layout_nadzorna_plosca.hbs', title: 'Napaka', zaposleni_role: req.query.vloga, message: sporocilo });
    } else {
        res.render('nadzorna_plosca_urnik', {
            layout: 'layout_nadzorna_plosca.hbs',
            title: 'Nadzorna plošča - Urnik',
            zaposleni_role: req.session.vloga,
            urnik: urnik.dnevi,
            leto: urnik.leto,
            mesec: urnik.mesec,
            zac_dan: urnik.zac_dan,
            uporabnik_id: req.session.uporabnik_id,
            st_dni: urnik.st_dni,
            u_ime: req.session.ime
        });
    }
}
const prikaziZasluzek = function (req, res, urnik, sporocilo) {
    if (sporocilo) {

        var mesec = req.query.mesec;
        var leto = req.query.leto;

        var dan = new Date();
        if (!mesec || mesec > 11 || mesec < 0) {
            mesec = dan.getMonth();
        }
        if (!leto || leto > 2099 || leto < 1901) {
            leto = dan.getFullYear();
        }

        res.render('nadzorna_plosca_zasluzek2', {layout:'layout_nadzorna_plosca.hbs',
            title: 'Nadzorna plošča - Zasluzek',
            zaposleni_role:req.session.vloga,
            leto:leto,
            mesec:mesec,
            uporabnik_id:req.session.uporabnik_id,
            u_ime: req.session.ime,
            sporocilo:sporocilo
        });

    } else {
        res.render('nadzorna_plosca_zasluzek', {
            layout: 'layout_nadzorna_plosca.hbs',
            title: 'Nadzorna plošča - Zasluzek',
            zaposleni_role: req.session.vloga,
            urnik: urnik.dnevi,
            leto: urnik.leto,
            mesec: urnik.mesec,
            zac_dan: urnik.zac_dan,
            uporabnik_id: req.session.uporabnik_id,
            st_dni: urnik.st_dni,
            ostevilceni_dnevi: { osi: urnik.ostevilceni_dnevi },
            zasluzek_dnevi: { podatki: urnik.zasluzek_dnevi },
            skupno_prilivi: urnik.skupno_prilivi,
            tabele_placanil: urnik.tabele_placanil,
            tabele_ne_placanil: urnik.tabele_ne_placanil,
            zaposleni_strosek: urnik.zaposleni_strosek,
            u_ime: req.session.ime
        });
    }
}
const zasluzek = function (req, res) {
    var id_u = req.session.uporabnik_id;
    var vloga = req.session.vloga;
    var u_ime = req.session.ime;
    if (!id_u) {
        res.render('error', { layout: 'layout_nadzorna_plosca', message: "Potrebna prijava" });
    }

    var id = req.query.uporabnik_id;
    var mesec = req.query.mesec;
    var leto = req.query.leto;
    if (mesec && leto) {
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
const zasluzel_brisi_racun = function (req, res) {
    var id = req.params.id;

    var id_u = req.session.uporabnik_id;
    var vloga = req.session.vloga;
    var u_ime = req.session.ime;
    if (!id_u) {
        res.render('error', { layout: 'layout_nadzorna_plosca', message: "Potrebna prijava" });
    }

    if (id) {
        axios.delete('/api/narocila/' + id, {
        })
            .then((odgovor) => {
                zasluzek(req, res);
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.sporocilo) {
                    prikaziZasluzek(req, res, [], error.response.data.sporocilo);
                } else {
                    prikaziZasluzek(req, res, [], "Napaka brisanja racuna.");
                }
            });
    } else {
        prikaziZasluzek(req, res, [], "Ni podan id za brisat racun.");
    }
}
const urnik = function (req, res) {

    var id_u = req.session.uporabnik_id;
    var vloga = req.session.vloga;
    var u_ime = req.session.ime;
    if (!id_u) {
        res.render('error', { layout: 'layout_nadzorna_plosca', message: "Potrebna prijava" });
    }

    var id = req.session.uporabnik_id;
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
const seznamZaloge = (req, res) => {
    axios
        .get('/api/zaloga')
        .then((odgovor) => {
            zaloga(req, res, odgovor.data);
        });
};

const zaloga = function (req, res, seznamSestavin) {
    var id_u = req.session.uporabnik_id;
    var vloga = req.session.vloga;
    var u_ime = req.session.ime;
    if (!id_u) {
        res.render('error', { layout: 'layout_nadzorna_plosca', message: "Potrebna prijava" });
    }

    const idUporabnika = req.session.id;
    if (!idUporabnika) {
        return res.render("404 NOT FOUND");
    }
    try {
        res.render('nadzorna_plosca_zaloga', {
            layout: 'layout_nadzorna_plosca.hbs',
            title: 'Nadzorna plošča - Zaloga',
            sestavine: seznamSestavin,
            zaposleni_role: vloga,
            uporabnik_id: id_u,
            u_ime: u_ime
        })
    } catch (err) {
        console.log(err);
        res.render("error");
    }
}

//ZAPOSLENI
const seznamZaposlenih = (req, res) => {
    axios
        .get('/api/zaposleni')
        .then((odgovor) => {
            zaposleni(req, res, odgovor.data);
        });
};

const zaposleni = function (req, res, seznam) {
    var id_u = req.session.uporabnik_id;
    var vloga = req.session.vloga;
    var u_ime = req.session.ime;
    if (!id_u) {
        res.render('error', { layout: 'layout_nadzorna_plosca', message: "Potrebna prijava" });
    }
    try {
        res.render('nadzorna_plosca_zaposleni', {
            layout: 'layout_nadzorna_plosca.hbs',
            title: 'Nadzorna plošča - Zaposleni',
            zaposleni: seznam,
            zaposleni_role: req.query.vloga,
            uporabnik_id: req.query.uporabnik_id
        })
    } catch (err) {
        console.log(err);
        res.render("error");
    }
}


const strezba = async function (req, res) {

    var id_u = req.session.uporabnik_id;
    var vloga = req.session.vloga;
    var u_ime = req.session.ime;
    if (!id_u) {
        res.render('error', { layout: 'layout_nadzorna_plosca', message: "Potrebna prijava" });
    }


    const idUporabnika = req.session.uporabnik_id;
    console.log("iz seje " + idUporabnika)
    if (!idUporabnika) {
        res.render('error', { layout: 'layout_nadzorna_plosca', message: "Ni uporabnika." });
    }
    try {
        let narocila = await axios.get(apiParametri.streznik + "/api/narocila");
        console.log(narocila);
        try {
            const natakarData = await narocilaService.prepNatakar(narocila.data, idUporabnika);
            let meni = await axios.get(apiParametri.streznik + "/api/meni");
            console.log(util.inspect(natakarData, false, null, true /* enable colors */))
            res.render('nadzorna_plosca_strezba', {
                layout: 'layout_nadzorna_plosca.hbs',
                title: 'Nadzorna plošča - Strežba',
                zaposleni_role: vloga,
                narocila: natakarData,
                jedi: meni.data,
                uporabnik_id: id_u,
                u_ime: u_ime
            })
        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        res.render('error');
    }
}

const narocila_kuhar = async function (req, res) {

    var id_u = req.session.uporabnik_id;
    var vloga = req.session.vloga;
    var u_ime = req.session.ime;
    if (!id_u) {
        res.render('error', { layout: 'layout_nadzorna_plosca', message: "Potrebna prijava" });
    }


    const idUporabnika = req.session.id;
    if (!idUporabnika) {
        return res.render("404 NOT FOUND");
    }
    try {
        const data = await axios.get(apiParametri.streznik + "/api/narocila");
        const narocila = await narocilaService.prepKuhar(data.data);
        res.render('nadzorna_plosca_kuhar', { layout: 'layout_nadzorna_plosca.hbs', title: 'Nadzorna plošča - Narocila kuhinja', uporabnik_id: id_u, zaposleni_role: vloga, u_ime: u_ime, narocila });
    } catch (err) {
        console.log(err);
        res.render("error");
    }
}

const meni = async function (req, res) {

    var id_u = req.session.uporabnik_id;
    var vloga = req.session.vloga;
    var u_ime = req.session.ime;
    if (!id_u) {
        res.render('error', { layout: 'layout_nadzorna_plosca', message: "Potrebna prijava" });
    }

    try {
        const meniItems = await axios.get(apiParametri.streznik + "/api/meni");
        res.render('nadzorna_plosca_meni',
            { layout: 'layout_nadzorna_plosca.hbs', title: 'Al dente', izbrano_ime: 'menu', menu_items: meniItems.data, uporabnik_id: id_u, zaposleni_role: vloga, u_ime: u_ime });
    } catch (err) {
        console.log(err);
        res.render('error');
    }
}

const admin = async function (req, res) {
    try {
        res.render('admin',
            { layout: 'layout_nadzorna_plosca.hbs', title: 'Al dente', izbrano_ime: 'admin' })
    }
    catch (err) {
        res.render('error');
    }
}

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

const odjava = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};

const urnik_prikazi = (zaposleni_id, req,res, urnik, sporocilo) => {
    if (sporocilo) {
        res.render('error', { layout: 'layout_nadzorna_plosca.hbs', title: 'Napaka', zaposleni_role: req.session.vloga, uporabnik_id:req.session.uporabnik_id, u_ime: req.session.ime, message: sporocilo });
    } else {
        res.render('nadzorna_plosca_urnik_list', {
            layout: 'layout_nadzorna_plosca.hbs',
            title: 'Nadzorna plošča - Urnik list',
            zaposleni_role:req.session.vloga,
            uporabnik_id:req.session.uporabnik_id,
            u_ime: req.session.ime,
            urniki:urnik,
            zaposleni_id:zaposleni_id
        });
    }
};

const urnik_uporabnik = (req, res) => {
    ///nadzorna_plosca/urnik/:id
    var id_u = req.session.uporabnik_id;
    var vloga = req.session.vloga;
    var u_ime = req.session.ime;
    if (!id_u) {
        res.render('error',{layout:'layout_nadzorna_plosca',message:"Potrebna prijava"});
    }

    var zasleni_id = req.params.id;
    if (!zasleni_id) {
        res.render('error',{layout:'layout_nadzorna_plosca',message:"Ni zaposleni id"});
    }


    axios.get('/api/urnik/' + zasleni_id)
        .then((odgovor) => {
            urnik_prikazi(zasleni_id, req, res, odgovor.data);
        })
        .catch((error) => {
            if (error.response && error.response.data && error.response.data.sporocilo) {
                urnik_prikazi(zasleni_id, req, res, [], error.response.data.sporocilo);
            } else {
                urnik_prikazi(zasleni_id, req, res, [], "Napaka API-ja pri iskanju urnikov zaposlenega.");
            }
        });
};

const urnik_brisi = (req, res) => {
    ///nadzorna_plosca/urnik/:id/delete/:id_urnik
    var id_u = req.session.uporabnik_id;
    var vloga = req.session.vloga;
    var u_ime = req.session.ime;
    if (!id_u) {
        res.render('error',{layout:'layout_nadzorna_plosca',message:"Potrebna prijava"});
    }

    var urnik_id = req.params.id_urnik;
    if (!urnik_id) {
        res.render('error',{layout:'layout_nadzorna_plosca',message:"Ni urnik_id"});
    }

    var zasleni_id = req.params.id;
    if (!zasleni_id) {
        res.render('error',{layout:'layout_nadzorna_plosca',message:"Ni zaposleni id"});
    }


    axios.delete('/api/urnik?id=' + urnik_id)
        .then((odgovor) => {
            axios.get('/api/urnik/' + zasleni_id)
                .then((odgovor2) => {
                    urnik_prikazi(zasleni_id, req, res, odgovor2.data);
                })
                .catch((error2) => {
                    if (error2.response && error2.response.data && error2.response.data.sporocilo) {
                        urnik_prikazi(zasleni_id, req, res, [], error2.response.data.sporocilo);
                    } else {
                        urnik_prikazi(zasleni_id, req, res, [], "Napaka API-ja pri iskanju urnikov zaposlenega.");
                    }
                });
        })
        .catch((error) => {
            if (error.response && error.response.data && error.response.data.sporocilo) {
                urnik_prikazi(zasleni_id, req, res, [], error.response.data.sporocilo);
            } else {
                urnik_prikazi(zasleni_id, req, res, [], "Napaka API-ja pri brisanju urnika");
            }
        });

};

const urnik_edit = (req, res) => {
    ///nadzorna_plosca/urnik/:id/edit/:id_urnik
    var id_u = req.session.uporabnik_id;
    var vloga = req.session.vloga;
    var u_ime = req.session.ime;
    if (!id_u) {
        res.render('error',{layout:'layout_nadzorna_plosca',message:"Potrebna prijava"});
    }


};

const urnik_create = (req, res) => {
    ///nadzorna_plosca/urnik/:id/create
    var id_u = req.session.uporabnik_id;
    var vloga = req.session.vloga;
    var u_ime = req.session.ime;
    if (!id_u) {
        res.render('error',{layout:'layout_nadzorna_plosca',message:"Potrebna prijava"});
    }


};


module.exports = {
    menu,
    rezervacije,
    urnik,
    seznamZaloge,
    zaloga,
    seznamZaposlenih,
    zaposleni,
    narocila_kuhar,
    meni,
    strezba,
    zasluzek,
    zasluzel_brisi_racun,
    admin,
    odjava,
    urnik_uporabnik,
    urnik_brisi,
    urnik_edit,
    urnik_create
}
