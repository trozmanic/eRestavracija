import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { SHRAMBA_BRSKALNIKA } from '../razredi/shramba';
import {userRegister} from "../razredi/userRegister";
import {RezultatAvtentikacije} from "../razredi/rezultat-avtentikacije";
import {userLogin} from "../razredi/userLogin";
import {Uporabnik} from "../razredi/uporabnik";
import {User} from "../razredi/user";
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api_url = environment.api_url;

  constructor(private http: HttpClient, @Inject(SHRAMBA_BRSKALNIKA) private shramba: Storage, private router: Router) { }

  public registrirajUporabnika (uporabnik: userRegister): Promise<RezultatAvtentikacije> {
    console.log(uporabnik);
    return this.http.post(this.api_url + '/registracija', uporabnik).toPromise()
      .then((odgovor) => {
        this.shraniZeton(odgovor['token']);
        return odgovor as RezultatAvtentikacije;
      })
      .catch(this.obdelajNapako);
  }

  public prijaviUporabnika (uporabnik: userLogin): Promise<RezultatAvtentikacije> {
    return this.http.post(this.api_url + "/prijava", uporabnik).toPromise()
      .then((odgovor) => {
        this.shraniZeton(odgovor['token']);
        return odgovor as RezultatAvtentikacije;
      })
      .catch(this.obdelajNapako);
  }

  public obdelajNapako(napaka) {
    console.log("Napaka pri pridobivanju menijev");
    return Promise.reject(napaka.message || napaka);
  }

  public vrniZeton(): string {
    return this.shramba.getItem('token');
  }

  public shraniZeton(zeton: string): void {
    this.shramba.setItem('token', zeton);
  }

  public odjava(): void {
    this.shramba.removeItem('token');
  }

  public jePrijavljen(): boolean {
    const token: string = this.vrniZeton();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    }
    else {
      return false;
    }
  }

  public vrniTrenutnegaUporabnika(): User {
    if (this.jePrijavljen()) {
      const token: string = this.vrniZeton();
      return JSON.parse(atob(token.split('.')[1]));
    }
  }

  //
  // public vrniTrenutnegaUporabnika(): Uporabnik {
  //   if (this.jePrijavljen()) {
  //
  //   }
  // }

}
