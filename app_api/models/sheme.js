const mongoose = require('mongoose');

const zaposleniShema = new mongoose.Schema({
    "ime": { type: String, required: true },
    "priimek": { type: String, required: true },
    email: {
        type: String, required:true, validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            }
        }
    },
    "telefonska stevilka": { type: String, required: true },
    "vloga": { type: String, required: true },
    "placa": { type: Number, required: true, min: 0 },
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
    ime: { type: String, required:true },
    priimek: { type: String, required:true },
    email: {
        type: String, required:true, validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            }
        }
    },
    telefonska_stevilka: { type: String, required:true, minlength: 9, maxlength: 9 },
    rezervacije: [rezervacijaShema]
})

mongoose.model("Gost", gostShema, "Gosti");
mongoose.model("Rezervacija", rezervacijaShema, "Rezervacije");
mongoose.model("Narocilo", narociloShema, "Narocila");
mongoose.model("MeniItem", meniItemShema, "MeniItems");
mongoose.model("Surovina", surovinaShema, "Surovine");
mongoose.model("Zaposlen", zaposleniShema, "Zaposleni");
