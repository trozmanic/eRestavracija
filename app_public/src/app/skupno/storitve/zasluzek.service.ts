import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

import { ZasluzekRazred } from "../razredi/zasluzek-razred";

@Injectable({
  providedIn: 'root'
})
export class ZasluzekService {

  private api_url = environment.api_url;

  constructor(private http: HttpClient) { }

  public pridobiZasluzek(mesec, leto, uporabnik_id) {
    return this.http.get(this.api_url + '/zasluzek?mesec=' + mesec + '&leto=' + leto + '&uporabnik_id=' + uporabnik_id)
      .toPromise().then(odgovor => odgovor as ZasluzekRazred);
  }

  public izbrisiRacun(id) {
    return this.http.delete(this.api_url + '/narocila/' + id)
      .toPromise().then(odgovor => odgovor as ZasluzekRazred);
    //TODO {"id":"5fc18197fdd6f02d1f330109"}  naredi razred
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
    console.log("Napaka pri service zasluzek");
    return Promise.reject(napaka.message || napaka);
  }
}
