const mongoose=require("mongoose");
const Uporabnik = mongoose.model("Uporabnik");
const Gost = mongoose.model("Gost");
var ObjectId = require('mongoose').Types.ObjectId;

const ustvariUporabnika=async (req,res)=>{
    try {
        let uporabnik = req.body;
        console.log(uporabnik);
        uporabnik.vloga=  "gost";
        const uporabnik_model = new Uporabnik(uporabnik);
        const gost_model = new Gost({"id_uporabnika":uporabnik_model._id});
        uporabnik_model.id_vloga_info = gost_model._id;

        //Every register user is considered to be gost so we add gostModel to DB
        await uporabnik_model.save();
        await gost_model.save();
        res.status(200).json(uporabnik);
    }catch (err) {
        console.log(err);
        res.status(500).json({"error_message": err});
    }
}

const pridobiUporabnike=async (req,res)=>{
    let email = req.query.email;
    let uporabnik_info = {};
    if (email) {
        uporabnik_info.email_naslov = email;
    }
    try {
        const uporabniki = await Uporabnik.find(uporabnik_info).exec();
        res.status(200).json(uporabniki);
    }catch (err) {
        console.log(err);
        res.status(500).json({"error_message": err});
    }
}

const pridobiUporabnika=async (req,res)=>{
    try {
        if (!req.params.idUporabnika) {
            return res.status(400).send({"error_message": "Specify user ID"});
        }

        const uporabnik = await Uporabnik.findById(req.params.idUporabnika).exec();

        if (!uporabnik) {
            return res.status(404).send({"error_message": "No user ID: "+req.params.idUporabnika});
        }
        return res.status(200).send(uporabnik);
    }catch (err) {
        res.send({"error_message": err});
    }
}


const posodbiUporabnika=(req,res)=>{

}

module.exports={
    pridobiUporabnike,
    pridobiUporabnika,
    ustvariUporabnika,
    posodbiUporabnika
}
