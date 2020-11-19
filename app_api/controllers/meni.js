const mongoose=require("mongoose");
const Jed = mongoose.model("MeniItem");
const Surovina = mongoose.model("Surovina");

let ObjectId = require('mongoose').Types.ObjectId;

const pridobiJedi = async (req,res) => {
    try {
        const jedi =  await Jed.find({}).exec;
        return res.status(200).json(jedi);
    }catch (e) {
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

    }catch (e) {
        console.log(err);
        res.status(500).json({"error_message": err});
    }
}

const ustvariJed = async (req,res) => {
    try {
        const jed = req.body;
        if (!jed.sestavine) {

        }
    }catch (e) {

    }
}

const posodobiJed = async (req,res) => {

}

const izbrisiJed = async (req,res) => {

}

module.exports = {
    pridobiJedi,
    pridobiJed,
    ustvariJed,
    posodobiJed,
    izbrisiJed
}
