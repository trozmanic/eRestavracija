import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrnikRazred } from '../../razredi/urnik-razred';
import { AuthService } from '../../storitve/auth.service';
import { UrnikService } from '../../storitve/urnik.service';

@Component({
  selector: 'app-nadzorna-plosca-urnik-list',
  templateUrl: './nadzorna-plosca-urnik-list.component.html',
  styleUrls: ['./nadzorna-plosca-urnik-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NadzornaPloscaUrnikListComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private urnikService: UrnikService, private authService: AuthService) { }

  public urniki: UrnikRazred[];

  public uporabnik_id;
  public sporocilo = "Pridobivam podatke iz API";

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let uporabnik_id = params.uporabnik;
      this.urnikService.urnik_uporabnik(uporabnik_id)
        .then(u => {
          this.sporocilo = null;
          this.urniki = u;
        }).catch(napaka => {
          if (napaka.status && napaka.status == 404) {
            this.sporocilo = "Ne najdem urnika s tem mescom, letom in uporabnik id.";
            this.urniki = null;
          } else {
            this.sporocilo = "Napaka pri pridobivanju podatkov iz API.";
            this.urniki = null;
          }
        });
    })
  }
}
