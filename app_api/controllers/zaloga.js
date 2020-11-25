const mongoose=require("mongoose");
const Surovina = mongoose.model("Surovina");
let ObjectId = require('mongoose').Types.ObjectId;

const pridobiSestavine = async (req,res) => {
    try {
        const sestavine =  await Surovina.find({}).exec();
        return res.status(200).json(sestavine);
    }catch (err) {
        console.log(err);
        res.status(500).json({"error_message": err});
    }
}

const pridobiSestavino = async (req,res) => {
    try {
        const id = req.params.surovinaId;
        if (!id) {
            return res.status(400).json({error_message: "Vnesite id sestavine"});
        }
        const sestavina = await Surovina.findById(id);
        if (!sestavina) {
            return res.status(404).json({error_message: "Sestavina s podanim id-jem ne obstaja"});
        }
        return res.status(200).json(sestavina);

    }catch (err) {
        console.log(err);
        res.status(500).json({"error_message": err});
    }
}

const ustvariSestavino = async (req,res) => {
    try {
        console.log(req.body);
        const sestavina = req.body;
        const novaSestavina = new Surovina (sestavina);
        await novaSestavina.save();
        res.status(201).json(sestavina);
    }catch (err) {
        console.log(err);
        res.status(500).json({"error_message": err});
    }
}

const posodobiSestavino = async (req,res) => {
    try {
        const sestavina = req.body;
        if (!sestavina.id) {
            return res.status(400).json({error_message: "Vnesite id sestavine"});
        }
        await Surovina.findByIdAndDelete(sestavina.id);
        res.status(200).json();
    }catch (err) {
        res.status(500).json({error_message: err});
    }

}

const izbrisiSestavino = async (req,res) => {
    try {
        const id = req.params.surovinaId;
        if (!id) {
            return res.status(400).json({error_message: "Vnesite id sestavine"});
        }
        await Surovina.findByIdAndDelete(id);
        res.status(204).json({});
    }catch (err) {
        res.status(500).json({error_message: err});
    }
}

module.exports = {
    pridobiSestavine,
    pridobiSestavino,
    ustvariSestavino,
    posodobiSestavino,
    izbrisiSestavino
}
