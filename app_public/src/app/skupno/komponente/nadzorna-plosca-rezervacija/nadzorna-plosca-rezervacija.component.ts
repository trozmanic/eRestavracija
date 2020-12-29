import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MeniItem } from '../../razredi/meniItem';
import { Rezervacija } from '../../razredi/rezervacija';
import { MeniService } from '../../storitve/meni.service';
import { RezervacijeService } from '../../storitve/rezervacije.service';

@Component({
  selector: 'app-nadzorna-plosca-rezervacija',
  templateUrl: './nadzorna-plosca-rezervacija.component.html',
  styleUrls: ['./nadzorna-plosca-rezervacija.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NadzornaPloscaRezervacijaComponent implements OnInit {

  public rezervacijeCaka: Rezervacija[];
  public rezervacijePotrjene: Rezervacija[];
  public meniItems: MeniItem[];
  public rezervacijeAlert = { 'type': 'info', 'open': true, 'sporocilo': 'Pridobivanje rezervacij' }

  private legendaModal: BsModalRef;

  constructor(private rezervacijaService: RezervacijeService, private meniService: MeniService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.rezervacijaService.pridobiRezervacije('').then((rezervacije) => {
      //rezervacije.sort((a,b)=>b.datum.getTime()-a.datum.getTime());
      this.rezervacijeCaka = rezervacije.filter((el) => el.stanje == 'caka');
      this.rezervacijePotrjene = rezervacije.filter((el) => el.stanje == 'potrjena');
      return this.meniService.pridobiMeni();
    }).then(meni => {
      this.meniItems = meni;
      this.rezervacijeAlert = { 'type': 'info', 'open': false, 'sporocilo': 'Pridobivanje rezervacij' }
    }).catch(napaka => {
      this.rezervacijeAlert = { 'type': 'danger', 'open': true, 'sporocilo': 'Napaka pri pridobivanju rezervacij' }
    });

  }

  public odpriLegendaModal(legenda) {
    this.legendaModal = this.modalService.show(legenda);
  }

  public zapriLegendaModal() {
    this.legendaModal.hide();
  }

  public potrdiRezervacijo(id) {
    this.rezervacijaService.posodobiRezervacije(id, "potrdi").then((odgovor) => {
      window.alert("Uspešna potrditev");
      let tempRezervacija: Rezervacija;
      this.rezervacijeCaka = this.rezervacijeCaka.filter((el) => {
        if (el._id == id) {
          tempRezervacija = el;
          return false;
        } else {
          return true;
        }
      });
      this.rezervacijePotrjene.push(tempRezervacija);
      this.rezervacijePotrjene.sort((a, b) => <any>b.datum - <any>a.datum);
    }).catch((napaka) => {
      window.alert("Prišlo je do napake");
    })
  }

  public zavrniRezervacijo(id) {
    this.rezervacijaService.posodobiRezervacije(id, 'zavrni').then((odgovor) => {
      this.rezervacijeCaka=this.rezervacijeCaka.filter(el=>el._id!=id);
      window.alert("Uspešna zavrnitev");
    }).catch(napaka=>{
      window.alert("Prišlo je do napake");
    })
  }

}
