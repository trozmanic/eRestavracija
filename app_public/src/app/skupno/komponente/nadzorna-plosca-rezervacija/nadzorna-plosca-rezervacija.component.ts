import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MeniItem } from '../../razredi/meniItem';
import { Narocilo } from '../../razredi/narocilo';
import { Rezervacija } from '../../razredi/rezervacija';
import { User } from '../../razredi/user';
import { AuthService } from '../../storitve/auth.service';
import { MeniService } from '../../storitve/meni.service';
import { NarociloService } from '../../storitve/narocilo.service';
import { RezervacijeService } from '../../storitve/rezervacije.service';

@Component({
  selector: 'app-nadzorna-plosca-rezervacija',
  templateUrl: './nadzorna-plosca-rezervacija.component.html',
  styleUrls: ['./nadzorna-plosca-rezervacija.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NadzornaPloscaRezervacijaComponent implements OnInit {

  public rezervacijeCaka: Rezervacija[];
  public rezervacijePotrjene: Rezervacija[];
  public meniItems: MeniItem[];
  public rezervacijeAlert = { 'type': 'info', 'open': true, 'sporocilo': 'Pridobivanje rezervacij...' };
  public uporabnik: User;
  public rezervacijaPotrditev: Rezervacija;
  public narociloPotrditev: Narocilo;

  private legendaModal: BsModalRef;
  private potrditevModal: BsModalRef;

  constructor(private rezervacijaService: RezervacijeService, private meniService: MeniService, private modalService: BsModalService,private authService: AuthService,private narociloService:NarociloService) { }

  ngOnInit(): void {
    this.rezervacijaService.pridobiRezervacije('').then((rezervacije) => {
      //rezervacije.sort((a,b)=>b.datum.getTime()-a.datum.getTime());
      this.rezervacijeCaka = rezervacije.filter((el) => el.stanje == 'caka');
      this.rezervacijePotrjene = rezervacije.filter((el) => el.stanje == 'potrjena');
      return this.meniService.pridobiMeni();
    }).then(meni => {
      this.meniItems = meni;
      this.rezervacijeAlert = { 'type': 'info', 'open': false, 'sporocilo': 'Pridobivanje rezervacij...' }
    }).catch(napaka => {
      this.rezervacijeAlert = { 'type': 'danger', 'open': true, 'sporocilo': 'Napaka pri pridobivanju rezervacij' }
    });
    this.uporabnik=this.authService.vrniTrenutnegaUporabnika();
  }

  public odpriLegendaModal(legenda) {
    this.legendaModal = this.modalService.show(legenda);
  }

  public zapriLegendaModal() {
    this.legendaModal.hide();
  }

  public odpriPotrditevModal(potrditev,id){
    this.rezervacijaPotrditev=this.rezervacijePotrjene.find(el=>el._id==id);
    let narociloTemp=this.rezervacijaPotrditev.narocilo;
    this.narociloPotrditev=new Narocilo();
    this.narociloPotrditev._id=narociloTemp._id;
    this.narociloPotrditev.datum_in_ura=narociloTemp.datum_in_ura;
    this.narociloPotrditev.stanje='sprejeto';
    this.narociloPotrditev.meni_items=<any>[];
    this.narociloPotrditev.miza=0;
    this.narociloPotrditev.natakar={id_uporabnika:this.authService.vrniTrenutnegaUporabnika()._id};
    this.meniItems.forEach((el)=>this.narociloPotrditev.meni_items.push(<any>{
      meni_item: el._id,
      cena: el.cena,
      ime: el.ime,
      kolicina: narociloTemp.meni_items.find((el2)=>el2.meni_item==el._id) ? narociloTemp.meni_items.find((el2)=>el2.meni_item==el._id).kolicina : 0
    }));
    this.posodobiCeno();
    
    //console.log(this.rezervacijaPotrditev);
    this.potrditevModal=this.modalService.show(potrditev);
  }

  public povecajNarocilo(index){
    let meni_item=this.narociloPotrditev.meni_items[index];
    if(meni_item.kolicina<9){
      meni_item.kolicina++;
    }
    this.posodobiCeno();
  }

  public zmanjsajNarocilo(index){
    let meni_item=this.narociloPotrditev.meni_items[index];
    if(meni_item.kolicina>0){
      meni_item.kolicina--;
    }
    this.posodobiCeno();
  }

  public posljiNarocilo(){
    let meni_items_reduced=this.narociloPotrditev.meni_items.reduce((acc,cur)=>{
      if(cur.kolicina>0){
        acc.push(cur);
      }
      return acc;
    },[])
    let errors=[];
    if(meni_items_reduced.length==0) errors.push("ni jedi");
    if(this.narociloPotrditev.miza<1) errors.push("napačna številka mize");
    if(errors.length>0){
      window.alert("Napake: "+errors.join(", "));
      return;
    }
    this.narociloPotrditev.meni_items=<any> meni_items_reduced;
    this.rezervacijaService.posodobiRezervacije(this.rezervacijaPotrditev._id,'narocilo').then((odgovor)=>{
      return this.narociloService.posodobiNarocilo(this.narociloPotrditev._id,this.narociloPotrditev);
    }).then((odgovor)=>{
      this.potrditevModal.hide();
      window.alert("Rezervacija uspešno oddana");
      this.rezervacijePotrjene=this.rezervacijePotrjene.filter((el)=>el._id!=this.rezervacijaPotrditev._id);
    }).catch((napaka)=>{
      this.potrditevModal.hide();
      window.alert("Prišlo je do napake");
    })
  }

  private posodobiCeno(){
    this.narociloPotrditev.cena=this.narociloPotrditev.meni_items.reduce((acc,cur)=>acc+=cur.cena*cur.kolicina,0);
  }

  public zapriPotrditevModal(){
    this.potrditevModal.hide();
  }

  public potrdiRezervacijo(id) {
    this.rezervacijaService.posodobiRezervacije(id, "potrdi").then((odgovor) => {
      window.alert("Uspešna potrditev");
      let tempRezervacija: Rezervacija;
      this.rezervacijeCaka = this.rezervacijeCaka.filter((el) => {
        if (el._id == id) {
          tempRezervacija = el;
          return false;
        } else {
          return true;
        }
      });
      this.rezervacijePotrjene.push(tempRezervacija);
      this.rezervacijePotrjene.sort((a, b) => <any>b.datum - <any>a.datum);
    }).catch((napaka) => {
      window.alert("Prišlo je do napake");
    })
  }

  public zavrniRezervacijo(id) {
    this.rezervacijaService.posodobiRezervacije(id, 'zavrni').then((odgovor) => {
      this.rezervacijeCaka=this.rezervacijeCaka.filter(el=>el._id!=id);
      this.rezervacijePotrjene=this.rezervacijePotrjene.filter(el=>el._id!=id);
      window.alert("Uspešna zavrnitev");
    }).catch(napaka=>{
      window.alert("Prišlo je do napake");
    })
  }

}
