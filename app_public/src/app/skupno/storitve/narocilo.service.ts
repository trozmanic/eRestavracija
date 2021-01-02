import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Narocilo } from '../razredi/narocilo';

@Injectable({
  providedIn: 'root'
})
export class NarociloService {

  constructor(private http: HttpClient) { }

  private api_url = environment.api_url;

  public posodobiNarocilo(id,narocilo:Narocilo){
    return this.http.put(this.api_url+'/narocila/'+id,narocilo).toPromise().then(odgovor=>odgovor as Narocilo);
  }
}
