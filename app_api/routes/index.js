const express=require('express');
const router=express.Router();

const uporabniki=require('../controllers/uporabniki');
const rezervacije=require('../controllers/rezervacije')
const meni = require('../controllers/meni');
const gost = require('../controllers/gost');
const urnik = require('../controllers/urnik');
const zaposleni = require('../controllers/zaposleni');
const narocila = require('../controllers/narocila');
<<<<<<< HEAD
const zaloga = require('../controllers/zaloga');
=======
const zasluzek = require('../controllers/zasluzek');
>>>>>>> f40b292e802b2be9f8c5566b7c017302473e5a86

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
router.get("/narocila/:idNarocila",narocila.pridobiNarocilo);
router.put("/narocila/:idNarocila", narocila.posodobiNarocilo);

//ZASLUZEK
router.get("/zasluzek", zasluzek.pridobiNarocilo);
router.post("/zasluzek", zasluzek.test);

//ZALOGA
router.get("/zaloga", zaloga.pridobiSestavine);
router.get("/zaloga/:surovinaId", zaloga.pridobiSestavino);
router.post("/zaloga", zaloga.ustvariSestavino);
router.put("/zaloga", zaloga.posodobiSestavino);
router.delete("/zaloga/:surovinaId", zaloga.izbrisiSestavino);

module.exports=router