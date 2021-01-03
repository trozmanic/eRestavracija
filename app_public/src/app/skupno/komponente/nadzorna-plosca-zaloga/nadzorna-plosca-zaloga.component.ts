import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Zaloga } from '../../razredi/zaloga';
import { ZalogaService } from '../../storitve/zaloga.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nadzorna-plosca-zaloga',
  templateUrl: './nadzorna-plosca-zaloga.component.html',
  styleUrls: ['./nadzorna-plosca-zaloga.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NadzornaPloscaZalogaComponent implements OnInit {

  @Input() stran = 1;
  @Input() velikostStrani = 10;
  @Input() najvecStrani: number;

  vsebinaStrani = {
    naslov: 'Zaloga'
  };

  public novaSestavina = {
    ime: '',
    kolicina: null,
    enota: '',
    cena: null
  };

  public posodobljenaSestavina: any = {};
  public izbira = 'ime';
  public sestavine: Zaloga[];
  public idSestavine: any[] = new Array(50).fill('');
  private modalRef: NgbModalRef;
  public obkljukaniCheckboxi = 0;
  public obkljukanEden = false;
  public obkljukanihVec = false;
  public iskanje: any;
  public vnesiPodatke: string;

  public odpriModal(modal): void {
    this.modalRef = this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'});
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
      this.obkljukaniCheckboxi++;
    } else {
      this.idSestavine[i] = '';
      this.obkljukaniCheckboxi--;
    }
    // console.log(this.obkljukaniCheckboxi);
    if (this.obkljukaniCheckboxi === 1){
      this.obkljukanEden = true;
      this.obkljukanihVec = true;
    }
    else if (this.obkljukaniCheckboxi > 1) {
      this.obkljukanEden = false;
      this.obkljukanihVec = true;
    } else {
      this.obkljukanEden = false;
      this.obkljukanihVec = false;
    }
  }

  private ponastavi(obrazec: NgForm): void {
    this.novaSestavina.ime = '';
    this.novaSestavina.kolicina = null;
    this.novaSestavina.enota = '';
    this.novaSestavina.cena = null;
    this.posodobljenaSestavina = {};
    obrazec.resetForm();
  }

  public pridobiSestavine(): void {
    const podatki = {};
    if (this.iskanje !== undefined && this.iskanje !== '') {
      podatki[this.izbira] = this.iskanje;
    }
    /* tslint:disable:no-string-literal */
    podatki['odmik'] = (this.stran - 1) * this.velikostStrani;
    /* tslint:enable:no-string-literal */

    const query = new URLSearchParams(podatki);
    this.zalogaStoritev
      .pridobiSestavine(query)
      .subscribe(
        (res: any) => {
          this.sestavine = res.body;
          this.najvecStrani = res.headers.get('Stevilo');
        },
        napaka => Swal.fire('Napaka pri pridobivanju sestavin', napaka.message, 'error')
      );
  }

  public dodajSestavino(obrazec: NgForm): void {
    if (this.soPodatkiUstrezni()) {
      this.zalogaStoritev
        .dodajSestavino(this.novaSestavina)
        .then((sestavina: Zaloga) => {
          Swal.fire('Dodajanje uspešno', 'Sestavina uspešno dodana', 'success');
          console.log('Sestavina shranjena', sestavina);
          this.sestavine.push(sestavina);
          this.najvecStrani++;
          this.ponastavi(obrazec);
          this.modalRef.close();
        })
        .catch(napaka => Swal.fire('Dodajanje neuspešno', napaka, 'error'));
    } else {
      this.vnesiPodatke = 'Vnesti je treba vse podatke!';
    }
  }

  public posodobiSestavino(obrazec: NgForm): void {
    let indeks = 0;
    for (const id of this.idSestavine) {
      if (id !== '') {
        this.posodobljenaSestavina.id = id;
        break;
      } else {
        indeks++;
      }
    }
    const backup = this.sestavine[indeks];

    if (this.novaSestavina.ime !== '' && this.novaSestavina.ime !== null) {
      this.posodobljenaSestavina.ime = this.novaSestavina.ime;
      this.sestavine[indeks].ime = this.novaSestavina.ime;
    }
    if (this.novaSestavina.kolicina !== '' && this.novaSestavina.kolicina !== null) {
      this.posodobljenaSestavina.kolicina = this.novaSestavina.kolicina;
      this.sestavine[indeks].kolicina = this.novaSestavina.kolicina;
    }
    if (this.novaSestavina.enota !== '' && this.novaSestavina.enota !== null) {
      this.posodobljenaSestavina.enota = this.novaSestavina.enota;
      this.sestavine[indeks].enota = this.novaSestavina.enota;
    }
    if (this.novaSestavina.cena !== '' && this.novaSestavina.cena !== null) {
      this.posodobljenaSestavina.cena = this.novaSestavina.cena;
      this.sestavine[indeks].cena = this.novaSestavina.cena;
    }

    this.zalogaStoritev
      .posodobiSestavino(this.posodobljenaSestavina)
      .then((sestavina: Zaloga) => {
        Swal.fire('Posodobitev uspešna', 'sestavina je bila uspešno posodobljena', 'success');
        console.log('Sestavina posodobljena', sestavina);
        this.ponastavi(obrazec);
        this.modalRef.close();
      })
      .catch((napaka) => {
        Swal.fire('Posodobitev neuspešna', napaka, 'error');
        this.sestavine[indeks] = backup;
      });
  }

  public odstraniSestavino(): void {
    const stevilo = this.sestavine.length;
    let izbrisani = 0;
    const backup = this.sestavine;
    console.log(backup);
    for (let i = 0; i < stevilo; i++) {
      if (this.idSestavine[i] !== '') {
        this.sestavine.splice(i - izbrisani, 1);
        this.najvecStrani--;
        this.zalogaStoritev
          .odstraniSestavino(this.idSestavine[i])
          .then((odgovor) => {
            console.log('Brisanje uspešno: ' + odgovor);
            Swal.fire('Brisanje uspešno', 'Brisanje sestavine je bilo uspešno', 'success');
            this.obkljukanEden = false;
            this.obkljukanihVec = false;
            this.obkljukaniCheckboxi = 0;
            this.modalRef.close();
          })
          .catch((napaka) => {
            Swal.fire('Brisanje neuspešno', napaka, 'error');
            this.sestavine = backup;
            this.najvecStrani += izbrisani;
          });
        izbrisani++;
      }
    }
  }

  constructor(private zalogaStoritev: ZalogaService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.pridobiSestavine();
  }

}
