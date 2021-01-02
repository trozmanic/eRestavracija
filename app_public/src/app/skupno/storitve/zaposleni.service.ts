import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Uporabnik} from '../razredi/uporabnik';
import {Placa} from '../razredi/placa';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ZaposleniService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  private api_url = environment.api_url;

  private initHeaders(): HttpHeaders {
    return  new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.vrniZeton());
  }

  public pridobiZaposlene(): Promise<Uporabnik[]>{
    const httpOptions = {
      headers: this.initHeaders()
    };
    return this.http.get(this.api_url + '/zaposleni', httpOptions).toPromise().then(odgovor => odgovor as Uporabnik[])
      .catch(napaka => this.obdelajNapako(napaka));
  }

  public dodajZaposlenega(zaposleni: any): Promise<Uporabnik>{
    const httpOptions = {
      headers: this.initHeaders()
    };
    return this.http.post(this.api_url + '/uporabniki', zaposleni, httpOptions).toPromise().then(odgovor => odgovor as Uporabnik)
      .catch(napaka => this.obdelajNapako(napaka));
  }

  public posodobiZaposlenega(zaposleni: any): Promise<Uporabnik>{
    const httpOptions = {
      headers: this.initHeaders()
    };
    return this.http.put(this.api_url + '/uporabniki', zaposleni, httpOptions).toPromise().then(odgovor => odgovor as Uporabnik)
      .catch(napaka => this.obdelajNapako(napaka));
  }

  public posodobiPlaco(placa: any): Promise<Placa>{
    const httpOptions = {
      headers: this.initHeaders()
    };
    return this.http.put(this.api_url + '/zaposleni', placa, httpOptions).toPromise().then(odgovor => odgovor as Placa)
      .catch(napaka => this.obdelajNapako(napaka));
  }

  public odstraniZaposlenega(id: string): Promise<any>{
    const httpOptions = {
      headers: this.initHeaders()
    };
    return this.http.delete(this.api_url + '/uporabniki/' + id, httpOptions).toPromise()
      .catch(napaka => this.obdelajNapako(napaka));
  }

  public obdelajNapako(napaka: any): Promise<any> {
    console.log('Napaka pri zaposlenih' + napaka);
    return Promise.reject(napaka.message || napaka);
  }
}
