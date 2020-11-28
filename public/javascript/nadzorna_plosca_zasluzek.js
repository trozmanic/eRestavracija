var gumbi_placani;
var bumbi_ne_placani;

var placani_tabela;
var ne_placani_tabela;

const natisni_actual = (id) => {
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title>' + 'Racun'  + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + 'Racun'  + '</h1>');
    mywindow.document.write(document.getElementById(id).innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
}

const natisni = (placaniJE, id) => {
    var i;
    if (placaniJE.localeCompare("placani") == 0) {
        for (i = 0; i < placani_tabela.length; i++) {
            if (placani_tabela[i]._id.localeCompare(id) == 0) {
                natisni_actual(id);
            }
        }
    } else if (placaniJE.localeCompare("ne_placani") == 0) {
        for (i = 0; i < ne_placani_tabela.length; i++) {
            if (ne_placani_tabela[i]._id.localeCompare(id) == 0) {
                natisni_actual(id);
            }
        }
    } else {
        console.log("napaka printa!")
        return;
    }
}


window.onload = function() {
    var osi;
    var podatki;

    var osi_html;
    var podatki_html;

    osi_html = document.getElementById("oznake_osi");
    podatki_html = document.getElementById("zasluzek_dnevi");

    osi = osi_html.innerHTML;
    podatki = podatki_html.innerHTML;

    osi = JSON.parse(osi);
    podatki = JSON.parse(podatki);

    var colors = ['#FFFFFF','#35313b','#333333','#c3e6cb','#dc3545','#6c757d'];
    var chartData = {
        labels: osi.osi,
        datasets: [{
            label: 'Zasluzek na dan v $',
            data: podatki.podatki,
            backgroundColor: 'transparent',
            borderColor: colors[0],
            borderWidth: 4,
            pointBackgroundColor: colors[0]
        }]
    };

    var chLine = document.getElementById("chLine");
    if (chLine) {
        new Chart(chLine, {
            type: 'line',
            data: chartData,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor : colors[0]
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'prilivi',
                            fontColor : colors[0]
                        }
                    }],
                    xAxes: [{
                        ticks:{
                            fontColor : colors[0]
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'dnevi v mesecu',
                            fontColor : colors[0]
                        }
                    }]
                },
                legend: {
                    display: true
                }
            }
        });
    }

    var placani;
    var ne_placani;

    var placani_html;
    var ne_placani_html;

    placani_html = document.getElementById("zasluzek_placani");
    ne_placani_html = document.getElementById("zasluzek_ne_placani");

    placani = placani_html.innerHTML;
    ne_placani = ne_placani_html.innerHTML;

    placani_tabela = JSON.parse(placani);
    ne_placani_tabela = JSON.parse(ne_placani);

    gumbi_placani = new Array(placani_tabela.length);
    bumbi_ne_placani = new Array(ne_placani_tabela.length);

    var temp_button;
    var i;
    for (i = 0; i < placani_tabela.length; i++) {
        (function() {
            var tempButton = placani_tabela[i]._id + "_natisni";
            var idid = placani_tabela[i]._id;
            gumbi_placani[i] = document.getElementById(tempButton);
            gumbi_placani[i].addEventListener("click", function() {
                natisni("placani", idid);
            });
        })();
    }
    for (i = 0; i < ne_placani_tabela.length; i++) {
        (function() {
            var tempButton = ne_placani_tabela[i]._id + "_natisni";
            var idid = ne_placani_tabela[i]._id;
            bumbi_ne_placani[i] = document.getElementById(tempButton);
            bumbi_ne_placani[i].addEventListener("click", function() {
                natisni("ne_placani", idid);
            });
        })();
    }
};