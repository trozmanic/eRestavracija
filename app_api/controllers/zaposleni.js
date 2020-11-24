const mongoose=require("mongoose");
const Uporabnik = mongoose.model("Uporabnik");
const Zaposleni = mongoose.model("Zaposlen");

const pridobiZaposlenega = (req, res) => {

}
const ustvariZaposlenega = (req, res) => {
    try {
        //preveri ce uporavnik obstaja
        var id = req.query.uporabnik_id;
        var placa = req.query.placa;
        if (id && placa) {
            //preveri ce ta uporabnik obstaja
            Uporabnik.findById(id).exec((napaka, uporabnik) => {
                    if (!uporabnik) {
                        return res.status(404).json({
                            "error_message": "Ne najdem uporabnika z id da bi ga naredil zaposlenega."
                        });
                    } else if (napaka) {
                        return res.status(500).json(napaka);
                    }
                    //imamo uporabnika naredi zaposlenega
                    Zaposleni.create({
                        id_uporabnika: id,
                        placa: placa,
                        }, (napaka2, zaposleni) => {
                        if (napaka2) {
                            res.status(400).json(napaka2);
                        } else {
                            res.status(201).json(zaposleni);
                        }
                    });
            });
        } else {
            return res.status(400).send({"error_message": "ID ali placa manka"})
        }
    }catch (err) {
        res.status(500).json({"error_message": err});
    }
}
const posodobiZaposlenega = (req, res) => {

}

module.exports = {
    pridobiZaposlenega,
    ustvariZaposlenega,
    posodobiZaposlenega
}
