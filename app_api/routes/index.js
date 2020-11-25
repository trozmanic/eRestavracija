const express=require('express');
const router=express.Router();

const uporabniki=require('../controllers/uporabniki');
const rezervacije=require('../controllers/rezervacije')
const meni = require('../controllers/meni');
const gost = require('../controllers/gost');
const urnik = require('../controllers/urnik');
const zaposleni = require('../controllers/zaposleni');
const narocila = require('../controllers/narocila');
const zasluzek = require('../controllers/zasluzek');

//UPORABNIKI
router.get("/uporabniki",uporabniki.pridobiUporabnike);
router.get("/uporabniki/:idUporabnika",uporabniki.pridobiUporabnika);
router.post("/uporabniki",uporabniki.ustvariUporabnika);
router.put("/uporabniki",uporabniki.posodbiUporabnika);
router.delete("/uporabniki/:idUporabnika", uporabniki.izbrisiUporabnika);

//REZERVACIJE
router.get("/rezervacija",rezervacije.pridobiRezervacije);
router.get("/rezervacija/:idUporabnika",rezervacije.pridobiRezervacije)
router.post("/rezervacija",rezervacije.ustvariRezervacijo);
router.put("/rezervacija/:idRezervacije/:operacija",rezervacije.posodobiRezervacijo)

//MENI
router.get("/meni",meni.pridobiJedi);
router.get("/meni/:idJedi",meni.pridobiJed);
router.post("/meni",meni.ustvariJed);
router.put("/meni/:idJedi",meni.posodobiJed);
router.put("/meni/dodajOceno", meni.dodajOceno);
router.delete("/meni/:idJedi", meni.izbrisiJed);

//GOST
router.get("/gost/:idUporabnika", gost.pridobiGosta);

//ZASLUZEK
router.get("/gost/:idUporabnika", zasluzek.pridobiNarocilo);

//URNIK
router.get("/urnik", urnik.pridobiUrnik);
router.put("/urnik", urnik.posodobiUrnik);

//ZAPOSLENI
router.get("/zaposleni", zaposleni.pridobiZaposlenega);
router.put("/zaposleni", zaposleni.posodobiZaposlenega);
router.post("/zaposleni", zaposleni.ustvariZaposlenega);

//NAROCILA
router.post("/narocila", narocila.ustvariNarocilo);
router.get("/narocila", narocila.pridobiNarocila);
router.put("/narocila", narocila.posodobiNarocilo);
router.delete("/narocila/:id", narocila.izbrisiNarocilo);
router.get("/narocila/:idNarocila",narocila.pridobiNarocilo);
router.put("/narocila/:idNarocila", narocila.posodobiNarocilo);

//ZASLUZEK
router.get("/zasluzek", zasluzek.pridobiNarocilo);
router.post("/zasluzek", zasluzek.test);

module.exports=router
