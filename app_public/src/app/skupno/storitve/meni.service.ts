import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

import { MeniItem } from '../razredi/meniItem'

@Injectable({
  providedIn: 'root'
})
export class MeniService {

  private api_url = environment.api_url;

  constructor(private http: HttpClient) { }

  public pridobiMeni() {
    return this.http.get(this.api_url + '/meni').toPromise().then(odgovor => odgovor as MeniItem[])
      .catch(napaka => this.obdelajNapako(napaka))
  }

  public obdelajNapako(napaka) {
    console.log("Napaka pri pridobivanju menijev");
    return Promise.reject(napaka.message || napaka);
  }

}
