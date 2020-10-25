<!-- # Spletno programiranje 2020/2021

Lastni projekt pri predmetu **Spletno programiranje** v študijskem letu **2020/2021**.


## 1. LP

Osnutek aplikacije in wireframe model


## 2. LP

Dinamična spletna aplikacija z logiko na strani strežnika


## 3. LP

Dinamična spletna aplikacija s podatkovno bazo


## 4. LP

SPA aplikacija na eni strani


## 5. LP

Varnostno zaščitena progresivna aplikacija -->


# 1. OPIS ZASLONSKIH MASK

## 1.1 ZAČETNA STRAN

### 1.1.1 INDEX
- Vstopna stran v aplikacijo za uporabnika (landing page)
- Na vrhu strani se nahaja iskalna vrstica (navigation bar)
- Pod iskalno vrstico se nahaja logotip aplikacije
- Na voljo sta dva gumba regsitracija in prijava
- Ob kliku na enega izmed gumbov se nam prikaze obrazec za registracijo/prijavo uporabnika

### 1.1.2 MENU
- Na vrhu strani se nahaja iskalna vrstica (navigation bar)
- Pod iskalno vrstico se nahaja logotip aplikacije
- Menu je predstavljen z jedmi (vsaka jed zavzema eno skatlo)
- Skatla/jed je sestavljena iz slike jedi, kateri sledi naslov jedi, kratek napotek uporabniku
kako dostopati do vec informacij o jedi ter kratek opis same jedi. Ob kliku na sliko se nam dodatno prikazejo se 
dodatne podrobnosti o jedi (trenutna ocena uporabnikov dolocene jedi ter kalorijska vrednost).
Na samem dnu skatle je prisoten gumb
OCENI JED. S klikom na gumb se nam odpre prikazno okno.
- Prikazno okno omogoca uporabniku oddajanje svoje ocene trenutno izbrane jedi. Na samem vrhu levo prikaznega okna je naslov,
desno pa gumb za zapiranje prikaznega okna. Z drsnikom izberemo oceno jedi (skrajno leva pozicija = najslabsa ocena, skrajno desna pozicija = najboljsa ocena). Ko uporabnik izbira oceno z drsnikom mu je na voljo vizualni prikaz trenutno izbrane ocene v obliki SVG grafike (smiley), ki ponazarja zadovoljstvo z jedjo, kot tudi numericna vrednost drsnika (ocena) v razponu od 
1 - 5. Na dnu prikaznega okna se nahajata se gumba ZAPRI (zapremo okno) in POSLJI (posljemo oceno).

### 1.1.3 O NAS
- Na tej strani so prikazane osnovne informacije o naši restavraciji.
- Na vrhu se nahaja iskalna vrstica, pod njo se nahaja logotip, pod njim pa vsebina strani razdeljena na dva dela. 
- Prvi del sestavlja opis restavracije na levi strani, za enkrat je to sample text, na desni strani pa je slika restavracije. 
- Drugi del predstavlja prikaz osnovnih kontaktnih informacij, čas delanja in Google Maps prikazuje lokacijo restavracije.

### 1.1.4 REZERVIRAJ MIZO
- Na vrhu se nahaja iskalna vrstica, pod njo se nahaja logotip, nato pa vsebina strani, kjer lahko rezerviramo mizo. 
- Na levi strani vnesemo ime, priimek, email, ura in število oseb za rezervacijo. 
- Na desni strani je koloder, ki omogoča premik po mesecih, kjer izberemo datum rezervacije. 
- Ob kliku naprej pridemo na izbiro jedi, kjer s klikom na gumb dodaj, dodamo željeno jed. 
- S klikom na gumb rezerviraj končamo rezervacijo. 
- Podatki zaključene rezervacije se prikažejo na strani rezervacij na nadzorni plošči.


## 1.2 NADZORNA PLOŠČA
Na vrhu nadzorne plošče je navigacijska vrstica, ki vsebuje naslednje povezave:
- Povezavo Al Dente, ki vodi do nadzorne plošče,
- Povezavo z Ikono oseba in ura, ki nas vodi do strani Rezervacije,
- Povezavo z Ikono koledar, ki nas vodi do strani Urnik,
- Povezavo z Ikono kovanci, ki nas vodi do strani Zaslužek,
- Povezavo z Ikono knjiga, ki nas vodi do strani Meni,
- Povezavo z Ikono zložene škatle, ki nas vodi do strani Zaloga;
- Povezavo z Ikono oseba in zobnik, ki nas vodi do strani Zaposleni,
- Dve povezavi z enakimi ikonami vilice ter noža, ki nas prva privede do strani Naročila strežba in druga do Naročila kuhinja. Ti dve povezavi se bodo potem prikazovale glede na prijavljenega uporabnika (npr. Če bo prijavljen natakar, se mu bo prikazala le stran Naročila strežba, če bo prijavljen kuhar, se mu bo prikazala le stran Naročila kuhinja).

Na desni strani navigacijske vrstice vidimo kateri uporabnik je prijavljen. Možnost imamo tudi odjave, ki nakazuje ikona vrat in puščice (izhod).

Pod navigacijsko vrstico imamo gumbe, ki nas vodijo do vseh strani, katerih imena so napisana v samem gumbu.

### 1.2.1 REZERVACIJE
- Na strani Upravljanje Rezervacij, zaposleni upravla z rezervacijami.
- Pod navigacijskem menijem(ki je enak na vseh straneh nadzorne plosce) je naslov strani Upravljanje Rezervacij.
- Klik na ikono vprasaj, desno od naslova, nam prikaze legendo ikon.
- Pod naslovom strani, so rezervacije razvrscene na: Nove rezervacije in Potrjene rezervacije.
- Na posamezni rezervaciji so  prikazane izbrane jedi menija in stranka. Vsaka rezervacija ima tudi stevilo rezerviranih mest z datumom in uro rezervacije. Na dnu rezervacije so tri ikone.Dve ikone so skupne obema tipoma rezervacij, in sicer: kontakt stranke in preklic rezervacije. Klik na ikono kontakt stranke odpre okno za posiljanje e-mail sporocila stranki. Okno ima polje za vnos besedila, gumb posli in gumb zapri. Klik na ikono  preklic rezervacije preklicemo rezervacijo. Nepotrjene rezervacije so se z ikono potrdi rezervacijo, s  katero zaposleni potrdi  rezervacijo. Potrjene rezervacije imajo se ikono pribora, ki rezervacijo sporocu v kuhinjo.

### 1.2.2 URNIK
- Na strani Urnik izmen, zaposleni pregleda svoj urnik izmen dela.
- Pod navigacijskem menijem je naslov strani Urnik izmen.
- Klik na ikono vprasaj, desno od naslova, nam prikaze legendo ikon.
- Pod naslovom strani, je trenutno izbrani mesec. S puscicami levo in desno zaposleni izbira mesec.
- V nadaljevanju se nahaja urnik zaposlenega, za izbrani mesec, ki prikazuje izmeno zaposlenega na posamezen dan v mesecu.

### 1.2.3 ZASLUŽEK
- Na strani Zasluzek, zaposleni pregleda prilive, odlive in zasluzek v posameznem mesecu.
- Pod navigacijskem menijem je naslov strani Zasluzek.
- Klik na ikono vprasaj, desno od naslova, nam prikaze legendo ikon.
- Pod naslovom strani, je trenutno izbrani mesec. S puscicami levo in desno zaposleni izbira mesec.
- Prikazani so prilivi, razlicni odlivi restavracije in mesecni zasluzek
- Ce si zeli zaposleni prilive ogledati bolj podrobno, sta na voljo 2 podrobnejsa ogleda, in sicer: Prilivi in Racuni. Prikazejo se nam tako, da kliknemo na puscico usmerjeno navzdol.
- Tako kot Zasluzek imajo tudi Prilivi in Racuni moznost izbora meseca.
- Prilivi nam prikaze prilive sredstev restavracije na dan v posameznem mesecu. Podatki o prilivih so prikazani tudi v obliki grafa.
- Racuni nam prikaze izdena racune v izbranem mesecu, locene v 2 skupini, in sicer: placani in neplacani.
- Na posameznem racunu je prikazana vrsta dobave blaga in opravjene storitve za stranko. Vsak racun ima svojo stevilko z datum in uro izdaje. Na dnu racuna so tri ikone, in sicer: kontakt stranke, storniraj racun in racun natisni. Klik na ikono kontakt stranke odpre okno za posiljanje e-mail sporocila stranki. Okno ima polje za vnos besedila, gumb posli in gumb zapri. Klik na ikono storniraj racun odpre potrditveno okno kjer svojo akcijo potrdimo ali ovrzemo z gumboma portdi in zapri. Klik na ikono natisni racun, odpre brskalnikovo okno za tiskalnik, kjer se lahko natisne racun.

### 1.2.4 MENI
- Na vrhu strani se nahaja navigacijska vrstica nadzorne plošče.
- Pod navigacijsko vrstico je gumb dodaj za dodajanje novih jedi, ob kliku na ta gumb se prikaže obrazec, ki je formuliran v datoteki nadzorna_plosca_meni-edit-add.html .
- Pri dodajanju jedi uporabnik vnese naslov/ime jedi, opis, ceno, kalorično vrednost in pa doda sliko. Kalorična vrednost se lahko vnese tudi preko food api kjer v prvo okno vnesemo ime sestavine v drugo pa količino nato pritisnemo na gumb, ki sproži api request na https://developer.edamam.com/edamam-nutrition-api ta nam vrne kalorično vrednost za sestavino . Sestavine, ki smo jih vključili se prikažejo v seznamu pod okencem za vnos zraven je tudi gumb za odstranjevanje te sestavine. Pod seznamom sestavin bo prikazana skupna kalorična vrednost sestavin (ta pogled je prikazan pri urejanju strani). Na dnu obrazca je gumb shrani, ki shrani jed.
- Sledi seznam jedi, ki so na jedliniku. Uporabnik lahko posamezno jedu uredi ali izbriše z klikom na gumba izbriši ali uredi. Obrazec za urejanje je prikazan v datoteki nadzorna_plosca_meni-edit-add.html .
- Pri urejanju jedi se prikaže enak obrazec kot pri dodajanju z razliko, da so v okencih že zapisane predhodne vrednosti, ki jih lahko mi nato poljubno spreminjamo. Na dnu obrazca je gum shrani, ki posodobi našo jed.
 
### 1.2.5 ZALOGA
- Na strani Zaloga imamo v tabeli napisane sestavine ter njihovo količino,
- Tabela se bo podatke dobila iz podatkovne baze,
- Možnost imamo izbire več elementov,
- Sestavine lahko tudi dodajamo z gumbom DODAJ, urejamo z gumbom UREDI in izbrišemo z gumbom IZBRIŠI,
- Nad tabelo je tudi iskalno polje v katerega lahko vpišemo sestavino, ki jo želimo najti.
- Nad zalogo bodo imeli pogled vsi zaposleni.

### 1.2.6 ZAPOSLENI
- Na strani Zaposleni imamo pregled nad zaposlenimi v naši restavraciji.
- Podatki, ki se bodo prikazali v tabeli bodo pridobljeni iz podatkovne baze
- Zaposlene lahko tudi dodajamo z gumbom DODAJ, urejamo z gumbom UREDI in izbrišemo z gumbom IZBRIŠI,
- Nad pregledom zaposlenih bodo imeli možnost vsi zaposleni
- Dodajanje, urejanje in brisanje bo dovoljeno le administratorju oziroma šefu.

### 1.2.7 NAROČILA-STREŽBA
- Na strani Naročila strežba ima natakar/natakarica, pregled nad naročenimi, pripravljenimi ter postreženimi jedmi,
- Stran je razdeljena v tri stolpce, prvi prikazuje naročene jedi, drugi pripravljene jedi in tretji postrežene jedi, če stran prikazujemo na telefonu se stolpci prikažejo en pod drugim,
- Vsak stolpec vsebuje naročila, ki so v obliki kvadrata z zaobljenimi robovi,
- Naročilo vsebuje zaporedno številko naročila, številko mize, datum, uro naročitve/začetka priprave/postrežbe naročila, ter jedi, ki so bile naročene, vsebuje tudi gumb s katerim potrdimo, da smo se naročilo lahko začne pripravljati, da je bilo naročilo postreženo ter možnost izdaje računa. Drugi gumb služi za preklic naročila.

### 1.2.8 NAROČILA-KUHINJA
- Na vrhu strani se nahaja navigacijska vrstica nadzorne plošče.
- Spodaj imamo dva stolpca “Naročila in “V pripravi”.
- V stolpcu “Naročila” so prikazana vsa naročila, ki jih morajo v kuhinji pripraviti. Naročilo ima elemente števlika / id naročila, miza na katero je naročilo vezano, datum, ura ob kateri je bilo naročilo vneseno in pa jedi, ki jih je potrebno pripravit. Spodaj sta še dva gumba sprejmi in zavrni, če pritisnemo gumb sprejmi se naročilo doda v pripravo, če kliknemo zavrni se naročilo izbriše.
- V stolpcu v pripravi so naročila, ki se v kuhinji že pripravljajo, dodana je še ura ob kateri se je priprava začela in pa spodnja gumba, prvi pomen, da je naročilo v celoti pripravljeno drugi pa odstrani naročilo iz priprave in ga doda nazaj med naročila.

## 1.3 Preverjanje izgleda v različnih brskalnikih

### 1.3.1 Primerjava razlicnih brskalnikov
Brskalnik, ki smo ga uporabljali tekom razvoja je bil Google chrome, stran smo testirali še na naslednjih brskalnikih:
### 1.3.2 Firefox
Blur(backdrop-filter: blur()) ne dela. Na nasi strani se to pokaze najbolje na nadzorna_plosca_menu.html, kjer gumbi nimajo zameglitve.
Ostalih razlik nismo opazili.
### 1.3.2 Edge
Ni bistvenih razlik v primerjavi s Google Chrome, to je pričakovano, saj Edge bazira na Chromu.

## 1.4 Zunanji vir
Za zunanji vir bomo uporabljali https://developer.edamam.com/food-database-api-docs. To bo integrirano v nadzorna plošča meni, kje se pri dodajanju novih jedi vpiše ime sestavin in pa njeno količino skupaj z mersko enoto, v odgovor pa prejmemo kalorično vrednost za to sestavino. Primer url za redeče jabolko 'https://api.edamam.com/api/food-database/v2/parser?ingr=red%20apple&app_id={your app_id}&app_key={your app_key} 

