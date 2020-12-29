import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Zaloga } from '../razredi/zaloga';

@Injectable({
  providedIn: 'root'
})
export class ZalogaService {

  constructor(private http: HttpClient) { }

  private api_url = environment.api_url;

  public pridobiSestavine(): Promise<Zaloga[]>{
    return this.http.get(this.api_url + '/zaloga').toPromise().then(odgovor => odgovor as Zaloga[])
      .catch(napaka => this.obdelajNapako(napaka));
  }

  public dodajSestavino(sestavina: any): Promise<Zaloga>{
    /*
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('edugeocache-zeton')}`
      })
    };
     *//*                                                    , httpLastnosti) */
    return this.http.post(this.api_url + '/zaloga', sestavina).toPromise().then(odgovor => odgovor as Zaloga)
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
    return this.http.put(this.api_url + '/zaloga', sestavina).toPromise().then(odgovor => odgovor as Zaloga)
      .catch(napaka => this.obdelajNapako(napaka));
  }

  public odstraniSestavino(id: any): Promise<any>{
    /*
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('edugeocache-zeton')}`
      })
    };
     *//*                                                      , httpLastnosti) */
    return this.http.delete(this.api_url + '/zaloga/' + id).toPromise()
      .catch(napaka => this.obdelajNapako(napaka));
  }

  public obdelajNapako(napaka: any): Promise<any> {
    console.log('Napaka pri zalogi' + napaka);
    return Promise.reject(napaka.message || napaka);
  }
}
