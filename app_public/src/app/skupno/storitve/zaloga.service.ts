import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Zaloga } from '../razredi/zaloga';

@Injectable({
  providedIn: 'root'
})
export class ZalogaService {

  constructor(private http: HttpClient) { }

  private api_url = environment.api_url;

  public pridobiSestavine(){
    return this.http.get(this.api_url + '/zaloga').toPromise().then(odgovor => odgovor as Zaloga[])
      .catch(napaka => this.obdelajNapako(napaka))
  }

  public dodajSestavino(){
    return true;
  }

  public obdelajNapako(napaka) {
    console.log("Napaka pri pridobivanju zaloge" + napaka);
    return Promise.reject(napaka.message || napaka);
  }
  public dodajKomentarLokaciji(lokacija_id: any, novKomentar: any) {

  }
}
