const mongoose = require("mongoose");
const Rezervacija = mongoose.model("Rezervacija");
const Uprabnik = mongoose.model("Uporabnik");
const Gost=mongoose.model("Gost");

const ustvariRezervacijo = function (req, res) {
    console.log(req.body);

    let datum_in_ura=req.body.datum_in_ura;
    let stOseb=req.body.stOseb;
    let jedi=req.body.jedi;
    let uporabnik_id = req.body.uporabnik_id;

    let errors=[];
    if(datum_in_ura=null) errors.push("ure in datuma");
    if(stOseb=null) errors.push("stevila oseb");

    if (errors.length==0 && uporabnik_id) {
        Uprabnik.findById(uporabnik_id).select("id_vloga_info").exec((napaka, uporabnik) => {
            if (napaka) {
                res.status(400).json(napaka)
            }else if(!uporabnik.id_vloga_info){
                res.status(404).json({"sporocilo":"Uporabnika ni mogoče najti"});
            }else{
                Gost.findById(uporabnik.id_vloga_info).exec((napaka,gost)=>{
                    if (napaka) {
                        res.status(400).json(napaka)
                    }else{
                        gost.rezervacije.push({
                            narocilo:{
                                datum: new Date(datum_in_ura),
                                stanje:"rezervacija",
                            }
                        })
                    }
                });
            }
        });
    }else{
        if(!uporabnik_id){
            res.status(400).json({"sporocilo":"ID uporabnika je obvezen parameter"});
        }else{
            res.status(400).json({"sporocilo":"Težava pri branju"+errors.join(", ")});
        }
    }

}

module.exports = {
    ustvariRezervacijo
}