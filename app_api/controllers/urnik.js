const mongoose=require("mongoose");
const Urnik = mongoose.model("Urnik");
const Zaposleni = mongoose.model("Zaposlen");

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
        dnevi[i] = urnik[i-prviDan];
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

const pridobiUrnik = (req, res) => {
    try {
        var id = req.query.uporabnik_id;
        var mesec = req.query.mesec;
        var leto = req.query.leto;
        //preveri ce uporabnik obstaja
        if (id) {
            Zaposleni.find({id_uporabnika:id}).exec( (napaka, uporabnik) => {
                if (!uporabnik || !uporabnik[0]) {
                    return res.status(404).json({
                        "sporocilo": "Ne najdem uporabnika s tem id."
                    });
                } else if (napaka) {
                    return res.status(500).json(napaka);
                }
                //preveri mesec, leto, in set ce ni prov
                var dan = new Date();
                if (!mesec || mesec > 11 || mesec < 0) {
                    mesec = dan.getMonth();
                }
                if (!leto || leto > 2099 || leto < 1901) {
                    leto = dan.getFullYear();
                }
                //preveri ce je ta urnik ze
                Urnik.find({id_uporabnika:id,leto:leto,mesec:mesec}, (napaka2, urnik) => {
                    if (napaka2) {
                        return res.status(500).json(napaka2);
                    }
                    if (urnik.length < 1) {
                        //nimamo urnika, ustvari
                        //leto, mesec, id_uporabnika imamo
                        var st_dni = daysInMonth(mesec, leto);
                        var dneviArr = narediPrazenUrnik(st_dni);
                        var zac_dan = priviDanVMesecu(mesec, leto);
                        Urnik.create({
                            id_uporabnika: id,
                            dnevi: dneviArr,
                            leto: leto,
                            mesec: mesec,
                            st_dni: st_dni,
                            zac_dan: zac_dan
                        }, (napaka3, urnik2) => {
                            if (napaka3) {
                                return res.status(500).json(napaka3);
                            } else {
                                //preoblikuj
                                urnik2.dnevi = preoblikuj(urnik2.dnevi, urnik2.zac_dan);
                                return res.status(200).send(urnik2);
                            }
                        });
                    } else {
                        //imamo urnik vrni
                        //preoblikuj
                        urnik[0].dnevi = preoblikuj(urnik[0].dnevi, urnik[0].zac_dan);
                        return res.status(200).send(urnik[0]);
                    }
                });
            });
        } else {
            return res.status(400).send({"error_message": "Specify user ID"})
        }
    } catch (err) {
        res.status(500).json({"error_message": err});
    }
}

const posodobiUrnik = (req, res) => {
    try {
        var id = req.query.uporabnik_id;
        var mesec = req.query.mesec;
        var leto = req.query.leto;
        //preveri ce uporabnik obstaja
        if (id) {
            Zaposleni.find({id_uporabnika:id}).exec( (napaka, uporabnik) => {
                if (!uporabnik || !uporabnik[0]) {
                    return res.status(404).json({
                        "sporocilo": "Ne najdem uporabnika s tem id."
                    });
                } else if (napaka) {
                    return res.status(500).json(napaka);
                }
                //preveri mesec, leto, in set ce ni prov
                var dan = new Date();
                if (!mesec || mesec > 11 || mesec < 0) {
                    mesec = dan.getMonth();
                }
                if (!leto || leto > 2099 || leto < 1901) {
                    leto = dan.getFullYear();
                }
                //preveri ce je ta urnik ze
                Urnik.find({id_uporabnika:id,leto:leto,mesec:mesec}).exec((napaka2, urnik) => {
                    if (napaka2) {
                        return res.status(500).json(napaka2);
                    }
                    if (urnik.length < 1) {
                        return res.status(404).json({
                            "sporocilo": "Urnik ne obstaja."
                        });
                    } else {
                        //imamo urnik vrni, preveri podatke
                        var statoSt_dni = parseInt(urnik[0].st_dni.toString());
                        var stariZac_dan = urnik[0].zac_dan;
                        //naredi objekt iz tega
                        var noviUrnik = req.body;
                        var novoSt_dni = parseInt(noviUrnik.st_dni.toString());
                        var novoZac_dan = noviUrnik.zac_dan;
                        if ( statoSt_dni == novoSt_dni && stariZac_dan.localeCompare(novoZac_dan) == 0) {
                            //preoblikuj v tapravo tabelo
                            noviUrnik.dnevi = preoblikujNazaj(noviUrnik.dnevi, stariZac_dan, statoSt_dni);

                            urnik[0].dnevi = noviUrnik.dnevi

                            urnik[0].save((napaka3, urnik2) => {
                                if (napaka3) {
                                    return res.status(404).json(napaka3);
                                } else {
                                    //preoblikuj
                                    urnik2.dnevi = preoblikuj(urnik2.dnevi, urnik2.zac_dan);
                                    return res.status(200).send(urnik2);
                                }
                            });
                        } else {
                            return res.status(404).json({
                                "sporocilo": "Spremenili ste nekaj kar nebi smeli."
                            });
                        }
                    }
                });
            });
        } else {
            return res.status(400).send({"error_message": "Specify user ID"})
        }
    } catch (err) {
        res.status(500).json({"error_message": err});
    }
}

module.exports = {
    pridobiUrnik,
    posodobiUrnik
}