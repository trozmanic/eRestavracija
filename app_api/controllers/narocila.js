const mongoose=require("mongoose");
const Jed = mongoose.model("MeniItem");
const Surovina = mongoose.model("Surovina");
const Gost = mongoose.model("Gost");
const Zaposleni = mongoose.model("Zaposlen");
let ObjectId = require('mongoose').Types.ObjectId;
const Narocila = mongoose.model("Narocilo");


const ustvariNarocilo = async (req, res) => {
    const idUporabnika = req.body.id;
    console.log(idUporabnika);
    const zaposleni = await Zaposleni.findOne({id_uporabnika:idUporabnika});
    if (!zaposleni) {
        return res.status(404).json({"error_message": "No STAFF member with given ID"});
    }
    const meniItems = req.body.meni_items;
    let meni_items = [];
    for (let index = 0; index < meniItems.length ; index ++) {
        let obj = {};
        try {
            const jed = await Jed.findById(meniItems[index].meniItemID);
            if (!jed) {
                return res.status(404).json({"error_message": "Menu item with " + meniItems[index].meniItemID + " does not exist"});
            }
            obj.meni_item = jed;
            obj.kolicina = meniItems[index].kolicina;
            meni_items.push(obj);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({"error_message": err});
        }
    }
    req.body.meni_items = meni_items;
    req.body.natakar = zaposleni;
    console.log(req.body);
    const narocilo = new Narocila(req.body);
    try {
        await narocilo.save();
        res.status(200).json(narocilo);
    }catch (err) {
        return res.status(500).json({"error_message": err});
    }
}

const pridobiNarocila = async (req, res) => {
    try {
        const narocila = await Narocila.find({}).exec();
        return res.status(200).json(narocila);
    }catch (err) {
        return res.status(500).json({"error_message": err});
    }
}

const posodobiNarocilo = async (req, res) => {
    try {
        const id = req.body.id;
        const narocilo = await Narocila.findByIdAndUpdate(id, req.body);
        res.status(200).json(narocilo);
    }catch (err) {
        return res.status(500).json({"error_message": err});
    }
}

const izbrisiNarocilo = async (req, res) => {
    try {
        const id = req.params.id;
        await Narocila.findByIdAndDelete(id);
        res.status(200).json({id});
    }catch (err) {
        return res.status(500).json({"error_message":err});
    }
}

module.exports = {
    ustvariNarocilo,
    pridobiNarocila,
    posodobiNarocilo,
    izbrisiNarocilo
}
