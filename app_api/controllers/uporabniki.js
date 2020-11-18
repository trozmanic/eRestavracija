const mongoose=require("mongoose");
const Uporabnik = mongoose.model("Uporabnik");

const ustvariUporabnika=async (req,res)=>{
    try {
        const uporabnik = req.body;

    }catch (err) {

    }
}

const pridobiUporabnike=async (req,res)=>{
    try {
        const uporabniki = await Uporabnik.find({}).exec();
        req.status(200).send(uporabniki);
    }catch (err) {
        res.send({"error_message": err});
    }
}

const pridobiUporabnika=async (req,res)=>{
    try {
        if (!req.params.id) {
            return res.status(400).send({"error_message": "Specify user ID"})
        }
        const uporabnik = await Uporabnik.findById(req.params.id).exec();
        if (!uporabnik) {
            return res.status(404).send({"error_message": "No user with such ID"})
        }
        return res.status(200).send(uporabnik);
    }catch (err) {
        res.send({"error_message": err})
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
