const mongoose=require("mongoose");
const Jed = mongoose.model("MeniItem");
const Surovina = mongoose.model("Surovina");
const Gost = mongoose.model("Gost");
let ObjectId = require('mongoose').Types.ObjectId;

const pridobiJedi = async (req,res) => {
    try {
        const jedi =  await Jed.find({}).exec();
        return res.status(200).json(jedi);
    }catch (err) {
        console.log(err);
        res.status(500).json({"error_message": err});
    }
}

const pridobiJed = async (req,res) => {
    try {
        const id = req.params.idJedi;
        if (!id) {
            return res.status(400).json({error_message: "Specify user id"});
        }
        const jed = await Jed.findById(id);
        if (!jed) {
            return res.status(404).json({error_message: "No meniItem with given id"});
        }
        return res.status(200).json(jed);

    }catch (err) {
        console.log(err);
        res.status(500).json({"error_message": err});
    }
}

const ustvariJed = async (req,res) => {
    try {
        const jed = req.body;
        const novaJed = new Jed (jed);
        await novaJed.save();
        res.status(200).json(novaJed);
    }catch (err) {
        console.log(err);
        res.status(500).json({"error_message": err});
    }
}

const posodobiJed = async (req,res) => {

    try {
        const jedUpdate = req.body;
        if (!jedUpdate.id) {
            return res.status(400).json({error_message: "Specify ID"});
        }
        const jed = await Jed.findByIdAndUpdate(jedUpdate.id, jedUpdate, {new: true});

        res.status(200).json(jed);
    }catch (err) {
        res.status(500).json({error_message: err});
    }

}

const izbrisiJed = async (req,res) => {
    try {
        const id = req.params.idJedi;
        if (!id) {
            return res.status(400).json({error_message: "Specify user id"});
        }
        await Jed.findByIdAndDelete(id);
        res.status(200).json({});
    }catch (err) {
        res.status(500).json({error_message: err});
    }
}

//Maybe add transaction here !
const dodajOceno = async (req, res) => {
    try  {
        const ocena = parseInt(req.body.ocena);
        const id_jedi = req.body.id;
        const id_uporabnika = req.body.id_uporabnika;
        console.log (req.body);
        let jed = await Jed.findById(id_jedi);
        jed.ocena += ocena;
        jed.ocena_count += 1;
        const gost = await Gost.findOne({id_uporabnika:id_uporabnika});
        gost.ocenjene_jedi.push(jed);

        await Gost.findOneAndUpdate({id_uporabnika:id_uporabnika}, gost);
        await Jed.findByIdAndUpdate(id_jedi, jed);


        res.status(200).send(jed);
    }catch (err) {
        console.log(err);
        res.status(500).json({"error_message": err});
    }
}

module.exports = {
    pridobiJedi,
    pridobiJed,
    ustvariJed,
    posodobiJed,
    izbrisiJed,
    dodajOceno
}
