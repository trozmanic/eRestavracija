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
    let dan = new Date();
    this.mesec = dan.getMonth();
    this.leto = dan.getFullYear();
    this.uporabnik_id = "5fb9bffbe155c41ee1e19cce"; //FIX
    this.zasluzekService.pridobiZasluzek(this.mesec, this.leto, this.uporabnik_id)
      .then(z => this.nastaviSpremenljivke(z));
  }

  prev(): void {
    this.zasluzek = null;
    this.mesec--;
    if (this.mesec < 0) {
      this.leto--;
      this.mesec = 11;
    }
    this.zasluzekService.pridobiZasluzek(this.mesec, this.leto, this.uporabnik_id)
      .then(z => this.nastaviSpremenljivke(z));
  }

  next(): void {
    this.zasluzek = null;
    this.mesec++;
    if (this.mesec > 11) {
      this.leto++;
      this.mesec = 0;
    }
    this.zasluzekService.pridobiZasluzek(this.mesec, this.leto, this.uporabnik_id)
      .then(z => this.nastaviSpremenljivke(z));
  }

}
