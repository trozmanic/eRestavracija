import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

import { Uporabnik } from '../razredi/uporabnik';

@Injectable({
  providedIn: 'root'
})
export class UporabnikService {

  private api_url = environment.api_url;

  constructor(private http: HttpClient) { }

  public pridobiUporabnike(id) {
    return this.http.get(this.api_url + '/uporabniki/' + id).toPromise().then(odgovor => odgovor as Uporabnik)
      .catch(napaka => this.obdelajNapako(napaka))
  }

  public obdelajNapako(napaka) {
    console.log("Napaka pri pridobivanju uporabnikov");
    return Promise.reject(napaka.message || napaka);
  }
}
