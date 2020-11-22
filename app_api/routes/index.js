const express=require('express');
const router=express.Router();

const uporabniki=require('../controllers/uporabniki');
const rezervacije=require('../controllers/rezervacije')
const meni = require('../controllers/meni');
const gost = require('../controllers/gost');
const urnik = require('../controllers/urnik');

//UPORABNIKI
router.get("/uporabniki",uporabniki.pridobiUporabnike);
router.get("/uporabniki/:idUporabnika",uporabniki.pridobiUporabnika);
router.post("/uporabniki",uporabniki.ustvariUporabnika);
router.put("/uporabniki",uporabniki.posodbiUporabnika);
router.delete("/uporabniki/:idUporabnika", uporabniki.izbrisiUporabnika);
router.post("/rezervacija",rezervacije.ustvariRezervacijo);

//MENI
router.get("/meni",meni.pridobiJedi);
router.get("/meni/:idJedi",meni.pridobiJed);
router.post("/meni",meni.ustvariJed);
router.put("/meni",meni.posodobiJed);
router.put("/meni/dodajOceno", meni.dodajOceno);
router.delete("/meni/:idJedi", meni.izbrisiJed);

//GOST
router.get("/gost/:idUporabnika", gost.pridobiGosta);

//URNIK
router.get("/urnik", urnik.pridobiUrnik);
router.put("/urnik", urnik.posodobiUrnik);

module.exports=router
