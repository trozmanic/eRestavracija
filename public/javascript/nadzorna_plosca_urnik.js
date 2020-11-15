//works with api_simulation
//api url /api/urnik
//        /api/urnik?user=id&year=2020&month=10
//v api fix, ce ni meseca, da doda nov mesec prazen in ga vrne, vrne prazen array.
//leto je normalno stevilka
//mesec je 0-11 !!!!!!

var danes;
var leto;
var mesec;

var gumb_prejsni_mesec;
var gumb_naslednji_mesec;

var napisi_naslov = function (leto_local, mesec_local) {
    var mesec_string;
    switch(parseInt(mesec_local)) {
        case 1:
            mesec_string = "Januar";
            break;
        case 2:
            mesec_string = "Februar";
            break;
        case 3:
            mesec_string = "Marec";
            break;
        case 4:
            mesec_string = "April ";
            break;
        case 5:
            mesec_string = "Maj";
            break;
        case 6:
            mesec_string = "Junij";
            break;
        case 7:
            mesec_string = "Julij";
            break;
        case 8:
            mesec_string = "Avgust";
            break;
        case 9:
            mesec_string = "September";
            break;
        case 10:
            mesec_string = "Oktober";
            break;
        case 11:
            mesec_string = "November";
            break;
        case 12:
            mesec_string = "December ";
            break;
        default:
            sprazni_napaka();
            console.log("Napacen mesec pri naslovu\n");
            return;
    }

    var naslov_datum = document.getElementById("naslov_datum");
    naslov_datum.innerHTML = mesec_string + " " + leto_local.toString();
}

var sprazni_napaka = function () {
    var id_p;
    var i;
    for (i = 0; i < 42; i++) {
        id_p = "p_dan_" + i.toString();
        p_d = document.getElementById(id_p);
        p_d.innerHTML = "";
    }
    var naslov_datum = document.getElementById("naslov_datum");
    naslov_datum.innerHTML = "Nekaj je slo narobe";
}
var sprazni = function () {
    var id_p;
    var i;
    for (i = 0; i < 42; i++) {
        id_p = "p_dan_" + i.toString();
        p_d = document.getElementById(id_p);
        p_d.innerHTML = "";
    }
}

var kolendar = function (leto_local, mesec_local) {
    var zahteva = new XMLHttpRequest();
    var request_naslov = "/api_simulation/urnik_0_" + leto_local+ "_" + mesec_local +".json";
    zahteva.open("GET", request_naslov, true);
    zahteva.addEventListener("load", function() {

        if (zahteva.status == 404) {
            sprazni_napaka();
            console.log("404 API request ni uspel.\n");
            return;
        }

        var urnik = JSON.parse(zahteva.responseText);

        if (urnik.data) {
            if (urnik.data.dnevi && urnik.data.st_dni && urnik.data.leto && urnik.data.mesec && urnik.data.zac_dan) {
                if (urnik.data.dnevi.length == urnik.data.st_dni) {
                    var dnevi = urnik.data.dnevi;
                    var leto_nov = parseInt(urnik.data.leto);
                    var mesec_nov = parseInt(urnik.data.mesec);
                    var st_dni = parseInt(urnik.data.st_dni);
                    var zac_dan = urnik.data.zac_dan;

                    napisi_naslov(leto_nov, mesec_nov);
                    sprazni();

                    var zacetni_dan;

                    switch(zac_dan) {
                        case "pon":
                            zacetni_dan = 0;
                            break;
                        case "tor":
                            zacetni_dan = 1;
                            break;
                        case "sre":
                            zacetni_dan = 2;
                            break;
                        case "cet":
                            zacetni_dan = 3;
                            break;
                        case "pet":
                            zacetni_dan = 4;
                            break;
                        case "sob":
                            zacetni_dan = 5;
                            break;
                        case "ned":
                            zacetni_dan = 6;
                            break;
                        default:
                            sprazni_napaka();
                            console.log("Nedifiniran zac_dan\n");
                            return;
                    }
                    var id_p;
                    var p_d;

                    var i;
                    for (i = 0; i < st_dni; i++) {
                        id_p = "p_dan_" + (i + zacetni_dan).toString();
                        p_d = document.getElementById(id_p);
                        p_d.innerHTML = (i + 1).toString() + " " + dnevi[i];
                    }
                } else {
                    sprazni_napaka();
                    console.log("Dolzina tabele dnevi in st_dni ni enakon\n");
                }
            } else {
                sprazni_napaka();
                console.log("Ni vseh podatkov\n");
            }
        } else {
            sprazni_napaka();
            console.log("Ni data objekta\n");
        }
    });
    zahteva.send(null);
}


//ko se nalozi pozeni
window.onload = function() {
  danes = new Date();
  leto = danes.getFullYear();
  mesec = danes.getMonth() + 1;

    gumb_prejsni_mesec = document.getElementById("gumb_prejsni_mesec");
    gumb_prejsni_mesec.addEventListener("click", function() {
        mesec--;
        if (mesec < 1) {
            mesec = 12;
            leto--;
        }
        kolendar(leto, mesec);

    });
    gumb_naslednji_mesec = document.getElementById("gumb_naslednji_mesec");
    gumb_naslednji_mesec.addEventListener("click", function() {
        mesec++;
        if (mesec > 12) {
            mesec = 1;
            leto++;
        }
        kolendar(leto, mesec);

    });

  napisi_naslov(leto, mesec);
  kolendar(leto, mesec);

};