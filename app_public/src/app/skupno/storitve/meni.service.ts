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

  private foodApiId = "fe73ca9c";
  private foodApiKey = "8ec65cd0e8152767e4be9e21f92d0610";

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

  public postImage(data){
    return this.http.post(this.api_url + '/image',data, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data`,
      }})
      .toPromise()
      .then(odgovor => odgovor)
      .catch(napaka => this.obdelajNapako(napaka))
  }

  // public foodAPI(){
  //   return this.http.get('https://api.edamam.com/api/food-database/v2/parser?ingr='+sestavina+'&app_id=' + this.foodApiId + '&app_key=' + this.foodApiKey)
  //     .toPromise()
  //     .then((response) => {
  //       if(response.data.parsed[0] === undefined){
  //         return 0
  //       }
  //       return parseInt(kolicina) * ((parseFloat(response.parsed[0].food.nutrients.ENERC_KCAL)) / 100.0));
  //
  //     })
  // }
}
