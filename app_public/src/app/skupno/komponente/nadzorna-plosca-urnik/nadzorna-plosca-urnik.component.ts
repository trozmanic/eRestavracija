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

  constructor(private urnikService: UrnikService) { }

  ngOnInit(): void {
    let dan = new Date();
    this.mesec = dan.getMonth();
    this.leto = dan.getFullYear();
    this.uporabnik_id = "5fb9bffbe155c41ee1e19cce"; //FIX
    this.urnikService.pridobiUrnik(this.mesec, this.leto, this.uporabnik_id)
      .then(u => this.urnik = u);
  }

  prev(): void {
    this.mesec--;
    if (this.mesec < 0) {
      this.leto--;
      this.mesec = 11;
    }
    this.urnikService.pridobiUrnik(this.mesec, this.leto, this.uporabnik_id)
      .then(u => this.urnik = u);
  }

  next(): void {
    this.mesec++;
    if (this.mesec > 11) {
      this.leto++;
      this.mesec = 0;
    }
    this.urnikService.pridobiUrnik(this.mesec, this.leto, this.uporabnik_id)
      .then(u => this.urnik = u);
  }

}
