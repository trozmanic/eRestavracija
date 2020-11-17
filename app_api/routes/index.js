const express=require('express');
const router=express.Router();
const gosti=require('../controllers/gosti');

router.get("/uporabniki",gosti.pridobiGoste);
router.get("/uporabniki/:idUporabnika",gosti.pridobiGosta);
router.post("/uporabniki",gosti.ustvariGosta);

module.exports=router