import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {ZaposleniService} from '../../storitve/zaposleni.service';
import {Uporabnik} from '../../razredi/uporabnik';
import {Placa} from '../../razredi/placa';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nadzorna-plosca-zaposleni',
  templateUrl: './nadzorna-plosca-zaposleni.component.html',
  styleUrls: ['./nadzorna-plosca-zaposleni.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NadzornaPloscaZaposleniComponent implements OnInit {

  @Input() stran = 1;
  @Input() velikostStrani = 10;
  @Input() najvecStrani: number;

  vsebinaStrani = {
    naslov: 'Zaposleni'
  };

  public novZaposleni = {
    ime: '',
    email_naslov: '',
    telefonska_stevilka: '',
    geslo: '',
    vloga: ''
  };

  public novaPlaca: Placa = {
    uporabnik_id: '',
    placa: null
  };

  public posodobljenZaposleni: any = {};
  public zaposleni: Uporabnik[];
  public idZaposlenega: any[] = new Array(50).fill('');
  private modalRef: NgbModalRef;
  public obkljukaniCheckboxi = 0;
  public obkljukanEden = false;
  public obkljukanihVec = false;
  public izbira = 'ime';
  public iskanje: any;
  public vnesiPodatke: string;

  public odpriModal(modal): void {
    this.modalRef = this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'});
  }

  private soPodatkiUstrezni(): boolean {
    return !!(this.novZaposleni.ime && this.novZaposleni.email_naslov && this.novZaposleni.telefonska_stevilka &&
      this.novZaposleni.geslo && this.novZaposleni.vloga);
  }

  public obkljukan(e: any, i: number): void{
    if (e.target.checked) {
      this.idZaposlenega[i] = e.target.value;
      this.obkljukaniCheckboxi++;
    } else {
      this.idZaposlenega[i] = '';
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
    this.novZaposleni.ime = '';
    this.novZaposleni.email_naslov = '';
    this.novZaposleni.telefonska_stevilka = '';
    this.novZaposleni.geslo = '';
    this.novZaposleni.vloga = '';
    this.novaPlaca.uporabnik_id = '';
    this.novaPlaca.placa = null;
    obrazec.resetForm();
  }

  public pridobiZaposlene(): void {
    const podatki = {};
    if (this.iskanje !== undefined && this.iskanje !== '') {
      // console.log(this.izbira);
      // console.log(this.iskanje);
      podatki[this.izbira] = this.iskanje;
    }
    /* tslint:disable:no-string-literal */
    podatki['odmik'] = (this.stran - 1) * this.velikostStrani;
    /* tslint:enable:no-string-literal */
    // console.log(podatki);
    const query = new URLSearchParams(podatki);
    this.zaposleniStoritev
      .pridobiZaposlene(query)
      .subscribe(
        (res: any) => {
          this.zaposleni = res.body;
          this.najvecStrani = res.headers.get('Stevilo');
        },
        napaka => Swal.fire('Napaka pri pridobivanju sestavin', napaka.message, 'error')
      );
  }

  public dodajZaposlenega(obrazec: NgForm): void {
    if (this.soPodatkiUstrezni()) {
      // console.log(this.novZaposleni);
      this.zaposleniStoritev
        .dodajZaposlenega(this.novZaposleni)
        .then((zaposleni: Uporabnik) => {
          // console.log('HERE!');
          console.log('Zaposlen shranjen', zaposleni);
          this.novaPlaca.uporabnik_id = zaposleni._id;
          this.zaposleni.push(zaposleni);
          this.zaposleniStoritev
            .posodobiPlaco(this.novaPlaca)
            .then((placa: Placa) => {
              Swal.fire('Dodajanje uspešno', 'Zaposleni uspešno dodan', 'success');
              this.najvecStrani++;
              this.ponastavi(obrazec);
              this.modalRef.close();
          }).catch(napaka => Swal.fire('Dodajanje plače neuspešno', napaka, 'error'));
        })
        .catch(napaka => Swal.fire('Dodajanje zaposlenega neuspešno', napaka, 'error'));
    } else {
      // console.log('HERE!');
      this.vnesiPodatke  = 'Vnesti je treba vse podatke!';
    }
  }

  public pridobiIndeks(): number {
    let indeks = 0;
    for (const id of this.idZaposlenega) {
      if (id !== '') {
        this.posodobljenZaposleni.id = id;
        break;
      } else {
        indeks++;
      }
    }
    return indeks;
  }

  public posodobiZaposlenega(obrazec: NgForm): void {
    const indeks = this.pridobiIndeks();

    const backup = this.zaposleni[indeks];

    if (this.novZaposleni.ime !== '' && this.novZaposleni.ime !== null) {
      this.posodobljenZaposleni.ime = this.novZaposleni.ime;
      this.zaposleni[indeks].ime = this.novZaposleni.ime;
    }
    if (this.novZaposleni.email_naslov !== '' && this.novZaposleni.email_naslov !== null) {
      this.posodobljenZaposleni.email_naslov = this.novZaposleni.email_naslov;
      this.zaposleni[indeks].email_naslov = this.novZaposleni.email_naslov;
    }
    if (this.novZaposleni.telefonska_stevilka !== '' && this.novZaposleni.telefonska_stevilka !== null) {
      this.posodobljenZaposleni.telefonska_stevilka = this.novZaposleni.telefonska_stevilka;
      this.zaposleni[indeks].telefonska_stevilka = this.novZaposleni.telefonska_stevilka;
    }
    if (this.novZaposleni.geslo !== '' && this.novZaposleni.geslo !== null) {
      this.posodobljenZaposleni.geslo = this.novZaposleni.geslo;
      this.zaposleni[indeks].geslo = this.novZaposleni.geslo;
    }
    if (this.novZaposleni.vloga !== '' && this.novZaposleni.vloga !== null) {
      this.posodobljenZaposleni.vloga = this.novZaposleni.vloga;
      this.zaposleni[indeks].vloga = this.novZaposleni.vloga;
    }
    // console.log(this.posodobljenZaposleni);

    // console.log(this.novZaposleni);
    this.zaposleniStoritev
      .posodobiZaposlenega(this.posodobljenZaposleni)
      .then((zaposleni: Uporabnik) => {
        console.log('Zaposlen shranjen', zaposleni);
        if (this.novaPlaca.placa != null) {
          this.novaPlaca.uporabnik_id = this.posodobljenZaposleni.id;
          this.zaposleniStoritev
            .posodobiPlaco(this.novaPlaca)
            .then((placa: Placa) => {
              console.log('Placa shranjena', placa);
            }).catch(napaka => Swal.fire('Posodobitev plače neuspešna', napaka, 'error'));
        }
        Swal.fire('Posodobitev uspešna', 'zaposleni je bil uspešno posodobljen', 'success');
        this.ponastavi(obrazec);
        this.modalRef.close();
      })
      .catch(napaka => {
        Swal.fire('Posodobitev neuspešna', napaka, 'error');
        this.zaposleni[indeks] = backup;
      });
  }

  public odstraniZaposlenega(): void {
    const stevilo = this.zaposleni.length;
    let izbrisani = 0;
    const backup = this.zaposleni;
    // console.log('STEVILO VSEH ZAPOSLENIH: ' + stevilo);
    for (let i = 0; i < stevilo; i++) {
      // console.log(this.idZaposlenega[i]);
      if (this.idZaposlenega[i] !== '') {
        this.zaposleni.splice(i - izbrisani, 1);
        this.najvecStrani--;
        this.zaposleniStoritev
          .odstraniZaposlenega(this.idZaposlenega[i])
          .then((odgovor: any) => {
            Swal.fire('Brisanje uspešno', 'Brisanje zaposlenega je bilo uspešno', 'success');
            console.log('Zaposleni odstranjen', odgovor);
            this.obkljukanEden = false;
            this.obkljukanihVec = false;
            this.obkljukaniCheckboxi = 0;
            this.modalRef.close();
          })
          .catch((napaka) => {
            Swal.fire('Brisanje neuspešno', napaka, 'error');
            this.zaposleni = backup;
            this.najvecStrani += izbrisani;
          });
        izbrisani++;
      }
    }
  }

  constructor(private zaposleniStoritev: ZaposleniService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.pridobiZaposlene();
  }

}
