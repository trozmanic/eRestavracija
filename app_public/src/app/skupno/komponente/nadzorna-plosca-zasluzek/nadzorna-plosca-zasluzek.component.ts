import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import { ZasluzekService } from "../../storitve/zasluzek.service"
import { ZasluzekRazred } from "../../razredi/zasluzek-razred";

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

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





  constructor(private zasluzekService: ZasluzekService) { }

  public nastaviSpremenljivke(z: ZasluzekRazred) {
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
    this.zasluzek = null;
    this.sporocilo="Pridobivam podatke iz API.";

    let dan = new Date();
    this.mesec = dan.getMonth();
    this.leto = dan.getFullYear();
    this.uporabnik_id = "5fb9bffbe155c41ee1e19cce"; //FIX
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
    this.zasluzekService.izbrisiRacun(id)
      .then(z => {
        //TODO {"id":"5fc18197fdd6f02d1f330109"}  naredi razred
        //napisi uspesno zbrisano, iz zasluzga narocila odstrani iz taprave tabele objekt
        //this.nastaviSpremenljivke(z)
      })
      .catch(napaka => {
        //napisi napaka brisanja
        if (napaka.status && napaka.status == 404) {
          this.sporocilo="Ne najdem niti enega narocila s tem mescom in letom.";
          this.zasluzek = null;
        } else {
          this.sporocilo="Napaka pri pridobivanju podatkov iz API.";
          this.zasluzek = null;
        }
      });
  }

}

//zbrisi v modul.ts urnik/:id route
