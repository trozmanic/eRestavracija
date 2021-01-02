const mongoose = require("mongoose");
const Rezervacija = mongoose.model("Rezervacija");
const Uporabnik = mongoose.model("Uporabnik");
const Gost = mongoose.model("Gost");
const Narocilo = mongoose.model("Narocilo");

const ustvariRezervacijo = function (req, res) {
    let cas = req.body.datum_in_ura;
    let stOseb = req.body.stOseb;
    let jedi = req.body.jedi;
    let uporabnik_id = req.body.uporabnik_id;

    let errors = [];
    if (cas == null) errors.push("ure in datuma");
    if (stOseb < 1) errors.push("stevila oseb");

    if (errors.length == 0 && uporabnik_id) {
        Uporabnik.findById(uporabnik_id).select("id_vloga_info").exec((napaka, uporabnik) => {
            if (napaka) {
                res.status(400).json(napaka)
            } else if (!uporabnik.id_vloga_info) {
                res.status(404).json({ "sporocilo": "Uporabnika ni mogoče najti" });
            } else {
                Gost.findById(uporabnik.id_vloga_info).exec((napaka, gost) => {
                    if (napaka) {
                        res.status(400).json(napaka)
                    } else {
                        let narociloNovo = new Narocilo({
                            datum_in_ura: cas,
                            meni_items: jedi,
                            stanje: "rezervacija"
                        });
                        narociloNovo.save((napaka, narociloNovo) => {
                            if (napaka) {
                                res.status(400).json(napaka)
                            } else {
                                gost.rezervacije.push({ narocilo: narociloNovo._id, st_oseb: stOseb });
                                gost.save((napaka) => {
                                    if (napaka) {
                                        res.status(400).json(napaka)
                                    } else {
                                        res.status(200).json();
                                    }
                                })
                            }
                        })
                    }
                });
            }
        });
    } else {
        if (!uporabnik_id) {
            res.status(400).json({ "sporocilo": "ID uporabnika je obvezen parameter" });
        } else {
            res.status(400).json({ "sporocilo": "težava pri branju " + errors.join(", ") });
        }
    }

}


const pridobiRezervacije = function (req, res) {
    let query = {};
    if (req.params.idUporabnika) {
        console.log(req.params.idUporabnika);
        query = { id_uporabnika: req.params.idUporabnika };
    }
    Gost.find(query).exec((napaka, gosti) => {
        if (napaka) {
            res.status(400).json(napaka);
        } else {
            let rezultat = [];
            let gostiPromise = gosti.map((gost) => {
                return new Promise((resolve, reject) => {
                    Uporabnik.findById(gost.id_uporabnika).exec((napaka, uporabnik) => {
                        if (napaka) {
                            reject(napaka);
                        } else {
                            let rezervacijaPromise = gost.rezervacije.map((rezervacija) => {
                                return new Promise((resolve, reject) => {
                                    Narocilo.findById(rezervacija.narocilo).exec((napaka, rezervacija_narocilo) => {
                                        if (napaka) {
                                            reject(napaka);
                                        } else {
                                            resolve({
                                                _id: rezervacija._id,
                                                id_stranke: gost.id_uporabnika,
                                                ime_stranke: uporabnik.ime,
                                                datum: rezervacija.datum,
                                                stanje: rezervacija.stanje,
                                                st_oseb: rezervacija.st_oseb,
                                                narocilo: rezervacija_narocilo
                                            });
                                        }
                                    })
                                })
                            })
                            Promise.all(rezervacijaPromise).then((rez) => {
                                resolve(rez);
                            }).catch((napaka)=>{
                                reject(napaka);
                            });
                        }
                    })
                })
            })
            Promise.all(gostiPromise).then((rez)=>{
                let rezultat=rez.reduce((prev,cur)=>{
                    prev.push(...cur);
                    return prev;
                },[]);
                rezultat=rezultat.sort((a,b)=>b.datum-a.datum);
                res.status(200).json(rezultat);
            }).catch((napaka)=>{
                res.status(500).json(napaka);
            })
        }
    })
}

const posodobiRezervacijo=function(req,res){
    const allowed=['potrdi','zavrni','preklici',"narocilo"]
    if(allowed.includes(req.params.operacija)){
        console.log(req.params.idRezervacije);
        Gost.find({"rezervacije._id":req.params.idRezervacije}).exec((napaka,gost)=>{
            if(napaka){
                res.status(400).json(napaka);
            }else if(gost==null){
                res.status(400).json("Rezervacije ni mogoče najti");
            }else{
                let rezervacija=gost[0].rezervacije.find(el=>el._id==req.params.idRezervacije);
                if(req.params.operacija=="potrdi"){
                    rezervacija.stanje="potrjena";
                }else if(req.params.operacija=="zavrni"){
                    rezervacija.stanje="zavrnjena";
                }else if(req.params.operacija=="preklici"){
                    rezervacija.stanje="preklicana";
                }else if(req.params.operacija=="narocilo"){
                    rezervacija.stanje="narocilo";
                }
                gost[0].save((napaka)=>{
                    if(napaka){
                        res.status(400).json(napaka);
                    }else{
                        res.status(200).json();
                    }
                })
            }
        })

        res.status(200).json();
    }else{
        res.status(400).json("Nedovoljena operacija");
    }
}

module.exports = {
    ustvariRezervacijo,
    pridobiRezervacije,
    posodobiRezervacijo
}