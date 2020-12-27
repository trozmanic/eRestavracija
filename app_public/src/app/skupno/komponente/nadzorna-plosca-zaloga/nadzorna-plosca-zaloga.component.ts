import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Zaloga } from '../../razredi/zaloga';
import { ZalogaService } from '../../storitve/zaloga.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nadzorna-plosca-zaloga',
  templateUrl: './nadzorna-plosca-zaloga.component.html',
  styleUrls: ['./nadzorna-plosca-zaloga.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NadzornaPloscaZalogaComponent implements OnInit {

  constructor(private zalogaStoritev: ZalogaService, private router: Router) { }
  
  vsebinaStrani = {
    naslov: "Zaloga"
  }
  
  public sestavine: Zaloga[]
  
  private pridobiSestavine(): void {
    this.zalogaStoritev
      .pridobiSestavine()
      .then(najdeneSestavine => this.sestavine = najdeneSestavine);
  }

  public novaSestavina: Zaloga = {
      _id: '',
      ime: 'krompir',
      kolicina: 10,
      enota: 'kg',
      cena: 10
  };

  public obrazecNapaka: string;

  private soPodatkiUstrezni(): boolean {
    if (this.novaSestavina.ime && this.novaSestavina.kolicina && this.novaSestavina.enota && this.novaSestavina.enota) {
      return true;
    } else {
      return false;
    }
  }

  private ponastaviInSkrijObrazec(): void {
    this.novaSestavina._id = '';
    this.novaSestavina.ime = 'krompir';
    this.novaSestavina.kolicina = 10;
    this.novaSestavina.enota = 'kg';
    this.novaSestavina.cena = 10;
  }

  public dodajNovoSestavino(): void {
    this.obrazecNapaka = "";
    if (this.soPodatkiUstrezni()) {
      this.zalogaStoritev
        .dodajKomentarLokaciji(this.lokacija._id, this.novKomentar)
        .then((komentar: Komentar) => {
          console.log("Komentar shranjen", komentar);
          let komentarji = this.lokacija.komentarji.slice(0);
          komentarji.unshift(komentar);
          this.lokacija.komentarji = komentarji;
          this.ponastaviInSkrijObrazec();
        })
        .catch(napaka => this.obrazecNapaka = napaka);
    } else {
      this.obrazecNapaka = "Zahtevani so vsi podatki, prosim poskusite ponovno!";
    }
  }

  public jePrijavljen(): boolean {
    return this.avtentikacijaStoritev.jePrijavljen();
  }

  public vrniUporabnika(): string {
    const { ime } = this.avtentikacijaStoritev.vrniTrenutnegaUporabnika();
    return ime ? ime : 'Gost';
  }

  ngOnInit(): void {
    this.pridobiSestavine();
  }

}