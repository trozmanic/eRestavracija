import {Component, Inject, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Zaloga } from '../../razredi/zaloga';
import { ZalogaService } from '../../storitve/zaloga.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-nadzorna-plosca-zaloga',
  templateUrl: './nadzorna-plosca-zaloga.component.html',
  styleUrls: ['./nadzorna-plosca-zaloga.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NadzornaPloscaZalogaComponent implements OnInit {

  public novaSestavina = {
    ime: '',
    kolicina: null,
    enota: '',
    cena: null
  };

  public obrazecNapaka: string;

  vsebinaStrani = {
    naslov: 'Zaloga'
  };

  public ustreza = false;
  public sestavine: Zaloga[];
  public sestavina: Zaloga;
  public idSestavine: any[];
  private modalRef: NgbModalRef;

  public odpriModal(modal): void {
    this.modalRef = this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'});
  }

  private pridobiSestavine(): void {
    this.zalogaStoritev
      .pridobiSestavine()
      .then(najdeneSestavine => this.sestavine = najdeneSestavine);
  }

  private soPodatkiUstrezni(): boolean {
    if (this.novaSestavina.ime && this.novaSestavina.kolicina && this.novaSestavina.enota && this.novaSestavina.cena) {
      return true;
    } else {
      return false;
    }
  }

  public obkljukan(e: any, i: number): void{
    if (e.target.checked) {
      this.idSestavine[i] = e.target.value;
    } else {
      this.idSestavine[i] = 0;
    }
  }

  public nastaviUstreznost(vrednost: boolean): void {
    this.ustreza = vrednost;
  }

  private ponastavi(obrazec: NgForm): void {
    this.novaSestavina.ime = '';
    this.novaSestavina.kolicina = null;
    this.novaSestavina.enota = '';
    this.novaSestavina.cena = null;
    this.ustreza = false;
    obrazec.resetForm();
  }

  public dodajSestavino(obrazec: NgForm): void {
    this.obrazecNapaka = '';
    if (this.soPodatkiUstrezni()) {
      this.zalogaStoritev
        .dodajSestavino(this.novaSestavina)
        .then((sestavina: Zaloga) => {
          console.log('Sestavina shranjena', sestavina);
          this.ponastavi(obrazec);
          this.modalRef.close();
        })
        .catch(napaka => this.obrazecNapaka = napaka);
    } else {
      this.obrazecNapaka = 'Vnesti je treba vse podatke!';
    }
  }

  public posodobiSestavino(obrazec: NgForm): void {
    this.obrazecNapaka = '';
    for (const i of this.idSestavine) {
      if (i > 0) {
        this.sestavina._id = i;
      }
    }
    this.sestavina.ime = this.novaSestavina.ime;
    this.sestavina.kolicina = this.novaSestavina.kolicina;
    this.sestavina.enota = this.novaSestavina.enota;
    this.sestavina.cena = this.novaSestavina.cena;
    if (this.soPodatkiUstrezni()) {
      this.zalogaStoritev
        .posodobiSestavino(this.sestavina)
        .then((sestavina: Zaloga) => {
          console.log('Sestavina posodobljena', sestavina);
          this.ponastavi(obrazec);
          this.modalRef.close();
        })
        .catch(napaka => this.obrazecNapaka = napaka);
    } else {
      this.obrazecNapaka = 'Vnesti je treba vse podatke!';
    }
  }

  public odstraniSestavino(): void {
    for (const i of this.idSestavine) {
      if (i > 0) {
        this.zalogaStoritev
          .odstraniSestavino(i)
          .then((nekaj: any) => {
            console.log('Sestavina odstranjena', nekaj);
            this.modalRef.close();
          })
          .catch(napaka => this.obrazecNapaka = napaka);
      }
    }
  }

  /*
  public jePrijavljen(): boolean {
    return this.avtentikacijaStoritev.jePrijavljen();
  }

  public vrniUporabnika(): string {
    const { ime } = this.avtentikacijaStoritev.vrniTrenutnegaUporabnika();
    return ime ? ime : 'Gost';
  }

   */

  constructor(private zalogaStoritev: ZalogaService, private router: Router, private modalService: NgbModal) { }
  /*private avtentikacijaStoritev: AvtentikacijaService, private povezavaStoritev: PovezavaService */

  ngOnInit(): void {
    this.pridobiSestavine();
  }

}
