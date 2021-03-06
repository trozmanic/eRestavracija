const passport = require('passport');
const mongoose = require('mongoose');
const Uporabnik = mongoose.model("Uporabnik");
const Gost = mongoose.model("Gost");
const Zaposleni = mongoose.model("Zaposlen");

const registracija =async (req, res) => {
    try {
        let uporabnik = req.body;
        console.log(uporabnik);
        if (!uporabnik.vloga) {
            uporabnik.vloga = "gost";
        }
        const vlogaShema = uporabnik.vloga === 'gost' ? Gost : Zaposleni;

        const uporabnik_model = new Uporabnik(uporabnik);
        const vlogaModel = new vlogaShema({ "id_uporabnika": uporabnik_model._id });
        uporabnik_model.id_vloga_info = vlogaModel._id;
        uporabnik_model.nastaviGeslo(uporabnik.geslo);
        //Every register user is considered to be gost so we add gostModel to DB if there is no
        //vloga specified
        await uporabnik_model.save();
        await vlogaModel.save();
        res.status(200).json({ "token": uporabnik_model.generirajJWT() });
    } catch (err) {
        console.log(err);
        res.status(500).json({ "error_message": err });
    }
}

const kreiraj =async (req, res) => {
    try {
        let uporabnik = req.body;
        console.log(uporabnik);
        if (!uporabnik.vloga) {
            uporabnik.vloga = "gost";
        }
        const vlogaShema = uporabnik.vloga === 'gost' ? Gost : Zaposleni;

        const uporabnik_model = new Uporabnik(uporabnik);
        const vlogaModel = new vlogaShema({ "id_uporabnika": uporabnik_model._id });
        uporabnik_model.id_vloga_info = vlogaModel._id;
        uporabnik_model.nastaviGeslo(uporabnik.geslo);
        //Every register user is considered to be gost so we add gostModel to DB if there is no
        //vloga specified
        await uporabnik_model.save();
        await vlogaModel.save();
        res.status(200).json(uporabnik_model);
    } catch (err) {
        console.log(err);
        res.status(500).json({ "error_message": err });
    }
}

const prijava = (req, res) => {
    console.log(req.body)
    if (!req.body.email_naslov || !req.body.geslo) {
        return res.status(400).json({ "sporočilo": "Zahtevani so vsi podatki" });
    }
    passport.authenticate('local', (napaka, uporabnik, informacije) => {
        if (napaka)
            return res.status(500).json(napaka);
        if (uporabnik) {
            res.status(200).json({ "token": uporabnik.generirajJWT() });
        } else {
            res.status(401).json(informacije);
        }
    })(req, res);
};

const imaVlogo = (allowedRoles) => {
    return (req, res, next) => {
        const user = req.payload;
        if (!user) {
            res.status(401).send({"message": "Neavtoriziran uporabnik"});
        }
        else if (!allowedRoles.includes(user.vloga)){
            res.status(401).send({"message": "Za dostop do vira nimate dovoljenja"});
        }
        else {
            next();
        }
    }
}

module.exports = {
    registracija,
    prijava,
    imaVlogo,
    kreiraj,
    prijava
};
