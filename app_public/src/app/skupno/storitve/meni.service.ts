import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

import {MeniItemGost, MeniItem, MeniItemPOST, MeniItemPUT, APIResponse, ImgRes} from '../razredi/meniItem';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MeniService {

  private api_url = environment.api_url;

  private foodApiId = "fe73ca9c";
  private foodApiKey = "8ec65cd0e8152767e4be9e21f92d0610";
  private httpOptions={ headers: this.initHeaders() };

  constructor(private http: HttpClient, private authService: AuthService) { }

  public pridobiMeniGost(): Promise<MeniItemGost []> {
    return this.http.get(this.api_url + '/self/meni', this.httpOptions).toPromise().then(odgovor => odgovor as MeniItemGost[])
      .catch(napaka => this.obdelajNapako(napaka));
  }

  public pridobiMeni(): Promise<MeniItem []> {
    return this.http.get(this.api_url + '/meni',this.httpOptions).toPromise().then(odgovor => odgovor as MeniItem[])
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
    return this.http.delete(this.api_url + '/meni/'+_id,this.httpOptions).toPromise().catch(napaka => this.obdelajNapako(napaka))
  }


  // tslint:disable-next-line:typedef
  public editItem(menuItem: MeniItemPUT){
    return this.http.put(this.api_url + '/meni/'+menuItem.id, menuItem,this.httpOptions)
      .toPromise()
      .then(odgovor => odgovor as MeniItem)
      .catch(napaka => this.obdelajNapako(napaka))
  }

  // tslint:disable-next-line:typedef
  public addItem(menuItem: MeniItemPOST){
    return this.http.post(this.api_url + '/meni', menuItem,this.httpOptions)
      .toPromise()
      .then(odgovor => odgovor as MeniItem)
      .catch(napaka => this.obdelajNapako(napaka))
  }

  public postImage(data){
    return this.http.post(this.api_url + '/image',data,this.httpOptions)
      .toPromise()
      .then(odgovor => odgovor as ImgRes)
      .catch(napaka => this.obdelajNapako(napaka))
  }

  public foodAPI(sestavina, kolicina){
    return this.http.get('https://api.edamam.com/api/food-database/v2/parser?ingr='+sestavina+'&app_id=' + this.foodApiId + '&app_key=' + this.foodApiKey)
      .toPromise()
      .then(response => response as APIResponse)
      .catch(napaka => this.obdelajNapako(napaka))
  }
}
