const mongoose=require("mongoose");
const Gost = mongoose.model("Gost");
var ObjectId = require('mongoose').Types.ObjectId;



const pridobiGosta = async (req, res) => {
    try {
        const id = req.params.idUporabnika;
        if (!id) {
            return res.status(400).send({"error_message": "Specify user ID"})
        }
        const gost = await Gost.find({id_uporabnika:id});
        return res.status(200).send(gost[0]);
    }catch (err) {
        res.status(500).json({"error_message": err});
    }
}


module.exports = {
    pridobiGosta
}
