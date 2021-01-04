# E-RESTAVRACIJA

Lastnike restavracije v Ljubljani nas je kontaktiral da zeli v popolnosti digitalizirati svojo restavracijo. Odločil se je da kontaktira študente FRI pri predmetu SP naj mu implementirajo informacijski sistem. Lastnik restavracije je pripravljena plačati veliko vsoto denarja, zato je potrebno ugoditi vsem njegovim zahtevam:

- Implementacija statične spletne strani za prikaz menija, lokacije, kontaktnih in ostalih informacij strankam
- Stranka ima možnost rezervacije mize in ocenjevanja jedi iz menija
- Zaposleni (kuhar, natakar, direktor) imajo vsak svojo nadzorno ploščo z določenimi funkcionalnostmi
- Natakar ima vpogled v urnik, lahko ureja/dodaja jed ki se prikaze stranki na meniju, potrdi/zavrne rezervacijo
- Kuhar ima enake na voljo enake funkcionalnosti kot natakar le da lahko se upravlja z zalogo surovin (naročanje)
- Direktor ima enake funkcionalnosti kot natakar in kuhar, le da ima vpogled na finančno stanje (možnost vpogleda v zaslužek, prihodke, odhodke itd...)


# SEZNAM DOVOLJENIH VNOSOV ZA UPORABNISKA VNOSNA POLJA

- Pristajalna stran: ob vstopu na spletno stran lahko izberemo ali se bomo registrirali ali
prijavili v obstojeci uporabniski racun. 
  - Pri registraciji je potrebno vnesti vrednost 'Ime in priimek', 
ki je poljubno zaporedje znakov, 'Email naslov', ki se preveri z regularnim izrazom (v postev pridejo le veljavni
elektronski naslovi), 'Telefonska stevilka', ki se preveri z regularnim izrazom (v postev pridejo le stevilke ki vsebujejo 
stevke locene z '-' ali presledki), 'Geslo' in 'Ponovite geslo', pa zahtevata poljubno zaporedje znakov, za uspesno registracijo
se morata obe polji ujemati.
  - Pri prijavi se vnosna polja 'Email naslov' in 'Geslo' ne preverjajo, ob napacnih podatkih dobimo le obvestilo da je 
  prijava spodletela (napacni podatki)
  - Pri rezervacijah je potrebno vnesti uro, število oseb in izbrati datum. Ime, priimek in email so že izpoljeni iz uporabnikove prijave. Za uro so dovoljeni vsi 24-urni vnosi ure, za število oseb je dovoljen vnos število večje od 0, datum uporabnik zbere iz koloder "widgeta", ki se s pomočjo JS prevede v pravilen zapis datuma. Na naslednji strani uporabnik izbere nič ali več jedi preko klikov na gumb.
 
- Nadzorna ploošča:
  - Meni: Pri dodajanju nove jedi mora uporabnik vnesti 'ime' jedi, ki jo bo dodal 'opis', 'ceno'. Za 'kalorije' ima 2 opciji ali vnese njemu znano vrednost v okence ali pa pusti prazno in kalorije izračuna z food api in sicer tako, da v prvo okno v angleščini vpiše ime sestavine in v drugo okence količino v gramih, ki je vsebovana v porciji jedi in pritisne gumb ob okencu, ki sestavino doda. To ponovi za vse sestavine v jedi, ko jed shrani se kalorije izračunajo s pomočjo zunanjega vira. Uporabnik dodaj tudi fotografijo formata '.jpeg' . Pri urejanju je zgodba ista, le da so tukaj predhodne vredosti že prisotne v okencih.
  - Rezervacije: Pri rezervacijah so edina vnosna polja v dodajanju rezervacij k naročilom, in sicer natakar in število mize. Natakar je že izpoljen in je trenutno prijavljen uporabnik, število mize pa je veljavno vsako število večje od 0.
  - Urnik: dovoljena vnosna polja so " ", "d", "p", "?".
  - Zaloga: Ime sestavine mora biti dolgo vsaj 3 črke in ne sme vsebovati števil ter posebnih znakov, količina mora vsebovati število ter enoto, cena vsebuje samo števke brez simbola valute.
  - Zaposleni: Ime mora biti dolgo vsaj 3 črke in ne sme vsebovati števil ter posebnih znakov, telefonska številka vsebuje samo števke brez simbolov, e-pošta mora biti oblike: primer@domena, geslo lahko vsebuje črke, števke, znake in simbole, vlogo je potrebno izbrati in mora imeti eno od naslednjih vrednosti: admin, kuhar, natakar, plača lahko vsebuje samo števke brez simbola valute.
  
  
# DODATNA KNJIZNICA SOCKET.IO
  - https://www.npmjs.com/package/socket.io
  - S knjiznico socket.io smo implementirali dvomsmerno komunikacijo med natakarji in kuharjem. Natakar ima opcijo kreiranja novega narocila, kjer izbere katero jed iz menija je stranka narocilo ter stevilko mize. Kuharja ki ima ves cas odprto aplikacijo na svojem racunalniku/telefonu ob vsaki spremembi naroicl (ce natakar doda narocilo ali se zmoti in ga izbrise) obvesti glasovno sporocilo zvonca, po dolocenem casu se pa stran osvezi in na voljo ima pregled novega stanja narocil. Na podoben nacin sporoci kuhar natakarju, ki je ustvaril narocilo kaj se trenutno dogaja z njegovim narocilom. Narocilo je lahko bodisi sprejeto, v pripravi, prirpavljeno, postrezeno ali placano. Ko kuhar pridobi informacijo o novo kreiranem narocilu je to narocilo sprejeto s klikom na ikono na uporabniskem vmesniku kuhar spremeni status narocila v 'v pripravi', kar pomeni, da se je lotil priprave narocila. Ko konca s pripravo spremeni spet s klikom stanje v 'pripravljeno'. V celotni fazi spreminjanja stanja narocila je natakar, cigar narocilo je bilo spremenjeno obvescen prek vtica.

# DELOVANJE NA 3 RAZLICNIH NAPRAVAH
- Aplikacija deluje na namiznih racunalnikih zaslonih srednje velikosti (npr. namizni racunalniki)
- Aplikacija deluje na zaslonih majhne velikosti (npr. tablice Ipad)
- Aplikacija deluje na zaslosnih zelo majhne velikosti (npr. telefon Iphone X)

# Heroku
- Povezava do spletne strani na Heroku: https://aldente-sp-20-21.herokuapp.com/

# Zagon aplikacije
- Z ukazom docker-compose up zaženemo Docker container
- Spletna stran je nato dosegljiva na localhost:3000
  
# /db uporabniski racuni generirani za lokalno testiranje
  - Ob obisku /db s pritiskom gumba pobrišemo bazo in jo nato z drugim gumbom ponovno nastavimo
  - Natakar:
    - email: natakar@aldente.si
    - geslo: geslo1234
    
  - Kuhar:
      - email: kuhar@aldente.si
      - geslo: geslo1234

  - Gost:
      - email: gost@aldente.si
      - geslo: geslo1234

  - Admin:
      - email: admin@aldente.si
      - geslo: geslo1234

# Razlike med uporabniki
  - Nasa aplikacija ima 4 vloge, gost, admin, kuhar in natakar.

  - Gost, lahko vidi meni restavracije (GET: "/api/meni"), lahko pregleda svoje rezervacije (GET: "/api/rezervacija") in lahko sebi ustvari nove (POST: "/api/rezervacija"). Gost lahko tudi vsak meni oceni enkrat (POST: "/api/meni/dodajOceno").
  - Vse vloge razen gosta, lahko vidijo svoj urnik (GET: "/api/urnik"). Ostale vloge ne morejo ocenjevati jedi.
  - Kuhar lahko opravlja z narocili (GET: "/api/narocila/kuhar", PUT: "/api/narocila") in zalogo ("CRUD": "/api/zaloga"). 
  - Natakar lahko opravlja z rezervacijami ("CRUD": "/api/rezervacija") in narocili (GET: "/api/"/api/narocila/natakar", POST/PUT: "/api/narocila")
  - Admin lahko pocne vse, razen upravljati z narocili (poleg ostalih omenjenih funkcionalnosti lahko tudi ureja zaposlene ("CRUD": "/api/zaposleni") ).

# Lighthouse test
 - Največ zgubimo na performance, predvsem na račun neuporabljene kode JS in stilov CSS, te napake je težko odpravit, saj smo v veliki meri odvisni od Angularja, ki pretvori datoteke in je težko priti do izvora težave
