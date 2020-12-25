import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

import { Rezervacija } from '../razredi/rezervacija'

@Injectable({
  providedIn: 'root'
})
export class RezervacijeService {

  private api_url = environment.api_url;

  constructor(private http: HttpClient) { }

  public pridobiRezervacije(id) {
    return this.http.get(this.api_url + '/rezervacija/' + id).toPromise().then(odgovor => odgovor as Rezervacija[])
      .catch(napaka => this.obdelajNapako(napaka))
  }

  public posodobiRezervacije(id, operacija) {
    return this.http.put(this.api_url + '/rezervacija/' + id + '/' + operacija, {}, { observe: 'response' }).toPromise()
      .catch(napaka => this.obdelajNapako(napaka));
  }

  public ustvariRezervacijo(payload) {
    return this.http.post(this.api_url + '/rezervacija', payload, { observe: 'response' }).toPromise()
      .catch(napaka => this.obdelajNapako(napaka));
  }

  public obdelajNapako(napaka) {
    console.log("Napaka pri pridobivanju rezervacij");
    return Promise.reject(napaka.message || napaka);
  }

}

