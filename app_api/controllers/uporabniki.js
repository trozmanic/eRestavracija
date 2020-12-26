const mongoose=require("mongoose");
const Uporabnik = mongoose.model("Uporabnik");
const Gost = mongoose.model("Gost");
const Zaposleni = mongoose.model("Zaposlen");
var ObjectId = require('mongoose').Types.ObjectId;

/*const ustvariUporabnika=async (req,res)=>{
    try {
        let uporabnik = req.body;
        console.log(uporabnik);
        if (!uporabnik.vloga) {
            uporabnik.vloga=  "gost";
        }
        const vlogaShema = uporabnik.vloga === 'gost' ? Gost : Zaposleni;

        const uporabnik_model = new Uporabnik(uporabnik);
        const vlogaModel = new vlogaShema({"id_uporabnika":uporabnik_model._id});
        uporabnik_model.id_vloga_info = vlogaModel._id;

        //Every register user is considered to be gost so we add gostModel to DB if there is no
        //vloga specified
        await uporabnik_model.save();
        await vlogaModel.save();
        res.status(200).json(uporabnik_model);
    }catch (err) {
        console.log(err);
        res.status(500).json({"error_message": err});
    }
}*/

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


const posodbiUporabnika= async (req,res)=>{
    console.log(req.body);
    try {
        const user = req.body;
        console.log(req.body.id);
        if (!user.id) {
            return res.status(400).send({"error_message": "Specify user ID"});
        }
        await Uporabnik.findByIdAndUpdate(user.id, user).exec();

        return res.status(200).send(user);
    }catch (err) {
        console.log(err);
        res.send({"error_message":err});
    }
}

const izbrisiUporabnika = async (req,res) => {
    try {
        const id = req.params.idUporabnika;
        if (!id) {
            return res.status(400).send({"error_message": "Specify user ID"})
        }
        const uporabnik = await Uporabnik.findByIdAndDelete(id);
        if (uporabnik == null) {
            return res.status(204).send({"error_message": "No user ID: " + id})
        }
        const role = uporabnik.vloga;
        const id_vloga_info = uporabnik.id_vloga_info;
        //Reference to object is present in DB, we delete it!
        if (id_vloga_info) {
            const model_vloga = role === "gost"? Gost : Zaposleni;
            const vloga = await model_vloga.findByIdAndDelete(id_vloga_info);
            console.log(vloga);
        }
        res.status(200).send({id});
    }catch (err) {
        console.log(err)
        res.status(500).send({"error_message":err})
    }
}

module.exports={
    pridobiUporabnike,
    pridobiUporabnika,
    //ustvariUporabnika,
    posodbiUporabnika,
    izbrisiUporabnika
}
