import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Narocilo, NarociloCreatable, NarociloZaposleni, Natakar} from '../../razredi/narocilo';
import {MeniItem} from '../../razredi/meniItem';
import {AuthService} from '../../storitve/auth.service';
import {NarociloService} from '../../storitve/narocilo.service';
import Swal from 'sweetalert2';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngbd-modal-content',
  templateUrl: './modal.inner.html'
})
// tslint:disable-next-line:component-class-suffix
export class NgbdModalContent {
  @Input() meniItems: MeniItem [];
  @Input() narocilo: NarociloCreatable;
  @Output() kreiranoNarocilo = new EventEmitter <NarociloZaposleni>();

  constructor(public activeModal: NgbActiveModal,
              private authService: AuthService,
              private narociloService: NarociloService) {}

  createOrder(): void {
    this.narocilo.cena = this.calculatePrice();
    this.narocilo.id = this.authService.vrniTrenutnegaUporabnika()._id;
    this.narocilo.stanje = 'sprejeto';
    // @ts-ignore
    const filtrirano =  {...this.narocilo};
    // @ts-ignore
    filtrirano.meni_items = filtrirano.meni_items.filter((meniItem) => meniItem.kolicina > 0);
    // @ts-ignore
    if (filtrirano.meni_items.length === 0) {
      Swal.fire('Napaka', 'Potrebno je vnesti vsaj eno izmed jedi', 'error');
      return;
    }
    this.narociloService.kreirajNarocilo(filtrirano)
      .then((response) => {
        this.activeModal.close();
        Swal.fire('Narocilo', 'Uspesno kreirano narocilo', 'success');
        this.kreiranoNarocilo.emit(this.castNarocilo(response));
      })
      .catch((err) => {
        Swal.fire('Narocilo', 'Napaka pri kreiranju narocila', 'error');
      });
  }

  castNarocilo(response: any): NarociloZaposleni {
    console.log(response);
    response.meni_items = response.meni_items.map((meniItem) => {
      let meniItemOBJ: MeniItem = null;
      this.meniItems.forEach((current) => {
        if (current._id === meniItem.meni_item) {
          meniItemOBJ = current;
        }
      });
      if (meniItemOBJ == null) {
        Swal.fire('napaka', 'napaka pri posodobitvi vpogleda, prosim osvezite stran', 'error');
        return null;
      }
      const obj = {
        _id: meniItem.id,
        meni_item: meniItemOBJ.ime,
        kolicina: meniItem.kolicina,
        cena: meniItemOBJ.cena,
        ime: meniItemOBJ.ime
      };
      return obj;
    });
    return response as NarociloZaposleni;

  }

  calculatePrice(): number {
    let cena = 0;
    this.narocilo.meni_items.forEach((meniItem, index) => {
      // @ts-ignore
      cena += meniItem.kolicina * this.meniItems[index].cena;
    });
    return cena;
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngbd-modal-component',
  templateUrl: './modal.component.html'
})
export class NgbdModalComponent{

  @Input() natakar: Natakar;
  @Input() meniItems: MeniItem[];
  @Output() kreiranoNarocilo = new EventEmitter <NarociloZaposleni> ();
  public narocilo: NarociloCreatable;
  constructor(private modalService: NgbModal) {}

  // tslint:disable-next-line:typedef
  open() {
    this.initNarocilo();
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.meniItems = this.meniItems;
    modalRef.componentInstance.narocilo = this.narocilo;
    modalRef.componentInstance.kreiranoNarocilo.subscribe((event) => {
      console.log('Dobil sem ' + event);
      this.kreiranoNarocilo.emit(event as NarociloZaposleni);
    });
  }

  initNarocilo(): void {
    this.narocilo = new NarociloCreatable();
    // @ts-ignore
    this.narocilo.meni_items = [];
    this.meniItems.forEach((meniItem) => {
      this.narocilo.meni_items.push({
        meniItemID: meniItem._id.toString(),
        kolicina: 0
      });
    });
  }

  dodajNarocilo(narocilo: NarociloZaposleni): void {
    console.log(narocilo);
  }

}

