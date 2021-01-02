import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {ZaposleniService} from '../../storitve/zaposleni.service';
import {Uporabnik} from '../../razredi/uporabnik';
import {Placa} from '../../razredi/placa';

@Component({
  selector: 'app-nadzorna-plosca-zaposleni',
  templateUrl: './nadzorna-plosca-zaposleni.component.html',
  styleUrls: ['./nadzorna-plosca-zaposleni.component.css']
})
export class NadzornaPloscaZaposleniComponent implements OnInit {

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

  public obrazecNapaka: string;
  public zaposleni: Uporabnik[];
  public idZaposlenega: any[] = new Array(50).fill(0);
  private modalRef: NgbModalRef;
  public obkljukaniCheckboxi = 0;
  public obkljukanEden = false;
  public obkljukanihVec = false;
  public obvestilo: string;

  public odpriModal(modal): void {
    this.modalRef = this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'});
  }

  private pridobiZaposlene(): void {
    this.obvestilo = 'Pridobivanje sestavin';
    this.zaposleniStoritev
      .pridobiZaposlene()
      .then((najdeniZaposleni: Uporabnik[]) => {
        console.log('Pridobljeni zaposleni:');
        console.log(najdeniZaposleni);
        this.zaposleni = najdeniZaposleni;
        this.obvestilo = '';
        // this.najvecStrani = this.zaposleni.length;
      })
      .catch(napaka => this.obrazecNapaka = napaka);
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
    this.obvestilo = '';
    obrazec.resetForm();
  }

  public dodajZaposlenega(obrazec: NgForm): void {
    this.obrazecNapaka = '';
    this.obvestilo = 'Dodajanje zaposlenega';
    if (this.soPodatkiUstrezni()) {
      console.log(this.novZaposleni);
      this.zaposleniStoritev
        .dodajZaposlenega(this.novZaposleni)
        .then((zaposleni: Uporabnik) => {
          console.log('HERE!');
          console.log('Zaposlen shranjen', zaposleni);
          this.novaPlaca.uporabnik_id = zaposleni._id;
          this.zaposleni.push(zaposleni);
          // this.najvecStrani = this.sestavine.length;
          this.zaposleniStoritev
            .posodobiPlaco(this.novaPlaca)
            .then((placa: Placa) => {
              console.log('HERE!');
              console.log('Placa shranjena', placa);
              this.ponastavi(obrazec);
              this.modalRef.close();
          }).catch(napaka => this.obrazecNapaka = napaka);
        })
        .catch(napaka => this.obrazecNapaka = napaka);
    } else {
      console.log('HERE!');
      this.obrazecNapaka = 'Vnesti je treba vse podatke!';
      this.obvestilo = '';
    }
  }

  public posodobiZaposlenega(obrazec: NgForm): void {
    this.obrazecNapaka = '';
    this.obvestilo = 'Posodabljanje zaposlenega';
    let indeks = 0;
    for (const id of this.idZaposlenega) {
      if (id !== '') {
        this.posodobljenZaposleni.id = id;
        break;
      } else {
        indeks++;
      }
    }
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
    console.log(this.posodobljenZaposleni);

    console.log(this.novZaposleni);
    if (this.soPodatkiUstrezni()) {
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
              }).catch(napaka => this.obrazecNapaka = napaka);
          }
          this.ponastavi(obrazec);
          this.modalRef.close();
        })
        .catch(napaka => this.obrazecNapaka = napaka);
    } else {
      this.obrazecNapaka = 'Vnesti je treba vse podatke!';
      this.obvestilo = '';
    }
  }

  public odstraniZaposlenega(): void {
    this.obrazecNapaka = '';
    this.obvestilo = 'Brisanje zaposlenega';
    const stevilo = this.zaposleni.length;
    let izbrisani = 0;
    for (let i = 0; i < stevilo; i++) {
      if (this.idZaposlenega[i] !== '') {
        this.zaposleni.splice(i - izbrisani, 1);
        // this.najvecStrani = this.sestavine.length;
        this.zaposleniStoritev
          .odstraniZaposlenega(this.idZaposlenega[i])
          .then((odgovor: any) => {
            console.log('Sestavina odstranjena', odgovor);
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

  constructor(private zaposleniStoritev: ZaposleniService, private router: Router, private modalService: NgbModal) {
  }

  /*private avtentikacijaStoritev: AvtentikacijaService, private povezavaStoritev: PovezavaService */

  ngOnInit(): void {
    this.pridobiZaposlene();
  }

}
