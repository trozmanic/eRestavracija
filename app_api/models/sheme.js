const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uporabnikShema = new mongoose.Schema({
    "ime": { type: String, required: true },
    "email_naslov": {
        type: String, unique: true, required: true, validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            }
        }
    },
    "telefonska_stevilka": {
        type: String, required: true, validate: {
            validator: function (v) {
                return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(v);
            }
        }
    },
    "geslo": { type: String, required: true },
    "vloga": { type: String, enum: ['admin', 'kuhar', 'natakar', 'gost'] },
    "id_vloga_info": { type: mongoose.ObjectId, required: true }
})

const zaposleniShema = new mongoose.Schema({
    "id_uporabnika" :{type:mongoose.ObjectId},
    "placa": { type: Number, min: 0 }
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
        surovina: { type: surovinaShema, },
        kolicina: { type: Number, min: 0 }
    })]
})

const narociloShema = new mongoose.Schema({
    natakar: { type: zaposleniShema },
    datum_in_ura: { type: Date, required: true, default: Date.now },
    meni_items: [new mongoose.Schema({
        meni_item: { type: mongoose.ObjectId, required: true },
        kolicina: { type: Number, required: true }
    })],
    cena: { type: Number, required:true },
    stanje: { type: String, required:true, enum: ['sprejeto', 'v pripravi', 'pripravljeno', 'postrezeno', 'placano'], default:'sprejeto' },
    miza: { type: Number}
})

const rezervacijaShema = new mongoose.Schema({
    datum: { type: Date, default: Date.now },
    narocilo: { type: mongoose.ObjectId },
    stanje: { type: String, default: "caka" },
    st_oseb: { type: String }
})


const gostShema = new mongoose.Schema({
    id_uporabnika: { type: mongoose.ObjectId },
    rezervacije: [rezervacijaShema],
    ocenjene_jedi: [meniItemShema]
})

const urnikShema = new mongoose.Schema({
    id_uporabnika: {type: mongoose.ObjectId},
    dnevi: [{
        type: String, required: true, validate: {
            validator: function (v) {
                if (v && (v.localeCompare("") == 0 || v.localeCompare(" ") == 0 || v.localeCompare("?") == 0)) {
                    return true;
                }
                return /^\b[p|d]{1}\b$/.test(v);
            }
        }
    }],
    leto: {
        type: Number, required: true, validate: {
            validator: function (v) {
                if (v > 1900 && v < 2100) {
                    return true;
                }
                return false;
            }
        }
    },
    mesec: {
        type: Number, required: true, validate: {
            validator: function (v) {
                if (v >= 0 && v < 12) {
                    return true;
                }
                return false;
            }
        }
    },
    st_dni: {
        type: Number, required: true, validate: {
            validator: function (v) {
                if (v >= 28 && v < 32) {
                    return true;
                }
                return false;
            }
        }
    },
    zac_dan: {
        type: String, required: true, validate: {
            validator: function (v) {
                return /^\b[pon|tor|sre|cet|pet|sob|ned]{3}\b$/.test(v);
            }
        }
    }
})


mongoose.model("Uporabnik", uporabnikShema, "Uporabnik");
mongoose.model("Gost", gostShema, "Gosti");
mongoose.model("Rezervacija", rezervacijaShema, "Rezervacije");
mongoose.model("Narocilo", narociloShema, "Narocila");
mongoose.model("MeniItem", meniItemShema, "MeniItems");
mongoose.model("Surovina", surovinaShema, "Surovine");
mongoose.model("Zaposlen", zaposleniShema, "Zaposleni");
mongoose.model("Urnik", urnikShema, "Urniki");
