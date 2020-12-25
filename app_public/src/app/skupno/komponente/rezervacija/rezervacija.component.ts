import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RezervacijeService } from '../../storitve/rezervacije.service'
import { MeniService } from '../../storitve/meni.service'

import { Rezervacija } from '../../razredi/rezervacija'
import { MeniItem } from '../../razredi/meniItem'

@Component({
  selector: 'app-rezervacija',
  templateUrl: './rezervacija.component.html',
  styleUrls: ['./rezervacija.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RezervacijaComponent implements OnInit {

  public rezervacije: Rezervacija[];

  public meniItems: MeniItem[];

  constructor(private rezervacijeService: RezervacijeService, private meniService: MeniService) { }

  ngOnInit(): void {
    let id=JSON.parse(localStorage.getItem("credentials")).uporabnik_id;
    this.rezervacijeService.pridobiRezervacije(id)
      .then(rezervacije => this.rezervacije = rezervacije);
    this.meniService.pridobiMeni()
    .then(meni=>this.meniItems=meni);
  }

  public rezervacijaPreklici(event){
    let id=event.target.id;
    this.rezervacijeService.posodobiRezervacije(id,'preklici').then(odgovor=>{
      if(odgovor.ok){
        let rezervacija=this.rezervacije.find(element=>element._id==id);
        window.alert("Rezervacija uspešno preklicana")
        rezervacija.stanje="preklicana";
      }
    });
  }

}
