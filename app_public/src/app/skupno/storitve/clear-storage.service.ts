import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { RezervacijaMeniComponent } from '../komponente/rezervacija-meni/rezervacija-meni.component';

@Injectable({
  providedIn: 'root'
})
export class ClearStorageService implements CanDeactivate<RezervacijaMeniComponent>{

  constructor() { }

  canDeactivate(component:RezervacijaMeniComponent){
    component.clearStorage();
    return true;
  }
}
