var express = require('express');
var router = express.Router();

var pristajlna_stran=require('../controllers/pristajlna_stran');
var nadzorna_plosca=require('../controllers/nadzorna_plosca');

/* GET home page. */
router.get('/', pristajlna_stran.index);
router.get('/onas',pristajlna_stran.onas)
router.get('/nadzorna_plosca',nadzorna_plosca.menu)

module.exports = router;
