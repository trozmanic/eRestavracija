var express = require('express');
var router = express.Router();

var pristajlna_stran=require('../controllers/pristajlna_stran');
var nadzorna_plosca=require('../controllers/nadzorna_plosca');
var login = require('../service/login')
var register = require('../service/register')
var meni = require('../service/meni')
var database = require('../service/database')

/* GET home page. */
router.get('/', pristajlna_stran.index);
router.get('/onas',pristajlna_stran.onas)
router.get('/menu', pristajlna_stran.menu)
router.get('/rezerviraj',pristajlna_stran.rezerviraj)
router.get('/rezerviraj/podatki',pristajlna_stran.rezerviraj_podatki)
router.get('/rezerviraj/menu',pristajlna_stran.rezerviraj_menu)
router.get("/odjava", pristajlna_stran.logout)

/* NADZORNA PLOSCA */

router.get('/nadzorna_plosca',nadzorna_plosca.menu)
router.get('/nadzorna_plosca/rezervacije',nadzorna_plosca.rezervacije)
router.get('/nadzorna_plosca/urnik',nadzorna_plosca.urnik)
router.get('/nadzorna_plosca/zaposleni',nadzorna_plosca.seznamZaposlenih)
router.get('/nadzorna_plosca/strezba',nadzorna_plosca.strezba)
router.get('/nadzorna_plosca/kuhar', nadzorna_plosca.narocila_kuhar)
router.get('/nadzorna_plosca/meni', nadzorna_plosca.meni)
router.get('/nadzorna_plosca/zasluzek', nadzorna_plosca.zasluzek)
router.get("/nadzorna_plosca/zasluzek/delete/:id", nadzorna_plosca.zasluzel_brisi_racun)
router.get('/nadzorna_plosca/zaloga',nadzorna_plosca.seznamZaloge)

/* POST login / register */
router.post("/login", login.login);
router.post("/register", register.register)


/* PUT POST meni edid add dish */

router.put("/nadzorna_plosca/meni/:id", meni.editMeni)
router.post("/nadzorna_plosca/meni", meni.addDish)


router.get('/database/init', database.initDB)
router.get('/database', database.db)

module.exports = router;
