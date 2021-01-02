import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NarocilaNatakar, NarociloZaposleni} from '../../razredi/narocilo';
import {NarociloService} from '../../storitve/narocilo.service';
import Swal from 'sweetalert2';
import {MeniItem} from '../../razredi/meniItem';
import {MeniService} from '../../storitve/meni.service';
@Component({
  selector: 'app-nadzorna-plosca-natakar',
  templateUrl: './nadzorna-plosca-natakar.component.html',
  styleUrls: ['./nadzorna-plosca-natakar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NadzornaPloscaNatakarComponent implements OnInit {
  public narocila: NarocilaNatakar;
  public meniItems: MeniItem [];

  constructor(private narociloService: NarociloService, private meniService: MeniService) { }

  ngOnInit(): void {
    this.narociloService.pridobiNarocilaNatakar()
      .then(res => {
        this.narocila = res;
        console.log(res);
      })
      .catch(err => {
        Swal.fire('Napaka', 'Napaka pri pridobivanju narocil za uporabnisko vlogo natakar', 'error');
        console.log(err);
      });
    this.meniService.pridobiMeni()
      .then(res => {
        this.meniItems = res;
      })
      .catch(err =>  {
        Swal.fire('Napaka', 'Napaka pri pridobivanju podatkov o meniju potrebnih za kreiranje naoricla', 'error');
        console.log(err);
      });
  }

  // tslint:disable-next-line:typedef
  public stateToArrayMapper(state: string) {
    console.log(state);
    const mapper = {
      placano: 'vrsta',
      pripravljeno: 'priprava',
      postrezeno: 'postrezena'
    };
    console.log(mapper[state]);
    return mapper[state];
  }

  changeOrders(narocilo: NarociloZaposleni, oldStatus: string): void {
    const newState = narocilo.stanje;
    if (newState === 'placano') {
      this.narocila.postrezena  = this.narocila.postrezena.filter(narociloCur => narocilo._id !== narociloCur._id);
      return;
    }
    if (newState === 'zbrisano') {
      this.narocila.vrsta = this.narocila.vrsta.filter(narociloCur => narocilo._id !== narociloCur._id);
      return;
    }
    // tslint:disable-next-line:max-line-length
    this.narocila[this.stateToArrayMapper(oldStatus)] = this.narocila[this.stateToArrayMapper(oldStatus)].filter((narociloCur) => narociloCur._id !== narocilo._id);
    // @ts-ignore
    this.narocila[this.stateToArrayMapper(newState)].push(narocilo);
    console.log(narocilo._id, narocilo.stanje, oldStatus);
  }

  // tslint:disable-next-line:typedef
  dodajNarocilo($event: NarociloZaposleni) {
    this.narocila.vrsta.push($event);
  }
}
