import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'

import { UrnikRazred } from "../razredi/urnik-razred";
import {IdRazred} from "../razredi/id-razred";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UrnikService {

  private api_url = environment.api_url;

  constructor(private http: HttpClient,private authService:AuthService) { }

  private httpOptions={ headers: this.initHeaders() };

  private initHeaders(): HttpHeaders {
    return  new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.vrniZeton());
  }

  public pridobiUrnik(mesec, leto, uporabnik_id) {
    return this.http.get(this.api_url + '/urnik?mesec=' + mesec + '&leto=' + leto + '&uporabnik_id=' + uporabnik_id,this.httpOptions)
      .toPromise().then(odgovor => odgovor as UrnikRazred);
  }
  public posodobiUrnik(mesec, leto, uporabnik_id, urnik) {
    return this.http.put(this.api_url + '/urnik?mesec=' + mesec + '&leto=' + leto + '&uporabnik_id=' + uporabnik_id, urnik, this.httpOptions)
      .toPromise().catch(napaka => this.obdelajNapako(napaka));
      //.toPromise().then(odgovor => odgovor as UrnikRazred);

  }
  public createUrnik(mesec, leto, uporabnik_id, urnik) {
    return this.http.post(this.api_url + '/urnik?mesec=' + mesec + '&leto=' + leto + '&uporabnik_id=' + uporabnik_id, urnik,this.httpOptions )
      .toPromise().catch(napaka => this.obdelajNapako(napaka));
  }
  public deleteUrnik(id) {
    return this.http.delete(this.api_url + '/urnik?id=' + id,this.httpOptions)
      .toPromise().then(odgovor => odgovor as IdRazred);
  }
  public urnik_uporabnik(id) {
    return this.http.get(this.api_url + '/urnik/' + id,this.httpOptions)
      .toPromise().then(odgovor => odgovor as UrnikRazred[]);
  }

  /*
  public posodobiRezervacije(id, operacija) {
    return this.http.put(this.api_url + '/rezervacija/' + id + '/' + operacija, {}, { observe: 'response' }).toPromise()
      .catch(napaka => this.obdelajNapako(napaka));
  }

  public ustvariRezervacijo(payload) {
    return this.http.post(this.api_url + '/rezervacija', payload, { observe: 'response' }).toPromise()
      .catch(napaka => this.obdelajNapako(napaka));
  }
 */
  public obdelajNapako(napaka) {
    console.log("Napaka pri service urnik");
    return Promise.reject(napaka.message || napaka);
  }
}
