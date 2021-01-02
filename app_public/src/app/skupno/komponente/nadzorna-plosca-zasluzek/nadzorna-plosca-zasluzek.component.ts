import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import { ZasluzekService } from "../../storitve/zasluzek.service"
import { ZasluzekRazred } from "../../razredi/zasluzek-razred";

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { IdRazred } from "../../razredi/id-razred";

import {User} from "../../razredi/user";

import { AuthService } from "../../storitve/auth.service"

@Component({
  selector: 'app-nadzorna-plosca-zasluzek',
  templateUrl: './nadzorna-plosca-zasluzek.component.html',
  styleUrls: ['./nadzorna-plosca-zasluzek.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NadzornaPloscaZasluzekComponent implements OnInit {

  public zasluzek: ZasluzekRazred;

  public mesec: number;
  public leto: number;
  public uporabnik_id: String;

  public sporocilo: String;
  public sporocilo_delete: String;

  public uporabnik: User;

  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];

  public lineChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          fontColor : '#FFFFFF'
        },
        scaleLabel: {
          display: true,
          labelString: 'prilivi',
          fontColor : '#FFFFFF'
        }
      }],
      xAxes: [{
        ticks:{
          fontColor : '#FFFFFF'
        },
        scaleLabel: {
          display: true,
          labelString: 'dnevi v mesecu',
          fontColor : '#FFFFFF'
        }
      }]
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#FFFFFF',
      backgroundColor: 'transparent',
      pointBackgroundColor: '#FFFFFF',
    },
  ];
  public lineChartLegend = true;
  public lineChartPlugins = [];
  public lineChartType = 'line';





  constructor(private zasluzekService: ZasluzekService, private authService: AuthService) { }

  public nastaviSpremenljivke(z: ZasluzekRazred) {
    this.sporocilo_delete = null;
    this.sporocilo = null;
    this.zasluzek = z;
    this.lineChartData= [
      { data: this.zasluzek.zasluzek_dnevi, label: 'Zasluzek na dan v $', borderWidth: 4},
    ];
    this.lineChartLabels = new Array(z.ostevilceni_dnevi.length);
    let i;
    for(i = 0;i < z.ostevilceni_dnevi.length;i++) {
      this.lineChartLabels[i] = z.ostevilceni_dnevi[i].toString();
    }
  }

  ngOnInit(): void {
    this.uporabnik = this.authService.vrniTrenutnegaUporabnika();
    //this.uporabnik = new User();//FIX
    //this.uporabnik.vloga = "admin";//FIX
    //this.uporabnik.ime = "Ime Priimek";//FIX

    this.sporocilo_delete = null;
    this.zasluzek = null;
    this.sporocilo="Pridobivam podatke iz API.";

    let dan = new Date();
    this.mesec = dan.getMonth();
    this.leto = dan.getFullYear();
    this.uporabnik_id = this.uporabnik._id;
    this.zasluzekService.pridobiZasluzek(this.mesec, this.leto, this.uporabnik_id)
      .then(z => this.nastaviSpremenljivke(z))
      .catch(napaka => {
        if (napaka.status && napaka.status == 404) {
          this.sporocilo="Ne najdem niti enega narocila s tem mescom in letom.";
          this.zasluzek = null;
        } else {
          this.sporocilo="Napaka pri pridobivanju podatkov iz API.";
          this.zasluzek = null;
        }
      });
  }

  prev(): void {
    this.sporocilo_delete = null;
    this.zasluzek = null;
    this.sporocilo="Pridobivam podatke iz API.";
    this.mesec--;
    if (this.mesec < 0) {
      this.leto--;
      this.mesec = 11;
    }
    this.zasluzekService.pridobiZasluzek(this.mesec, this.leto, this.uporabnik_id)
      .then(z => this.nastaviSpremenljivke(z))
      .catch(napaka => {
        if (napaka.status && napaka.status == 404) {
          this.sporocilo="Ne najdem niti enega narocila s tem mescom in letom.";
          this.zasluzek = null;
        } else {
          this.sporocilo="Napaka pri pridobivanju podatkov iz API.";
          this.zasluzek = null;
        }
      });
  }

  next(): void {
    this.sporocilo_delete = null;
    this.zasluzek = null;
    this.sporocilo="Pridobivam podatke iz API.";
    this.mesec++;
    if (this.mesec > 11) {
      this.leto++;
      this.mesec = 0;
    }
    this.zasluzekService.pridobiZasluzek(this.mesec, this.leto, this.uporabnik_id)
      .then(z => this.nastaviSpremenljivke(z))
      .catch(napaka => {
        if (napaka.status && napaka.status == 404) {
          this.sporocilo="Ne najdem niti enega narocila s tem mescom in letom.";
          this.zasluzek = null;
        } else {
          this.sporocilo="Napaka pri pridobivanju podatkov iz API.";
          this.zasluzek = null;
        }
      });
  }

  izbrisi_racun(id, tabela): void {
    this.sporocilo_delete = "Brisem racun;";
    this.zasluzekService.izbrisiRacun(id)
      .then(idr => {
        let id_izbrisan: IdRazred;
        id_izbrisan = idr;

        let i;
        if(tabela == 0) {
          for (i=0; i < this.zasluzek.tabele_placanil.length; i++) {
            if (this.zasluzek.tabele_placanil[i]._id.localeCompare(idr.id) == 0) {
              this.zasluzek.tabele_placanil = this.zasluzek.tabele_placanil.splice(i, 1);
              break;
            }
          }

        }
        if (tabela == 1) {
          for (i=0; i < this.zasluzek.tabele_ne_placanil; i++) {
            if (this.zasluzek.tabele_ne_placanil[i]._id.localeCompare(idr.id) == 0) {
              this.zasluzek.tabele_ne_placanil = this.zasluzek.tabele_ne_placanil.splice(i, 1);
              break;
            }
          }
        }
        this.sporocilo_delete = "Racun izbrisan";
      })
      .catch(napaka => {
        if (napaka.status && napaka.status == 404) {
          this.sporocilo_delete = "Ne ne najdem tega racuna.";
        } else {
          this.sporocilo_delete = "API napaka.";
        }
      });
  }

  print_racun(id): void {
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

    return;
  }

  zapri_sporocilo(): void {
    this.sporocilo_delete = null;
  }

}
