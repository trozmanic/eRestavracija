const express = require('express');
const router = express.Router();

const jwt = require('express-jwt');
const avtentikacija = jwt({
  secret: process.env.JWT_GESLO,
  userProperty: 'payload',
  algorithms: ['HS256']
});

const uporabniki = require('../controllers/uporabniki');
const rezervacije = require('../controllers/rezervacije')
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

/**
 * Kategorije dostopnih točk
 * @swagger
 * tags:
 *  - name: Rezervacije
 *    description: Obladovanje rezervaciji
 */

/**
* Varnostna shema dostopa
* @swagger
* components:
*  securitySchemes:
*   jwt:
*    type: http
*    scheme: bearer
*    in: header
*    bearerFormat: JWT
*/

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

// //REZERVACIJE
// router.get("/rezervacija",
//     avtentikacija,
//     zaposleniAvtorizacija,
//     rezervacije.pridobiRezervacije);
// router.get("/rezervacija/:idUporabnika",
//     avtentikacija,
//     zaposleniAvtorizacija,
//     rezervacije.pridobiRezervacije)
// router.post("/rezervacija",
//     avtentikacija,
//     zaposleniAvtorizacija,
//     rezervacije.ustvariRezervacijo);
// router.put("/rezervacija/:idRezervacije/:operacija",
//     avtentikacija,
//     zaposleniAvtorizacija,
//     rezervacije.posodobiRezervacijo)

//MENI
router.get("/meni",meni.pridobiJedi);
router.get("/meni/:idJedi",meni.pridobiJed);
router.post("/meni",
    //avtentikacija,
    //zaposleniAvtorizacija,
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
router.get("/uporabniki", uporabniki.pridobiUporabnike);
router.get("/uporabniki/:idUporabnika", uporabniki.pridobiUporabnika);
router.post("/uporabniki", uporabniki.ustvariUporabnika);
router.put("/uporabniki", uporabniki.posodbiUporabnika);
router.delete("/uporabniki/:idUporabnika", uporabniki.izbrisiUporabnika);

//REZERVACIJE
/**
 * @swagger
 *  /rezervacija:
 *    get:
 *      summary: Seznam vseh rezervacij
 *      description: Pridobi seznam vseh rezervacij
 *      tags: [Rezervacije]
 *      responses:
 *        "200":
 *          description: Uspešna zahteva s seznamom vseh rezervacij
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/RezervacijaBranje'
 *        "500":
 *          description: Napaka na strežniku pri dostopu do podatkovne baze.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *        "401":
 *          description: Nedovoljen vstop oziroma majkajoč žeton.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
*/
router.get("/rezervacija", rezervacije.pridobiRezervacije);
/**
 * @swagger
 *  /rezervacija/{idUporabnika}:
 *    get:
 *      summary: Seznam rezervacij določenega uporabnika
 *      description: Pridobi seznam vseh rezervacij določenega uporabnika
 *      tags: [Rezervacije]
 *      parameters:
 *        - in: path
 *          name: idUporabnika
 *          description: enolični identifikator uporabnika
 *          schema:
 *            type: string
 *            required: true
 *            example: 5ded18eb51386c3799833191
 *      responses:
 *        "200":
 *          description: Uspešna zahteva s seznamom vseh rezervacij
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/RezervacijaBranje'
 *        "500":
 *          description: Napaka na strežniku pri dostopu do podatkovne baze.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *        "400":
 *          description: Podati morate id uporabnika.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *        "401":
 *          description: Nedovoljen vstop oziroma majkajoč žeton.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
*/
router.get("/rezervacija/:idUporabnika", rezervacije.pridobiRezervacije)
/** 
 * @swagger
 *  /rezervacija:
 *    post:
 *      summary: Ustvari novo rezervacijo
 *      description: Ustvari novo rezervacijo
 *      tags: [Rezervacije]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RezervacijaPisanje'
 *      responses:
 *        "201":
 *          description: Uspešna ustvarjena rezervacija
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: Success
 *        "500":
 *          description: Napaka na strežniku pri dostopu do podatkovne baze.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *        "401":
 *          description: Nedovoljen vstop oziroma majkajoč žeton.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 */ 
router.post("/rezervacija", rezervacije.ustvariRezervacijo);
/**
 * @swagger
 * /rezervacija/{idUporabnika}/{operacija}:
 *   put:
 *     summary: Posodobi stanje rezervacije določenga uporabnika
 *     description: Posodobi stanje rezervacije določenga uporabnika
 *     tags: [Rezervacije]
 *     parameters:
 *       - in: path
 *         name: idUporabnika
 *         description: enolični identifikator uporabnika
 *         schema:
 *           type: string
 *           required: true
 *           example: 5ded18eb51386c3799833191
 *       - in: path
 *         name: operacija
 *         description: Operacija nad stanjem
 *         schema:
 *           type: string
 *           required: true
 *           enum: [potrdi,zavrni,preklici,narocilo]
 *     responses:
 *       "200":
 *         description: Uspešna posodobljeno stanje rezervacije
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Success"
 *       "500":
 *         description: Napaka na strežniku pri dostopu do podatkovne baze.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       "400":
 *         description: Podati morate id uporabnika in/ali operacijo.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       "401":
 *          description: Nedovoljen vstop oziroma majkajoč žeton.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 */
router.put("/rezervacija/:idRezervacije/:operacija", rezervacije.posodobiRezervacijo)

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
/**
 * @swagger
 *  /zaloga:
 *    get:
 *      summary: Seznam zaloge
 *      description: Pridobi seznam vseh surovin
 *      tags: [Zaloga]
 *      responses:
 *        "200":
 *          description: Uspešna zahteva s seznamom vseh surovin
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/SurovinaBranje'
 *        "401":
 *          description: Napaka pri dostopu.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *        "500":
 *          description: Napaka na strežniku pri dostopu do podatkovne baze.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 */
router.get("/zaloga", zaloga.pridobiSestavine);
/**
 * @swagger
 *  /zaloga/{surovinaId}:
 *    get:
 *      summary: Seznam zaloge
 *      description: Pridobi seznam vseh surovin
 *      tags: [Zaloga]
 *      parameters:
 *       - in: path
 *         name: surovinaId
 *         description: enolični identifikator surovine
 *         schema:
 *           type: string
 *           required: true
 *           example: 69lol18eb51386c379983319
 *      responses:
 *        "200":
 *          description: Uspešna zahteva s seznamom vseh surovin
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/SurovinaBranje'
 *        "401":
 *          description: Napaka pri dostopu.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *        "404":
 *          description: Napaka zahteve, sestavina s podanim id-jem ne obstaja
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *        "500":
 *          description: Napaka na strežniku pri dostopu do podatkovne baze.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 */
router.get("/zaloga/:surovinaId", zaloga.pridobiSestavino);
/**
 * @swagger
 *  /rezervacija:
 *    post:
 *      summary: Ustvari novo surovino
 *      description: Ustvari novo surovino
 *      tags: [Zaloga]
 *      security:
 *        - jwt: []
 *      requestBody:
 *        description: Podatki o surovini
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: "#/components/schemas/SurovinaPisanje"
 *      responses:
 *        "201":
 *          description: Uspešno ustvarjena surovina
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *        "401":
 *          description: Napaka pri dostopu.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *        "500":
 *          description: Napaka na strežniku pri dostopu do podatkovne baze.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 */
router.post("/zaloga", zaloga.ustvariSestavino);
/**
 * @swagger
 *  /zaloga:
 *    put:
 *      summary: Posodobi določeno surovino
 *      description: Posodobi atribute določene surovine
 *      tags: [Zaloga]
 *      requestBody:
 *        description: Podatki o surovini
 *        required: false
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: "#/components/schemas/SurovinaPisanje"
 *      responses:
 *        "200":
 *          description: Uspešno posodobljena surovina
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *        "401":
 *          description: Napaka pri dostopu.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *        "500":
 *          description: Napaka na strežniku pri dostopu do podatkovne baze.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 */
router.put("/zaloga", zaloga.posodobiSestavino);
/**
 * @swagger
 *  /zaloga/{surovinaId}:
 *    delete:
 *      summary: Brisanje izbranege surovine iz zaloge.
 *      tags: [Zaloga]
 *      security:
 *        - jwt: []
 *      parameters:
 *        - in: path
 *          name: surovinaId
 *          description: enolični identifikator surovine
 *          schema:
 *          type: string
 *          required: true
 *      responses:
 *        "204":
 *          description: Uspešno odstranjevanje surovine
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *        "400":
 *          description: Vnesti je potrebno id surovine.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *        "401":
 *          description: Napaka pri dostopu.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *        "500":
 *          description: Napaka na strežniku pri dostopu do podatkovne baze.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 */
router.delete("/zaloga/:surovinaId", zaloga.izbrisiSestavino);

router.post('/image', slike.shraniSliko)

// AVTENTIKACIJA
router.post('/registracija', ctrlAvtentikacija.registracija);
router.post('/kreiraj', ctrlAvtentikacija.kreiraj);
router.post('/prijava', ctrlAvtentikacija.prijava);

router.get('/database/drop', database.dropDB);

//GOST-SELF
router.get('/self/meni', self.pridobiMeni);

module.exports = router
