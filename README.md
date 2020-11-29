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



