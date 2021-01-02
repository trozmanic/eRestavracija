import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../storitve/auth.service"

import {User} from "../../razredi/user";
import {LinkRazred} from "../../razredi/link-razred";

@Component({
  selector: 'app-nadzorna-plosca',
  templateUrl: './nadzorna-plosca.component.html',
  styleUrls: ['./nadzorna-plosca.component.css']
})
export class NadzornaPloscaComponent implements OnInit {

  constructor(private authService: AuthService) { }

  public uporabnik: User;
  public links: LinkRazred[];

  ngOnInit(): void {
    //this.uporabnik = this.authService.vrniTrenutnegaUporabnika();//TODO
    this.uporabnik = this.authService.vrniTrenutnegaUporabnika();
    console.log(this.uporabnik);
    this.uporabnik = this.authService.vrniTrenutnegaUporabnika();
    //this.uporabnik = new User();//FIX
    //this.uporabnik.vloga = "admin";//FIX
    //this.uporabnik.ime = "Ime Priimek";//FIX

    this.links = [];

    let tmp: LinkRazred;

    if (this.uporabnik.vloga.localeCompare("admin") == 0) {

      tmp = new LinkRazred();
      tmp.icon = "far fa-calendar-alt";
      tmp.l = "urnik";
      this.links.push(tmp);

      tmp = new LinkRazred();
      tmp.icon = "fas fa-user-clock";
      tmp.l = "rezervacije";
      this.links.push(tmp);

      tmp = new LinkRazred();
      tmp.icon = "fas fa-utensils";
      tmp.l = "natakar";
      this.links.push(tmp);

      tmp = new LinkRazred();
      tmp.icon = "fas fa-utensils";
      tmp.l = "kuhar";
      this.links.push(tmp);

      tmp = new LinkRazred();
      tmp.icon = "fas fa-book-open";
      tmp.l = "meni";
      this.links.push(tmp);

      tmp = new LinkRazred();
      tmp.icon = "fas fa-boxes";
      tmp.l = "zaloga";
      this.links.push(tmp);

      tmp = new LinkRazred();
      tmp.icon = "fas fa-coins";
      tmp.l = "zasluzek";
      this.links.push(tmp);

      tmp = new LinkRazred();
      tmp.icon = "fas fa-user-cog";
      tmp.l = "zaposleni";
      this.links.push(tmp);
    }
    if (this.uporabnik.vloga.localeCompare("kuhar") == 0) {

      tmp = new LinkRazred();
      tmp.icon = "far fa-calendar-alt";
      tmp.l = "urnik";
      this.links.push(tmp);

      tmp = new LinkRazred();
      tmp.icon = "fas fa-utensils";
      tmp.l = "kuhar";
      this.links.push(tmp);

      tmp = new LinkRazred();
      tmp.icon = "fas fa-book-open";
      tmp.l = "meni";
      this.links.push(tmp);

      tmp = new LinkRazred();
      tmp.icon = "fas fa-boxes";
      tmp.l = "zaloga";
      this.links.push(tmp);
    }
    if (this.uporabnik.vloga.localeCompare("natakar") == 0) {

      tmp = new LinkRazred();
      tmp.icon = "far fa-calendar-alt";
      tmp.l = "urnik";
      this.links.push(tmp);

      tmp = new LinkRazred();
      tmp.icon = "fas fa-user-clock";
      tmp.l = "rezervacije";
      this.links.push(tmp);

      tmp = new LinkRazred();
      tmp.icon = "fas fa-utensils";
      tmp.l = "natakar";
      this.links.push(tmp);
    }

  }

}
