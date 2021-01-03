import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'

import { Rezervacija } from '../razredi/rezervacija'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RezervacijeService {

  private api_url = environment.api_url;
  private httpOptions={ headers: this.initHeaders() };

  constructor(private http: HttpClient,private authService: AuthService) { }

  private initHeaders(): HttpHeaders {
    return  new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.vrniZeton());
  }

  public pridobiRezervacije(id) {
    return this.http.get(this.api_url + '/rezervacija/' + id,this.httpOptions).toPromise().then(odgovor => odgovor as Rezervacija[])
      .catch(napaka => this.obdelajNapako(napaka))
  }

  public posodobiRezervacije(id, operacija) {
    return this.http.put(this.api_url + '/rezervacija/' + id + '/' + operacija, {}, this.httpOptions).toPromise()
      .catch(napaka => this.obdelajNapako(napaka));
  }

  public ustvariRezervacijo(payload) {
    return this.http.post(this.api_url + '/rezervacija', payload, this.httpOptions).toPromise()
      .catch(napaka => this.obdelajNapako(napaka));
  }

  public obdelajNapako(napaka) {
    console.log("Napaka pri pridobivanju rezervacij");
    return Promise.reject(napaka.message || napaka);
  }

}

