const express=require('express');
const router=express.Router();

const jwt = require('express-jwt');
const avtentikacija = jwt({
  secret: process.env.JWT_GESLO,
  userProperty: 'payload',
  algorithms: ['HS256']
});

const uporabniki=require('../controllers/uporabniki');
const rezervacije=require('../controllers/rezervacije')
const meni = require('../controllers/meni');
const gost = require('../controllers/gost');
const urnik = require('../controllers/urnik');
const zaposleni = require('../controllers/zaposleni');
const narocila = require('../controllers/narocila');
const zaloga = require('../controllers/zaloga');
const zasluzek = require('../controllers/zasluzek');
const slike = require('../controllers/image');
const database = require('../controllers/database');
const ctrlAvtentikacija = require('../controllers/avtentikacija');
const self = require('../controllers/self');
const imaVlogo = ctrlAvtentikacija.imaVlogo;

const gostAvtorizacija = imaVlogo(['gost']);
const adminAvtorizacija = imaVlogo(['admin']);
const zaposleniAvtorizacija = imaVlogo(['admin', 'kuhar', 'natakar']);
const natakarAvtorizacija = imaVlogo(['natakar']);
const kuharAvtorizacija = imaVlogo(['kuhar']);

//UPORABNIKI
router.get("/uporabniki",
    avtentikacija,
    adminAvtorizacija,
    uporabniki.pridobiUporabnike);
router.get("/uporabniki/:idUporabnika",
    avtentikacija,
    adminAvtorizacija,
    uporabniki.pridobiUporabnika);
router.post("/uporabniki",
    avtentikacija,
    adminAvtorizacija,
    uporabniki.ustvariUporabnika);
router.put("/uporabniki",
    avtentikacija,
    adminAvtorizacija,
    uporabniki.posodbiUporabnika);
router.delete("/uporabniki/:idUporabnika",
    avtentikacija,
    adminAvtorizacija,
    uporabniki.izbrisiUporabnika);

//REZERVACIJE
router.get("/rezervacija",
    avtentikacija,
    zaposleniAvtorizacija,
    rezervacije.pridobiRezervacije);
router.get("/rezervacija/:idUporabnika",
    avtentikacija,
    zaposleniAvtorizacija,
    rezervacije.pridobiRezervacije)
router.post("/rezervacija",
    avtentikacija,
    zaposleniAvtorizacija,
    rezervacije.ustvariRezervacijo);
router.put("/rezervacija/:idRezervacije/:operacija",
    avtentikacija,
    zaposleniAvtorizacija,
    rezervacije.posodobiRezervacijo)

//MENI
router.get("/meni",meni.pridobiJedi);
router.get("/meni/:idJedi",meni.pridobiJed);
router.post("/meni",
    avtentikacija,
    zaposleniAvtorizacija,
    meni.ustvariJed);
router.put("/meni/:idJedi",
    avtentikacija,
    zaposleniAvtorizacija,
    meni.posodobiJed);
router.post("/meni/dodajOceno",
    avtentikacija,
    gostAvtorizacija,
    meni.dodajOceno);
router.delete("/meni/:idJedi",
    avtentikacija,
    zaposleniAvtorizacija,
    meni.izbrisiJed);

//GOST
router.get("/gost/:idUporabnika", gost.pridobiGosta);

//ZASLUZEK
router.get("/gost/:idUporabnika", zasluzek.pridobiNarocilo);

//URNIK
router.get("/urnik", urnik.pridobiUrnik);
router.put("/urnik", urnik.posodobiUrnik);
router.delete("/urnik", urnik.deleteUrnik);
router.post("/urnik", urnik.createUrnik);
router.get("/urnik/:id", urnik.urnik_uporabnik);

//ZAPOSLENI
router.get("/zaposleni", zaposleni.pridobiZaposlene);
router.get("/zaposleni/:uporabnik_id", zaposleni.pridobiZaposlenega);
router.put("/zaposleni", zaposleni.posodobiZaposlenega);
router.post("/zaposleni", zaposleni.ustvariZaposlenega);
router.delete("/zaposleni/:uporabnik_id", zaposleni.izbrisiZaposlenega);

//NAROCILA
router.get("/narocila/natakar",
    avtentikacija,
    natakarAvtorizacija,
    narocila.narocilaNatakar);
router.get("/narocila/kuhar",
    avtentikacija,
    kuharAvtorizacija,
    narocila.narocilaKuhar);
router.post("/narocila",
    avtentikacija,
    zaposleniAvtorizacija,
    narocila.ustvariNarocilo);
router.get("/narocila",
    avtentikacija,
    zaposleniAvtorizacija,
    narocila.pridobiNarocila);
router.put("/narocila",
    avtentikacija,
    zaposleniAvtorizacija,
    narocila.posodobiNarocilo);
router.delete("/narocila/:id",
    avtentikacija,
    zaposleniAvtorizacija,
    narocila.izbrisiNarocilo);
router.get("/narocila/:idNarocila",
    avtentikacija,
    zaposleniAvtorizacija,
    narocila.pridobiNarocilo);
router.put("/narocila/:idNarocila",
    avtentikacija,
    zaposleniAvtorizacija,
    narocila.posodobiNarocilo);

//ZASLUZEK
router.get("/zasluzek", zasluzek.pridobiNarocilo);

//ZALOGA
router.get("/zaloga", zaloga.pridobiSestavine);
router.get("/zaloga/:surovinaId", zaloga.pridobiSestavino);
router.post("/zaloga", zaloga.ustvariSestavino);
router.put("/zaloga", zaloga.posodobiSestavino);
router.delete("/zaloga/:surovinaId", zaloga.izbrisiSestavino);

router.post('/image', slike.shraniSliko)

// AVTENTIKACIJA
router.post('/registracija', ctrlAvtentikacija.registracija);
router.post('/prijava', ctrlAvtentikacija.prijava);

router.get('/database/drop', database.dropDB);

//GOST-SELF
router.get('/self/meni', self.pridobiMeni);

module.exports=router
