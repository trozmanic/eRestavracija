import {Component, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Zaloga } from '../../razredi/zaloga';
import { ZalogaService } from '../../storitve/zaloga.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nadzorna-plosca-zaloga',
  templateUrl: './nadzorna-plosca-zaloga.component.html',
  styleUrls: ['./nadzorna-plosca-zaloga.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NadzornaPloscaZalogaComponent implements OnInit {

  // @Output() zamenjajStran = new EventEmitter<any>(true);
  @Input() stran = 1;
  @Input() velikostStrani = 10;
  @Input() najvecStrani = 0;

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

  public obrazecNapaka: string;
  public sestavine: Zaloga[];
  public idSestavine: any[] = new Array(50).fill('');
  private modalRef: NgbModalRef;
  public obkljukaniCheckboxi = 0;
  public obkljukanEden = false;
  public obkljukanihVec = false;
  public obvestilo: string;

  public odpriModal(modal): void {
    this.modalRef = this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'});
  }

  private pridobiSestavine(): void {
    this.obvestilo = 'Pridobivanje sestavin';
    this.zalogaStoritev
      .pridobiSestavine()
      .then((najdeneSestavine: Zaloga[]) => {
        this.sestavine = najdeneSestavine;
        this.obvestilo = '';
        this.najvecStrani = this.sestavine.length;
      })
      .catch(napaka => this.obrazecNapaka = napaka);
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
    this.obvestilo = '';
    obrazec.resetForm();
  }

  public dodajSestavino(obrazec: NgForm): void {
    this.obrazecNapaka = '';
    if (this.soPodatkiUstrezni()) {
      this.obvestilo = 'Dodajanje sestavine';
      this.zalogaStoritev
        .dodajSestavino(this.novaSestavina)
        .then((sestavina: Zaloga) => {
          console.log('Sestavina shranjena', sestavina);
          this.sestavine.push(sestavina);
          this.najvecStrani = this.sestavine.length;
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

    console.log(this.novaSestavina);

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
    console.log(this.posodobljenaSestavina);
    this.obvestilo = 'Posodabljanje sestavine';
    this.zalogaStoritev
      .posodobiSestavino(this.posodobljenaSestavina)
      .then((sestavina: Zaloga) => {
        console.log('Sestavina posodobljena', sestavina);
        this.ponastavi(obrazec);
        this.modalRef.close();
      })
      .catch((napaka) => {
        this.obrazecNapaka = napaka;
        this.sestavine[indeks] = backup;
      });
  }

  public odstraniSestavino(): void {
    this.obrazecNapaka = '';
    const stevilo = this.sestavine.length;
    let izbrisani = 0;
    for (let i = 0; i < stevilo; i++) {
      if (this.idSestavine[i] !== '') {
        this.sestavine.splice(i - izbrisani, 1);
        this.najvecStrani = this.sestavine.length;
        this.zalogaStoritev
          .odstraniSestavino(this.idSestavine[i])
          .then((odgovor) => {
            console.log('Brisanje uspešno: ' + odgovor);
            this.modalRef.close();
          })
          .catch(napaka => this.obrazecNapaka = napaka);
        izbrisani++;
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
