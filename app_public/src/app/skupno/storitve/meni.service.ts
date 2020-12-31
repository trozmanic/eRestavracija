import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

import {MeniItemGost, MeniItem, MeniItemPOST, MeniItemPUT} from '../razredi/meniItem';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MeniService {

  private api_url = environment.api_url;

  constructor(private http: HttpClient, private authService: AuthService) { }

  public pridobiMeniGost(): Promise<MeniItemGost []> {
    const httpOptions = {
      headers: this.initHeaders()
    };

    return this.http.get(this.api_url + '/self/meni', httpOptions).toPromise().then(odgovor => odgovor as MeniItemGost[])
      .catch(napaka => this.obdelajNapako(napaka));
  }

  public pridobiMeni(): Promise<MeniItem []> {
    return this.http.get(this.api_url + '/meni').toPromise().then(odgovor => odgovor as MeniItem[])
      .catch(napaka => this.obdelajNapako(napaka));
  }

  // tslint:disable-next-line:typedef
  public obdelajNapako(napaka) {
    console.log('Napaka pri pridobivanju menijev');
    return Promise.reject(napaka.message || napaka);
  }

  private initHeaders(): HttpHeaders {
    return  new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.vrniZeton());
  }

  // tslint:disable-next-line:typedef
  public deleteItem(_id: string){
    return this.http.delete(this.api_url + '/meni/'+_id).toPromise().catch(napaka => this.obdelajNapako(napaka))
  }


  // tslint:disable-next-line:typedef
  public editItem(menuItem: MeniItemPUT){
    return this.http.put(this.api_url + '/meni/'+menuItem.id, menuItem)
      .toPromise()
      .then(odgovor => odgovor as MeniItem)
      .catch(napaka => this.obdelajNapako(napaka))
  }

  // tslint:disable-next-line:typedef
  public addItem(menuItem: MeniItemPOST){
    return this.http.post(this.api_url + '/meni', menuItem)
      .toPromise()
      .then(odgovor => odgovor as MeniItem)
      .catch(napaka => this.obdelajNapako(napaka))
  }

  public postImage(){}
}
