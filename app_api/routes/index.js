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

//MENI

/**
 * @swagger
 *  /meni:
 *    get:
 *      summary: Seznam jedi na meniju
 *      description: Pridobitev seznama jedi, ki so na voljo meniju.
 *      tags: [Meni]
 *     response:
 *        "200":
 *         description: Uspešna zahteva s seznamom jedi na meniju.
 *          content:
 *            application/json:
 *              schema:
 *               type: array
 *                 items:
 *                    $ref: "#/components/schemas/MeniItem
 *        "500":
 *          description: Napaka na strežniku pri dostopu do podatkovne baze.
 *
 */
router.get("/meni", meni.pridobiJedi);

/**
 * @swagger
 *  /meni/{idJedi}:
 *    get:
 *      summary: Posamezna jed
 *      description: Pridobitev posamezne jedi, ki je na voljo na meniju.
 *      tags: [Meni]
 *      parameters:
 *        - in: path
 *          name: idJedi
 *          description: enolični identifikator jedi
 *          schema:
 *            type: string
 *          required: true
 *          example: 5ff0d494ec999c3f4475631b
 *      response:
 *        "200":
 *          description: Uspešna zahteva z jedjo v rezultatu.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/MeniItem"
 *        "404":
 *          description: Napaka zahteve, zahtevane jedi ni mogoče najti.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *        "500":
 *          description: Napaka na strežniku pri dostopu do podatkovne baze.
 */
router.get("/meni/:idJedi", meni.pridobiJed);


/**
 * @swagger
 * /meni:
 *  post:
 *    summary: Dodajanje nove jedi.
 *    description: Dodajanje nove jedi na jedilnik s podatki o imenu, opisu, ceni, kalorijah in sliki.
 *    tags: [Meni]
 *    security:
 *      - jwt: []
 *    requestBody:
 *      description: Podatki od jedi
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/MeniItem"
 *    responses:
 *      "200":
 *        description: Uspešno dodana jed, ki se vrne v rezultatu.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/MeniItem"
 *      "500":
 *        description: Napaka na strežniku pri dostopu do podatkovne baze.
 */
router.route("/meni")
    .post(avtentikacija, meni.ustvariJed);

/**
 * @swagger
 *  /meni/{idJedi}:
 *    put:
 *      summary: Posodablanje izbaranje jedi
 *      description: Posodobitev izbranje jedi s podatki o imenu, opisu, ceni, kalorijah in sliki.
 *      tags: [Meni]
 *      security:
 *        - jwt: []
 *    requestBody:
 *      description: Podatki od jedi
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/MeniItem"
 *    parameters:
 *      - in: path
 *        name: idJedi
 *        description: enolični identifikator jedi.
 *        schema:
 *          type: string
 *        required: true
 *        example: 5ff0d494ec999c3f4475631b
 *    responses:
 *      "200":
 *        description: Uspešno posodobljena jed, ki se vrne v rezultatu.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/MeniItem"
 *      "400":
 *        description: Napaka zahteve, manjkajo obvezni parametri.
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *      "500":
 *        description: Napaka na strežniku pri dostopu do podatkovne baze.
 */
router.route("/meni/:idJedi")
    .put(avtentikacija, meni.posodobiJed);

/**
 *  @swagger
 *    /meni/dodajOceno:
 *      post:
 *        summary: Dodajanje ocene izbrani jedi
 *        description: Dodajanje ocene izbarani jedi.
 *        tags: [Meni]
 *        security:
 *          - jwt: []
 *        requestBody:
 *          description: Id jedi in uporabnika ter ocena.
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                id:
 *                  type: string
 *                  example: 5ff0d494ec999c3f4475631b
 *                id_uporabnika:
 *                  type: string
 *                  example: 5ff0d494ec999c3f4475644c
 *                ocena:
 *                  type: string
 *                  example: 4
 *        responses:
 *          "200":
 *            description: Uspešno posodobljena jed z oceno.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: "#/components/schemas/MeniItem"
 *          "500":
 *            description: Napaka na strežniku pri dostopu do podatkovne baze.
 *
 */
router.route("/meni/dodajOceno")
    .post(avtentikacija, meni.dodajOceno);

/**
 * @swagger
 *  /meni/{idJedi}:
 *    delete:
 *      summary: Brisanje izbranje jedi
 *      description: Brisanje **izbranje jedi**
 *      tags [Meni]
 *      security:
 *        - jwt: []
 *      parameters:
 *        - in: path
 *          name: idJedi
 *          description: enolični identifikator jedi.
 *          schema:
 *            type: string
 *          required: true
 *          example: 5ff0d494ec999c3f4475631b
 *      responses:
 *        "200":
 *          description: Uspešno zbrisana jed.
 *        "400":
 *          description: Napaka zahteve, manjkajo obvezni parametri.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *        "500":
 *          description: Napaka na strežniku pri dostopu do podatkovne baze.
 */
router.route("/meni/:idJedi")
    .delete(avtentikacija, meni.izbrisiJed);

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
/**
 * @swagger
 *  /narocila/natakar:
 *    get:
 *      summary: Seznam vseh narocil za natakarja
 *      description: Pridobi seznam vseh narocil dolocenega natakarja
 *      tags: [Narocila]
 *      responses:
 *        "200":
 *          description: Uspešna zahteva s seznamom vseh narocil dolocenega natakarja
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  vrsta:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/NarociloZaposleni'
 *                  priprava:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/NarociloZaposleni'
 *                  postrezena:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/NarociloZaposleni'
 *        "500":
 *          description: Napaka na strežniku pri dostopu do podatkovne baze.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 */
router.get("/narocila/natakar",
    avtentikacija,
    natakarAvtorizacija,
    narocila.narocilaNatakar);
/**
 * @swagger
 *  /narocila/kuhar:
 *    get:
 *      summary: Seznam vseh narocil za kuharja
 *      description: Pridobi seznam vseh narocil dolocenega kuharja
 *      tags: [Narocila]
 *      responses:
 *        "200":
 *          description: Uspešna zahteva s seznamom vseh narocil dolocenega kuharja
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  vrsta:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/NarociloZaposleni'
 *                  priprava:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/NarociloZaposleni'
 *        "500":
 *          description: Napaka na strežniku pri dostopu do podatkovne baze.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 */
router.get("/narocila/kuhar",
    avtentikacija,
    kuharAvtorizacija,
    narocila.narocilaKuhar);
/**
 * @swagger
 *  /narocila:
 *    post:
 *      summary: Ustvari novo narocilo
 *      description: Ustvari novo narocilo
 *      tags: [Narocila]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/NarociloKreiranje'
 *      responses:
 *        "201":
 *          description: Uspešna ustvarjeno narocilo
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NarociloBranje'
 *        "500":
 *          description: Napaka na strežniku pri dostopu do podatkovne baze.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 */
router.post("/narocila",
    avtentikacija,
    zaposleniAvtorizacija,
    narocila.ustvariNarocilo);
/**
 * @swagger
 *  /narocila:
 *    get:
 *      summary: Pridobi vsa narocila
 *      description: Pridobi vsa narocila
 *      tags: [Narocila]
 *      responses:
 *        "200":
 *          description: Uspešna pridobljena narocila
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                   $ref: '#/components/schemas/NarociloBranje'
 *        "500":
 *          description: Napaka na strežniku pri dostopu do podatkovne baze.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 */
router.get("/narocila",
    avtentikacija,
    zaposleniAvtorizacija,
    narocila.pridobiNarocila);
/**
 * @swagger
 *  /narocila:
 *    put:
 *      summary: Posodobi narocilo
 *      description: Posodobi narocilo
 *      tags: [Narocila]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  example: 5fecb3329a977b43c4e98894
 *                  type: string
 *                  description: enolicni identfikator narocila
 *                stanje:
 *                  type: string
 *                  description: novo stanje
 *                  enum: [rezervacija, sprejeto, v pripravi, pripravljeno, postrezeno, placano]
 *      responses:
 *        "200":
 *          description: Uspešna posodobljena narocila
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                   $ref: '#/components/schemas/NarociloBranje'
 *        "500":
 *          description: Napaka na strežniku pri dostopu do podatkovne baze.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 */
router.put("/narocila",
    avtentikacija,
    zaposleniAvtorizacija,
    narocila.posodobiNarocilo);
/**
 * @swagger
 *  /narocila/{id}:
 *    delete:
 *      summary: Izbrisi narocilo s podanim enolicnim identifikatorjem
 *      description: Izbrisi narocilo s podanim enolicnim identifikatorjem
 *      tags: [Narocila]
 *      responses:
 *        "200":
 *          description: Uspešna izbrisano narocilo
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  []
 *        "500":
 *          description: Napaka na strežniku pri dostopu do podatkovne baze.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 */
router.delete("/narocila/:id",
    avtentikacija,
    zaposleniAvtorizacija,
    narocila.izbrisiNarocilo);

//IS THIS NEEDED ???
router.get("/narocila/:idNarocila",
    avtentikacija,
    zaposleniAvtorizacija,
    narocila.pridobiNarocilo);

/**
 * @swagger
 *  /narocila/{id}:
 *    put:
 *      summary: Posodobi narocilo s podanim enolicnim identifikatorjem
 *      description: Posodobi narocilo
 *      tags: [Narocila]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  example: 5fecb3329a977b43c4e98894
 *                  type: string
 *                  description: enolicni identfikator narocila
 *                stanje:
 *                  type: string
 *                  description: novo stanje
 *                  enum: [rezervacija, sprejeto, v pripravi, pripravljeno, postrezeno, placano]
 *      responses:
 *        "200":
 *          description: Uspešna posodobljena narocila
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                   $ref: '#/components/schemas/NarociloBranje'
 *        "500":
 *          description: Napaka na strežniku pri dostopu do podatkovne baze.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 */
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


/**
 * @swagger
 *  /image:
 *    post:
 *      summary: Dodajanje slike
 *      description: Dodajanje slike jeedi za prikaz v meniju.
 *      tags: [Image]
 *      requestBody:
 *        description: Slika jedi
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              image:
 *                type: File
 *      response:
 *        "200":
 *          description: Slika uspešno dodoana.
 *          content:
 *            application/json:
 *              schema:
 *                image:
 *                  type: string
 *        "500":
 *          description: Napaka na strežniku.
 */
router.post('/image', slike.shraniSliko)

// AVTENTIKACIJA
router.post('/registracija', ctrlAvtentikacija.registracija);
router.post('/kreiraj', ctrlAvtentikacija.kreiraj);
router.post('/prijava', ctrlAvtentikacija.prijava);

router.get('/database/drop', database.dropDB);

//GOST-SELF
router.get('/self/meni', self.pridobiMeni);

module.exports = router
