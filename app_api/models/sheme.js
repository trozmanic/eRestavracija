const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

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
    //"geslo": { type: String, required: true },
    "zgoscenaVrednost": {type: String, required: true},
    "nakljucnaVrednost": {type: String, required: true},
    "vloga": { type: String, enum: ['admin', 'kuhar', 'natakar', 'gost'] },
    "id_vloga_info": { type: mongoose.ObjectId, required: true }
})

/**
 * @swagger
 * components:
 *   schemas:
 *     ZaposleniBranje:
 *       type: object
 *       description: Podatki o zaposlenem
 *       properties:
 *         _id:
 *           type: string
 *           description: Enolični indetifikator
 *           example: 5fecb3329a977b43c4e98894
 *         id_uporabnika:
 *           type: string
 *           description: Enolični indetifikator, ki se nanaša na shemo uporabnik
 *           example: 5fecb3329a977b43c4e98894
 *         placa:
 *           type: number
 *           minimum: 0
 *           example: 1212
 *       required:
 *         - id_uporabnika
 */
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

/**
 * @swagger
 * components:
 *   schemas:
 *     NarociloBranje:
 *       type: object
 *       description: Podatki o rezervaciji
 *       properties:
 *         _id:
 *           type: string
 *           description: Enolični indetifikator
 *           example: 5fecb3329a977b43c4e98894
 *         natakar:
 *           type: object
 *           properties:
 *              _id:
 *                type: string
 *                description: Enolični indetifikator
 *                example: 5fecb3329a977b43c4e98894
 *              id_uporabnika:
 *                type: string
 *                description: Enolični indetifikator natakarja
 *                example: 5fecb3329a977b43c4e98894
 *         datum_in_ura:
 *           type: string
 *           format: date-time
 *           example: 2021-01-04T19:07:00.000Z
 *         cena:
 *           type: number
 *           example: 10.12
 *         stanje:
 *           type: string
 *           enum: [rezervacija, sprejeto, v pripravi, pripravljeno, postrezeno, placano]
 *           example: rezervacija
 *         miza:
 *           type: integer
 *           example: 2
 *         meni_items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: Enolični indetifikator
 *                 example: 5fecb3329a977b43c4e98894
 *               meni_item:
 *                 type: string
 *                 description: Enolični indetifikator jedi
 *                 example: 5fecb3329a977b43c4e98894
 *               kolicina:
 *                 type: integer
 *                 example: 2
 *       required:
 *         - _id
 *         - natakar
 *         - datum_in_ura
 *         - stanje
 */
const narociloShema = new mongoose.Schema({
    natakar: { type: zaposleniShema },
    datum_in_ura: { type: Date, required: true, default: Date.now },
    meni_items: [new mongoose.Schema({
        meni_item: { type: mongoose.ObjectId, required: true },
        kolicina: { type: Number, required: true }
    })],
    cena: { type: Number },
    stanje: { type: String, required:true, enum: ['rezervacija', 'sprejeto', 'v pripravi', 'pripravljeno', 'postrezeno', 'placano'], default:'sprejeto' },
    miza: { type: Number}
})

/**
 * @swagger
 * components:
 *   schemas:
 *     RezervacijaBranje:
 *       type: object
 *       description: Podatki o rezervaciji
 *       properties:
 *         _id:
 *           type: string
 *           description: Enolični indetifikator
 *           example: 5fecb3329a977b43c4e98894
 *         id_stranke:
 *           type: string
 *           description: Enolični indetifikator stranke
 *           example: 5fea48e93315186ae03c8651
 *         ime_stranke:
 *           type: string
 *           example: gost
 *         datum:
 *           type: string
 *           format: date-time
 *           example: 2021-01-04T19:07:00.000Z
 *         stanje:
 *           type: string
 *           enum: [potrjena,zavrnjena,preklicana,narocilo]
 *           example: potrjena
 *         st_oseb:
 *           type: integer
 *           example: 2
 *         narocilo:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/NarociloBranje'
 *       required:
 *         - _id
 *         - id_stranke
 *         - ime_stranke
 *         - datum
 *         - stanje
 *         - st_oseb
 *         - narocilo
 *     RezervacijaPisanje:
 *       type: object
 *       description: Podatki za ustvarjanje rezervacije
 *       properties:
 *         datum_in_ura:
 *           type: string
 *           format: date-time
 *           example: 2021-01-04T19:07:00.000Z
 *         stOseb:
 *           type: integer
 *           example: 2
 *         jedi:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               meni_item:
 *                 type: string
 *                 description: Enolični indentifikator jedi
 *                 example: 5fecb3329a977b43c4e98894
 *               kolicina:
 *                 type: integer
 *                 example: 2
 *         uporabnik_id:
 *           type: string
 *           description: Enolični indentifikator uporabnika
 *           example: 5fecb3329a977b43c4e98894
 *       required:
 *         - datum_in_ura
 *         - stOseb
 *         - jedi
 *         - uporabnik_id
 */  
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

uporabnikShema.methods.nastaviGeslo=function(geslo){
    this.nakljucnaVrednost=crypto.randomBytes(16).toString('hex');
    this.zgoscenaVrednost=crypto.pbkdf2Sync(geslo,this.nakljucnaVrednost,1000,64,'sha256').toString('hex');
}

uporabnikShema.methods.preveriGeslo=function(geslo){
    let zgoscenaVrednost=crypto.pbkdf2Sync(geslo,this.nakljucnaVrednost,1000,64,'sha256').toString('hex');
    return this.zgoscenaVrednost==zgoscenaVrednost;
}

uporabnikShema.methods.generirajJWT=function(){
    const datumPoteka=new Date();
    datumPoteka.setDate(datumPoteka.getDate()+7);

    return jwt.sign({
        _id:this._id,
        ime:this.ime,
        email_naslov:this.email_naslov,
        telefonska_stevilka:this.telefonska_stevilka,
        vloga:this.vloga,
        id_vloga_info:this.id_vloga_info,
        exp: parseInt(datumPoteka.getTime()/1000,10)
    },process.env.JWT_GESLO)
}

mongoose.model("Uporabnik", uporabnikShema, "Uporabnik");
mongoose.model("Gost", gostShema, "Gosti");
mongoose.model("Rezervacija", rezervacijaShema, "Rezervacije");
mongoose.model("Narocilo", narociloShema, "Narocila");
mongoose.model("MeniItem", meniItemShema, "MeniItems");
mongoose.model("Surovina", surovinaShema, "Surovine");
mongoose.model("Zaposlen", zaposleniShema, "Zaposleni");
mongoose.model("Urnik", urnikShema, "Urniki");

