const express=require('express');
const router=express.Router();
const uporabniki=require('../controllers/uporabniki');
const rezervacije=require('../controllers/rezervacije')

router.get("/uporabniki",uporabniki.pridobiUporabnike);
router.get("/uporabniki/:idUporabnika",uporabniki.pridobiUporabnika);
router.post("/uporabniki",uporabniki.ustvariUporabnika);
router.put("/uporabniki",uporabniki.posodbiUporabnika);
router.post("/rezervacija",rezervacije.ustvariRezervacijo);
module.exports=router
