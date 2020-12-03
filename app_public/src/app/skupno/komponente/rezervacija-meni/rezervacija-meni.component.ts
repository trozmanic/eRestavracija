import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MeniItem, MeniItemRezervacija } from '../../razredi/meniItem';
import { MeniService } from '../../storitve/meni.service';
import { RezervacijeService } from '../../storitve/rezervacije.service';

@Component({
  selector: 'app-rezervacija-meni',
  templateUrl: './rezervacija-meni.component.html',
  styleUrls: ['./rezervacija-meni.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RezervacijaMeniComponent implements OnInit {

  public meni_items: MeniItemRezervacija[];

  constructor(private meniService: MeniService, private rezervacijeService: RezervacijeService, private router: Router) { }

  ngOnInit(): void {
    this.checkStorage();
    this.meniService.pridobiMeni().then((meni_items => {
      this.meni_items = meni_items as MeniItemRezervacija[];
      this.meni_items.forEach(meni_item => meni_item.kolicina = 0);
    }));
  }

  public checkStorage() {
    let ura = sessionStorage.getItem("ura");
    let stOseb = sessionStorage.getItem("stOseb");
    let datum = sessionStorage.getItem("datum");
    if (!ura || !stOseb || !datum) {
      this.router.navigate(["rezerviraj"]);
    }
  }

  public klikDodajPlus(event, id) {
    let meni_item = this.meni_items.find((element) => element._id == id);
    meni_item.kolicina = meni_item.kolicina < 9 ? meni_item.kolicina + 1 : meni_item.kolicina;
  }

  public klikDodajMinus(event, id) {
    let meni_item = this.meni_items.find((element) => element._id == id);
    meni_item.kolicina = meni_item.kolicina > 0 ? meni_item.kolicina - 1 : meni_item.kolicina;
  }

  public klikRezerviraj(event) {
    let jedi = this.meni_items.reduce((res, x) => {
      if (x.kolicina > 0) {
        res.push({ "meni_item": x._id, "kolicina": x.kolicina });
      }
      return res;
    }, [])
    let ura = sessionStorage.getItem("ura");
    let stOseb = parseInt(sessionStorage.getItem("stOseb"));
    let datum = sessionStorage.getItem("datum");
    let datum_in_ura = new Date(datum);
    datum_in_ura.setHours(parseInt(ura.split(":")[0]), parseInt(ura.split(":")[1]));
    const credentials = JSON.parse(localStorage.getItem("credentials"));

    let payload = {
      "datum_in_ura": datum_in_ura.toJSON(),
      "stOseb": stOseb,
      "jedi": jedi,
      "uporabnik_id": credentials.uporabnik_id
    }
    this.rezervacijeService.ustvariRezervacijo(payload).then(odgovor=>{
      if(odgovor.ok){
        window.alert("Rezervacija uspešno oddana");
        this.router.navigate(["rezerviraj"]);
      }else{
        window.alert("Pri oddaji rezervacije je prišlo do napake");
        this.router.navigate(["rezerviraj"]);
      }
    })
  }

  public clearStorage() {
    sessionStorage.removeItem("ura");
    sessionStorage.removeItem("stOseb");
    sessionStorage.removeItem("datum");
  }

}
