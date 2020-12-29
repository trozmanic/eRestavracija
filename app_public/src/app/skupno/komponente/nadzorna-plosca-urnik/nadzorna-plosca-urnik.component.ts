import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import { UrnikService } from "../../storitve/urnik.service"
import { UrnikRazred } from "../../razredi/urnik-razred";

@Component({
  selector: 'app-nadzorna-plosca-urnik',
  templateUrl: './nadzorna-plosca-urnik.component.html',
  styleUrls: ['./nadzorna-plosca-urnik.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NadzornaPloscaUrnikComponent implements OnInit {

  public urnik: UrnikRazred;

  public mesec: number;
  public leto: number;
  public uporabnik_id: String;

  public sporocilo: String;

  constructor(private urnikService: UrnikService) { }

  ngOnInit(): void {
    this.urnik = null;
    this.sporocilo="Pridobivam podatke iz API.";

    let dan = new Date();
    this.mesec = dan.getMonth();
    this.leto = dan.getFullYear();
    this.uporabnik_id = "5fb9bffbe155c41ee1e19cce"; //FIX
    this.urnikService.pridobiUrnik(this.mesec, this.leto, this.uporabnik_id)
      .then(u => {
        this.sporocilo = null;
        this.urnik = u;
      }).catch(napaka => {
      if (napaka.status && napaka.status == 404) {
        this.sporocilo="Ne najdem urnika s tem mescom, letom in uporabnik id.";
        this.urnik = null;
      } else {
        this.sporocilo="Napaka pri pridobivanju podatkov iz API.";
        this.urnik = null;
      }
    });
  }

  prev(): void {
    this.urnik = null;
    this.sporocilo="Pridobivam podatke iz API.";

    this.mesec--;
    if (this.mesec < 0) {
      this.leto--;
      this.mesec = 11;
    }
    this.urnikService.pridobiUrnik(this.mesec, this.leto, this.uporabnik_id)
      .then(u => {
        this.sporocilo = null;
        this.urnik = u;
      }).catch(napaka => {
      if (napaka.status && napaka.status == 404) {
        this.sporocilo="Ne najdem urnika s tem mescom, letom in uporabnik id.";
        this.urnik = null;
      } else {
        this.sporocilo="Napaka pri pridobivanju podatkov iz API.";
        this.urnik = null;
      }
    });
  }

  next(): void {
    this.urnik = null;
    this.sporocilo="Pridobivam podatke iz API.";

    this.mesec++;
    if (this.mesec > 11) {
      this.leto++;
      this.mesec = 0;
    }
    this.urnikService.pridobiUrnik(this.mesec, this.leto, this.uporabnik_id)
      .then(u => {
        this.sporocilo = null;
        this.urnik = u;
      }).catch(napaka => {
      if (napaka.status && napaka.status == 404) {
        this.sporocilo="Ne najdem urnika s tem mescom, letom in uporabnik id.";
        this.urnik = null;
      } else {
        this.sporocilo="Napaka pri pridobivanju podatkov iz API.";
        this.urnik = null;
      }
    });
  }

}
