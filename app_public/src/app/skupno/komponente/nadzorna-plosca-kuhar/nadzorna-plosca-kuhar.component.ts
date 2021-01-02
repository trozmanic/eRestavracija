import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NarocilaKuhar, NarociloZaposleni} from '../../razredi/narocilo';
import {NarociloService} from '../../storitve/narocilo.service';

@Component({
  selector: 'app-nadzorna-plosca-kuhar',
  templateUrl: './nadzorna-plosca-kuhar.component.html',
  styleUrls: ['./nadzorna-plosca-kuhar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NadzornaPloscaKuharComponent implements OnInit {

  constructor(private narociloService: NarociloService) { }
  public narocila: NarocilaKuhar;

  ngOnInit(): void {
    this.narociloService.pridobiNarocila()
      .then((narocila) => {
        console.log(narocila);
        this.narocila = narocila;
      });
  }

  changeOrders(narocilo: NarociloZaposleni): void {
    const novoStanje = narocilo.stanje;
    const id = narocilo._id;
    if (novoStanje === 'v pripravi') {
      this.narocila.vrsta = this.narocila.vrsta.filter(item => item._id !== id);
      this.narocila.priprava.push(narocilo);
    }
    if (novoStanje === 'sprejeto') {
      this.narocila.priprava = this.narocila.priprava.filter(item => item._id !== id);
      this.narocila.vrsta.push(narocilo);
    }
    if (novoStanje === 'pripravljeno') {
      this.narocila.priprava = this.narocila.priprava.filter((item) => {
        return item._id !== id;
      });
    }
  }

}
