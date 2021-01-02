import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

import { UrnikRazred } from "../razredi/urnik-razred";

@Injectable({
  providedIn: 'root'
})
export class UrnikService {

  private api_url = environment.api_url;

  constructor(private http: HttpClient) { }

  public pridobiUrnik(mesec, leto, uporabnik_id) {
    return this.http.get(this.api_url + '/urnik?mesec=' + mesec + '&leto=' + leto + '&uporabnik_id=' + uporabnik_id)
      .toPromise().then(odgovor => odgovor as UrnikRazred);
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
