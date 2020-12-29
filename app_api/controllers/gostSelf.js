const atob = require('atob');
const mongoose = require('mongoose');
const Jed = mongoose.model("MeniItem");
const Uporabnik = mongoose.model('Uporabnik');
const Gost = mongoose.model('Gost');

const pridobiMeni = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = JSON.parse(atob(token.split('.')[1]));
    const jedi =  await Jed.find({}).exec();

    try {
        let meniRenderData = [];
        const gost = await Gost.findOne({"id_uporabnika": user._id});
        const gostJedi = gost.ocenjene_jedi;
        jedi.forEach((jed) => {
            let obj = jed;
            let appears = false;
            let jedID = jed._id.toString();
            gostJedi.forEach((ocenjenaJed) => {
                let ocenjenaJedId = ocenjenaJed._id.toString();
                if (jedID === ocenjenaJedId) {
                    appears = true;
                }
            })
            obj.ocenjena = appears;
            console.log({...jed})
            meniRenderData.push({
                ...jed.toObject(),
                "ocenjena": appears
            });
        })
        res.status(200).send(meniRenderData);
    }catch (err) {
        res.status(500).send({
            "error": "Napaka na strezniku"
        })
    }
}

module.exports = {
    pridobiMeni
}
