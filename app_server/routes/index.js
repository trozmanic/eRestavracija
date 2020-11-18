var express = require('express');
var router = express.Router();

var pristajlna_stran=require('../controllers/pristajlna_stran');
var nadzorna_plosca=require('../controllers/nadzorna_plosca');

/* GET home page. */
router.get('/', pristajlna_stran.index);
router.get('/onas',pristajlna_stran.onas)
router.get('/menu', pristajlna_stran.menu)
router.get('/rezerviraj',pristajlna_stran.rezerviraj)
router.get('/rezerviraj/podatki',pristajlna_stran.rezerviraj_podatki)
router.get('/rezerviraj/menu',pristajlna_stran.rezerviraj_menu)
router.get("/potrebna_prijava",pristajlna_stran.potrebna_prijava)
router.get('/nadzorna_plosca',nadzorna_plosca.menu)
router.get('/nadzorna_plosca/rezervacije',nadzorna_plosca.rezervacije)
router.get('/nadzorna_plosca/urnik',nadzorna_plosca.urnik)
router.get('/nadzorna_plosca/zaloga',nadzorna_plosca.zaloga)
router.get('/nadzorna_plosca/zaposleni',nadzorna_plosca.zaposleni)

module.exports = router;
