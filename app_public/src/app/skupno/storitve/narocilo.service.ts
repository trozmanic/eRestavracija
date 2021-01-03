import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {NarocilaKuhar, NarocilaNatakar, NarociloCreatable, NarociloUpdetable, NarociloZaposleni} from '../razredi/narocilo';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Narocilo } from '../razredi/narocilo';


@Injectable({
  providedIn: 'root'
})
export class NarociloService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  private api_url = environment.api_url;

  public pridobiNarocila(): Promise<NarocilaKuhar>{
    const httpOptions = {
      headers: this.auth.initHeaders()
    };
    return this.http.get( this.api_url + '/narocila/kuhar', httpOptions).toPromise()
      .then(odgovor => odgovor as NarocilaKuhar)
      .catch(err => this.obdelajNapako(err));
  }

  public posodobiNarociloAuth(narociloUpd: NarociloUpdetable): Promise<any> {
    const httpOptions = {
      headers: this.auth.initHeaders()
    };
    return this.http.put(this.api_url + '/narocila', narociloUpd,  httpOptions).toPromise()
      .then(odgovor => odgovor)
      .catch(err => this.obdelajNapako(err));
  }

  public pridobiNarocilaNatakar(): Promise <NarocilaNatakar> {
    const httpOptions = {
      headers: this.auth.initHeaders()
    };
    return this.http.get(this.api_url + '/narocila/natakar', httpOptions).toPromise()
      .then(odgovor  => odgovor as NarocilaNatakar)
      .catch(err => this.obdelajNapako(err));
  }

  public kreirajNarocilo(narocilo: NarociloCreatable): Promise <any> {
    const httpOptions = {
      headers: this.auth.initHeaders()
    };
    return this.http.post(this.api_url + '/narocila', narocilo, httpOptions).toPromise()
      .then(odgovor => odgovor)
      .catch(err => this.obdelajNapako(err));
  }

  // tslint:disable-next-line:typedef
  public obdelajNapako(napaka) {
    console.log('Napaka pri pridobivanju narocil');
    return Promise.reject(napaka.message || napaka);
  }


  public posodobiNarocilo(id,narocilo:Narocilo){
    return this.http.put(this.api_url+'/narocila/'+id,narocilo).toPromise().then(odgovor=>odgovor as Narocilo);
  }
}
