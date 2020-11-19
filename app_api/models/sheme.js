const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uporabnikShema = new mongoose.Schema({
    "ime": {type:String, required:true},
    "email_naslov": {type:String, unique:true, required:true, validate : {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            }
        }
    },
    "telefonska_stevilka": {type:String, required:true, validate: {
            validator: function (v) {
                return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(v);
            }
        }
    },
    "geslo": {type:String, required:true},
    "vloga": {type:String, enum: ['admin', 'kuhar', 'natakar', 'gost']},
    "id_vloga_info": {type: mongoose.ObjectId, required:true}
})

const zaposleniShema = new mongoose.Schema({
    "id_uporabnika" :{type:mongoose.ObjectId},
    "placa": { type: Number, required: true, min: 0 }
})

const surovinaShema = new mongoose.Schema({
    "ime": { type: String, required: true },
    "kolicina": { type: Number, required: true, min: 0 },
    "enota": { type: String, required: true },
    "cena": { type: Number, required: true, min: 0 }
})

const meniItemShema = new mongoose.Schema({
    ime: { type: String, required: true },
    cena: { type: Number, required: true, min: 0 },
    slika: { type: String },
    opis: { type: String, required: true },
    ocena: { type: Number, default: 0 },
    ocena_count: { type: Number, default: 0 },
    kalorije: { type: Number, required: true, min: 0 },
    sestavine: [new mongoose.Schema({
        surovina: { type: surovinaShema, required:true },
        kolicina: { type: Number, required: true, min: 0 }
    })]
})

const narociloShema = new mongoose.Schema({
    natakar: { type: zaposleniShema, required:true },
    datum_in_ura: { type: Date, required:true, default: Date.now },
    meni_items: [new mongoose.Schema({
        meni_item: { type: meniItemShema, required:true },
        kolicina: { type: Number, required:true }
    })],
    cena: { type: Number, required:true },
    stanje: { type: String, required:true },
    miza: { type: Number, required:true }
})

const rezervacijaShema = new mongoose.Schema({
    datum: { type: Date, required:true },
    narocilo: { type: narociloShema },
    stanje: { type: String, required:true }
})


const gostShema = new mongoose.Schema({
    id_uporabnika :{type: mongoose.ObjectId},
    rezervacije: [rezervacijaShema],
    ocenjene_jedi: [meniItemShema]
})

mongoose.model("Uporabnik", uporabnikShema, "Uporabnik");
mongoose.model("Gost", gostShema, "Gosti");
mongoose.model("Rezervacija", rezervacijaShema, "Rezervacije");
mongoose.model("Narocilo", narociloShema, "Narocila");
mongoose.model("MeniItem", meniItemShema, "MeniItems");
mongoose.model("Surovina", surovinaShema, "Surovine");
mongoose.model("Zaposlen", zaposleniShema, "Zaposleni");
