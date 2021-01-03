
const mongoose=require("mongoose");
const Jed = mongoose.model("MeniItem");
const Surovina = mongoose.model("Surovina");
const Gost = mongoose.model("Gost");
const Zaposleni = mongoose.model("Zaposlen");
let ObjectId = require('mongoose').Types.ObjectId;
const Narocila = mongoose.model("Narocilo");
const jwtDecoder = require ('../helpers/jwtDecoder');


const ustvariNarocilo = async (req, res) => {
    const idUporabnika = req.body.id || jwtDecoder.getUser(req.headers.authorization.split(" ")[1])._id;
    const zaposleni = await Zaposleni.findOne({id_uporabnika:idUporabnika}).lean();
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
    const narocilo = new Narocila(req.body);
    console.log(narocilo);
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

const pridobiNarocilo = (req,res)=>{
    Narocila.findById(req.params.idNarocila).exec((napaka,narocilo)=>{
        if(napaka){
            res.status(400).json(napaka);
        }else{
            res.status(200).json(narocilo);
        }
    })
}

const posodobiNarocilo = async (req, res) => {
    console.log(req.body)
    try {
        const id = req.body._id || req.params.idNarocila;
        const narocilo = await Narocila.findByIdAndUpdate(id, {
            "stanje": req.body.stanje
        });
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


const narocilaKuhar = async (req, res) => {
    let retObj = {
        vrsta: [],
        priprava: []
    }
    let narocila = await Narocila.find({$or:[
            {'stanje': 'sprejeto'},
            {'stanje': 'v pripravi'}
        ]}).lean().exec();
    for (let index = 0; index < narocila.length; index ++) {
        const narocilo = narocila[index];
        delete narocilo.__v;
        delete narocilo.natakar.__v;
        for (let indexJedi = 0; indexJedi < narocilo.meni_items.length ; indexJedi ++) {
            const idJedi = narocilo.meni_items[indexJedi].meni_item;
            console.log(idJedi)
            try{
                const meniItem = await Jed.findById(idJedi);
                delete narocila[index].meni_items[indexJedi]._id;
                narocila[index].meni_items[indexJedi] = {
                    _id: meniItem._id,
                    meni_item: meniItem.ime,
                    kolicina: narocila[index].meni_items[indexJedi].kolicina,
                    cena: meniItem.cena,
                    ime: meniItem.ime
                }
            }catch (err) {
                console.log(err);
                const errorMessage = {
                    "ime": "Ni podatkov o jedi"
                }
                narocila[index].meni_items[indexJedi].meni_item = errorMessage
            }
        }

        if (narocilo.stanje === "sprejeto") {
            retObj.vrsta.push(narocilo);
        }
        else if (narocilo.stanje === "v pripravi") {
            retObj.priprava.push(narocilo);
        }
    }
    return res.status(200).send(retObj);
}

const narocilaNatakar = async (req, res) => {

    const idUporabnika = jwtDecoder.getUser(req.headers.authorization.split(" ")[1])._id;
    console.log(idUporabnika)
    let retObj = {
        vrsta: [],
        priprava: [],
        postrezena: []
    }

    let narocila = await Narocila.find({$or:[
            {'stanje': 'sprejeto'},
            {'stanje': 'pripravljeno'},
            {'stanje': 'postrezeno'}
        ]}).lean().exec();

    for (let index = 0; index < narocila.length; index ++) {
        let narocilo = narocila[index];
        delete narocilo.__v;
        delete narocilo.natakar.__v;
        if (idUporabnika && narocilo.natakar) {
            console.log(typeof narocilo.natakar.id_uporabnika.toString(), typeof idUporabnika)
            if (idUporabnika !== narocilo.natakar.id_uporabnika.toString()) {
                continue;
            }
        }
        for (let indexJedi = 0; indexJedi < narocilo.meni_items.length; indexJedi ++) {

            const idJedi = narocilo.meni_items[indexJedi].meni_item;
            try{
                const meniItem = await Jed.findById(idJedi);
                narocila[index].meni_items[indexJedi] = {
                    _id: meniItem._id,
                    meni_item: meniItem.ime,
                    kolicina: narocila[index].meni_items[indexJedi].kolicina,
                    cena: meniItem.cena,
                    ime: meniItem.ime
                };
            }catch (err) {
                console.log(err);
                const errorMessage = {
                    "ime": "Ni podatkov o jedi"
                }
                narocila[index].meni_items[indexJedi].meni_item = errorMessage
            }
        }
        if (narocilo.stanje === "sprejeto") {
            retObj.vrsta.push(narocilo);
        }
        if (narocilo.stanje === "pripravljeno") {
            retObj.priprava.push(narocilo);
        }
        if (narocilo.stanje === "postrezeno") {
            retObj.postrezena.push(narocilo);
        }
    }

    return res.status(200).send(retObj);
}

module.exports = {
    ustvariNarocilo,
    pridobiNarocila,
    posodobiNarocilo,
    izbrisiNarocilo,
    pridobiNarocilo,
    narocilaKuhar,
    narocilaNatakar
}
