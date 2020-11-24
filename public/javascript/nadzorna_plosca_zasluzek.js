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

};