import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {User} from "../../razredi/user";

import { AuthService } from "../../storitve/auth.service"

@Component({
  selector: 'app-nadzorna-plosca-menu',
  templateUrl: './nadzorna-plosca-menu.component.html',
  styleUrls: ['./nadzorna-plosca-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NadzornaPloscaMenuComponent implements OnInit {

  public admin: String;
  public kuhar: String;
  public natakar: String;

  public uporabnik: User;

  constructor(private authService: AuthService) { }


  ngOnInit(): void {
    this.uporabnik = this.authService.vrniTrenutnegaUporabnika();
    //this.uporabnik = new User();//FIX
    //this.uporabnik.vloga = "admin";//FIX
    //this.uporabnik.ime = "Ime Priimek";//FIX

    this.admin = null;
    this.kuhar = null;
    this.natakar = null;

    if (this.uporabnik.vloga.localeCompare("admin") == 0) {
      this.admin = "admin";
    }
    if (this.uporabnik.vloga.localeCompare("kuhar") == 0) {
      this.kuhar = "kuhar";
    }
    if (this.uporabnik.vloga.localeCompare("natakar") == 0) {
      this.natakar = "natakar";
    }

  }

}
