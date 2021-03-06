import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Zaloga } from '../razredi/zaloga';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZalogaService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  private api_url = environment.api_url;

  private initHeaders(): HttpHeaders {
    return  new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.vrniZeton());
  }

  public pridobiSestavine(query: any): Observable<any>{
    return this.http.get(this.api_url + '/zaloga?' + query, { headers: this.initHeaders(), observe: 'response' });
  }

  public dodajSestavino(sestavina: any): Promise<Zaloga>{
    /*
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('edugeocache-zeton')}`
      })
    };
     *//*                                                    , httpLastnosti) */
    return this.http.post(this.api_url + '/zaloga', sestavina, { headers: this.initHeaders()}).toPromise().then(odgovor => odgovor as Zaloga)
      .catch(napaka => this.obdelajNapako(napaka));
  }

  public posodobiSestavino(sestavina: any): Promise<Zaloga>{
    /*
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('edugeocache-zeton')}`
      })
    };
     *//*                                                      , httpLastnosti) */
    return this.http.put(this.api_url + '/zaloga', sestavina, { headers: this.initHeaders()}).toPromise().then(odgovor => odgovor as Zaloga)
      .catch(napaka => this.obdelajNapako(napaka));
  }

  public odstraniSestavino(id: string): Promise<any>{
    /*
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('edugeocache-zeton')}`
      })
    };
     *//*                                                      , httpLastnosti) */
    return this.http.delete(this.api_url + '/zaloga/' + id, { headers: this.initHeaders()}).toPromise().then(null)
      .catch(napaka => this.obdelajNapako(napaka));
  }

  public obdelajNapako(napaka: any): Promise<any> {
    console.log('Napaka pri zalogi: ' + napaka.stringify);
    return Promise.reject(napaka.message || napaka);
  }
}
