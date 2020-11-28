const mongoose=require("mongoose");
const Narocila = mongoose.model("Narocilo");
const Zaposleni = mongoose.model("Zaposlen");
const Test = mongoose.model("TestDate");

const narediPrazenUrnik = (st_dni) => {
    var dnevi = new Array(st_dni);
    var i;
    for (i = 0; i < st_dni; i++) {
        dnevi[i] = " ";
    }
    return dnevi;
}
function daysInMonth (month, year) {
    month++;
    return new Date(year, month, 0).getDate();
}
function preoblikuj (urnik, zac_dan) {
    var dnevi = new Array(42);
    var prviDan = 0;
    zac_dan.localeCompare("pon") == 0 ? prviDan=0 : prviDan=prviDan;
    zac_dan.localeCompare("tor") == 0 ? prviDan=1 : prviDan=prviDan;
    zac_dan.localeCompare("sre") == 0 ? prviDan=2 : prviDan=prviDan;
    zac_dan.localeCompare("cet") == 0 ? prviDan=3 : prviDan=prviDan;
    zac_dan.localeCompare("pet") == 0 ? prviDan=4 : prviDan=prviDan;
    zac_dan.localeCompare("sob") == 0 ? prviDan=5 : prviDan=prviDan;
    zac_dan.localeCompare("ned") == 0 ? prviDan=6 : prviDan=prviDan;
    var i;
    for (i = prviDan; i < prviDan+urnik.length; i++) {
        dnevi[i] = urnik[i-prviDan] + "\u20AC";
    }
    return dnevi;
}
function preoblikujNazaj(urnik, zac_dan, st_dni) {
    var dnevi = new Array(st_dni);
    var prviDan = 0;
    zac_dan.localeCompare("pon") == 0 ? prviDan=0 : prviDan=prviDan;
    zac_dan.localeCompare("tor") == 0 ? prviDan=1 : prviDan=prviDan;
    zac_dan.localeCompare("sre") == 0 ? prviDan=2 : prviDan=prviDan;
    zac_dan.localeCompare("cet") == 0 ? prviDan=3 : prviDan=prviDan;
    zac_dan.localeCompare("pet") == 0 ? prviDan=4 : prviDan=prviDan;
    zac_dan.localeCompare("sob") == 0 ? prviDan=5 : prviDan=prviDan;
    zac_dan.localeCompare("ned") == 0 ? prviDan=6 : prviDan=prviDan;
    var i;
    for (i = 0; i < st_dni; i++) {
        dnevi[i] = urnik[i+prviDan];
    }
    return dnevi;
}
function priviDanVMesecu (month, year) {
    var d = new Date(year, month, 1);
    var weekday = new Array(7);
    weekday[0] = "ned";
    weekday[1] = "pon";
    weekday[2] = "tor";
    weekday[3] = "sre";
    weekday[4] = "cet";
    weekday[5] = "pet";
    weekday[6] = "sob";
    return weekday[d.getDay()];
}

const pridobiNarocilo = (req, res) => {
    var mesec = parseInt(req.query.mesec);
    var leto = parseInt(req.query.leto);
    var id = req.query.uporabnik_id;
    //preveri mesec in leto
    var dan = new Date();
    if (!mesec || mesec > 11 || mesec < 0) {
        mesec = dan.getMonth();
    }
    if (!leto || leto > 2099 || leto < 1901) {
        leto = dan.getFullYear();
    }
    var st_dnevov = daysInMonth(mesec, leto);
    var mesecZamaknejen = parseInt(mesec) + 1;
    var zacetek;
    var konec;
    //2020-11-24T16:43:48.951Z
    if (mesecZamaknejen < 10) {
        zacetek = leto + "-0" + mesecZamaknejen + "-" + "01";
        konec = leto + "-0" + mesecZamaknejen + "-" + st_dnevov;
    } else {
        zacetek = leto + "-" + mesecZamaknejen + "-" + "01";
        konec = leto + "-" + mesecZamaknejen + "-" + st_dnevov;
    }

    console.log(zacetek + " " + konec)

    Narocila.find({ datum_in_ura: { $gte: zacetek, $lte: konec } }).sort({datum_in_ura: 'descending'}).exec((napaka, narocila) => {
        if (napaka) {
            res.status(500).json(napaka);
        } else {
            //preveri ce je array pa da je vecji length od 0
            if (!narocila || narocila.length < 1) {
                return res.status(404).json({
                    "sporocilo": "Ne najdem niti enega narocila s tem mescom in letom."
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            //uporabi narocila:
            //-tabelo dnevov od 1 do st dni array stevil 1,2,3,...,20
            var ostevilceniDnevi = new Array(st_dnevov);
            var i;
            for (i = 0; i < st_dnevov; i++) {
                ostevilceniDnevi[i] = i + 1;
            }
            //-tabela dnev zasluzek init na 0
            var zasluzekDnevi = new Array(st_dnevov);
            for (i = 0; i < st_dnevov; i++) {
                zasluzekDnevi[i] = 0;
            }
            var j;
            var primerjalniDan;
            var danNiz;
            var treDan;
            for (i = 0; i < st_dnevov; i++) {
                treDan = i + 1;
                if (mesecZamaknejen < 10) {
                    danNiz = leto + "-0" + mesecZamaknejen;
                } else {
                    danNiz = leto + "-" + mesecZamaknejen;
                }
                if (treDan < 10) {
                    danNiz += "-0" + treDan;
                } else {
                    danNiz += "-" + treDan;
                }
                primerjalniDan = new Date(danNiz);
                for (j = 0; j < narocila.length; j++) {
                    if (narocila[j].datum_in_ura.getDate() ==  primerjalniDan.getDate() && narocila[j].stanje.localeCompare("placano") == 0) {
                        zasluzekDnevi[i] += narocila[j].cena;
                    }
                }
            }
            var dnevi = preoblikuj(zasluzekDnevi, priviDanVMesecu (mesec, leto));
            //ostevilceniDnevi, zasluzekDnevi, dnevi

            var skupno_prilivi = 0;
            for (i = 0; i < zasluzekDnevi.length; i++) {
                skupno_prilivi += zasluzekDnevi[i];
            }

            var zac_dan = priviDanVMesecu (mesec, leto);

            //racuni
            var tabelaPlacani = new Array();
            var tabelaNePlacani = new Array();
            for (i = 0; i < narocila.length; i++) {
                if(narocila[i].stanje.localeCompare("placano") == 0) {
                    tabelaPlacani.push(narocila[i]);
                } else if(narocila[i].stanje.localeCompare("postrezeno") == 0){
                    tabelaNePlacani.push(narocila[i]);
                }
            }

            Zaposleni.find().exec( (napaka2, uporabnik) => {
                if (!uporabnik || !uporabnik[0]) {
                    return res.status(404).json({
                        "sporocilo": "Ne najdem nobenega zaposlenega da bi zracunal strosek place."
                    });
                } else if (napaka2) {
                    return res.status(500).json(napaka2);
                }

                var zaposleni_strosek = 0;
                for (i = 0; i < uporabnik.length; i++) {
                    zaposleni_strosek += uporabnik[i].placa;
                }

                return res.status(200).send({
                    "ostevilceni_dnevi": ostevilceniDnevi,
                    "zasluzek_dnevi": zasluzekDnevi,
                    "dnevi": dnevi,
                    "skupno_prilivi":skupno_prilivi,
                    "mesec":mesec,
                    "leto":leto,
                    "zac_dan":zac_dan,
                    "uporabnik_id":id,
                    "st_dni":st_dnevov,
                    "tabele_placanil":tabelaPlacani,
                    "tabele_ne_placanil":tabelaNePlacani,
                    "zaposleni_strosek":zaposleni_strosek
                });

            });
        }
    });
}
const test = (req, res) => {
    Test.create({
        stanje: req.body.stanje,
        cena:req.body.cena
    }, (napaka, dodano) => {
        if (napaka) {
            res.status(400).json(napaka);
        } else {
            res.status(201).json(dodano);
        }
    });
}


module.exports = {
    pridobiNarocilo,
    test
}