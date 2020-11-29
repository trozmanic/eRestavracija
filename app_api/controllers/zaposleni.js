const mongoose=require("mongoose");
const Uporabnik = mongoose.model("Uporabnik");
const Zaposleni = mongoose.model("Zaposlen");

const pridobiZaposlene = async (req,res) => {
    try {
        const zaposleni = await Zaposleni.find({}).exec();
        var odgovor = [];
        var id = 0;
        for(var i = 0; i < zaposleni.length; i++){
            id = zaposleni[i].id_uporabnika;
            odgovor.push(await Uporabnik.findById(id).exec());
        }
        
        return res.status(200).json(odgovor);
    }catch (err) {
        console.log(err);
        res.status(500).json({"error_message": err});
    }
}

const pridobiZaposlenega = async (req,res) => {
    try {
        const id = req.params.uporabnik_id;
        if (!id) {
            return res.status(400).json({error_message: "Vnesite id uporabnika"});
        }
        const uporabnik = await Uporabnik.findById(id);
        if (!uporabnik) {
            return res.status(404).json({error_message: "Uporabnik s podanim id-jem ne obstaja"});
        }
        return res.status(200).json(uporabnik);

    }catch (err) {
        console.log(err);
        res.status(500).json({"error_message": err});
    }
}

const ustvariZaposlenega = (req, res) => {
    try {
        //preveri ce uporabnik obstaja
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
const posodobiZaposlenega = async (req, res) => {
    try {
        const id = req.body.uporabnik_id;
        if (!id) {
            return res.status(400).json({error_message: "Vnesite id zaposlenega"});
        }
        const placa = req.body.placa;
        if (!placa) {
            return res.status(400).json({error_message: "Vnesite placo zaposlenega"});
        }
        await Zaposleni.findByIdAndUpdate(id, placa).exec();
        res.status(200).json({});
    }catch (err) {
        res.status(500).json({error_message: err});
    }
}

const izbrisiZaposlenega = async (req,res) => {
    try {
        const id = req.params.uporabnik_id;
        if (!id) {
            return res.status(400).json({error_message: "Vnesite id zaposlenega"});
        }
        await Zaposleni.findOneAndRemove({id_uporabnika:id});
        res.status(204).json({});
    }catch (err) {
        res.status(500).json({error_message: err});
    }
}

module.exports = {
    pridobiZaposlene,
    pridobiZaposlenega,
    ustvariZaposlenega,
    posodobiZaposlenega,
    izbrisiZaposlenega
}