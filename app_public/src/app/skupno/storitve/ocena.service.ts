import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {MeniItem, MeniItemGost} from '../razredi/meniItem';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Ocena} from '../razredi/ocena';
import {environment} from '../../../environments/environment';
import {AuthService} from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class OcenaService {

  private messageSource = new BehaviorSubject<MeniItemGost>(null);
  private api_url = environment.api_url;
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) { }

  // tslint:disable-next-line:typedef
  changeMessage(message: MeniItemGost) {
    this.messageSource.next(message);
  }

  public oceniJed(ocenaOBJ: Ocena): Promise <MeniItem> {
    const httpOptions = {
      headers: this.initHeaders()
    };
    return this.http.post(this.api_url + '/meni/dodajOceno', ocenaOBJ, httpOptions).toPromise()
      .then(odgovor => odgovor as MeniItem)
      .catch(napaka => this.obdelajNapako(napaka));
  }

  // tslint:disable-next-line:typedef
  public obdelajNapako(napaka) {
    console.log('Napaka pri ocenjevanje');
    alert('Napaka pri oddajanju ocene');
    return Promise.reject(napaka.message || napaka);
  }

  private initHeaders(): HttpHeaders {
    return  new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.vrniZeton());
  }
}
