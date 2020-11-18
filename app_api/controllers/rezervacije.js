const mongoose = require("mongoose");
const Rezervacija = mongoose.model("Rezervacija");
const Uprabnik = mongoose.model("Uprabnik")

const ustvariRezervacijo = function (req, res) {
    let uporabnik_id = req.body.uporabnik_id;
    if (uporabnik_id) {
        Uprabnik.findById().select("id_vloga_info").exec((napaka, uporabnik) => {
            if (napaka) {
                res.status(400).json(napaka)
            } else if (!uporabnik.id_vloga_info){
                console.log(uporabnik);
            }
        });
    }else{
        res.status(400).json({"sporocilo":"ID uporabnika je obvezen parameter"});
    }

}

module.exports = {
    ustvariRezervacijo
}