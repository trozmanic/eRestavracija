import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {MeniItem, MeniItemPOST, MeniItemPUT, Sestavina} from "../../razredi/meniItem";
import {MeniService} from "../../storitve/meni.service";

@Component({
  selector: 'app-nadzorna-plosca-meni',
  templateUrl: './nadzorna-plosca-meni.component.html',
  styleUrls: ['./nadzorna-plosca-meni.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NadzornaPloscaMeniComponent implements OnInit {

  public menuItems: MeniItem[]

  public sestavine: Sestavina[] = []

  public image: string

  constructor(private meniService: MeniService) { }

  public selectedItem: MeniItem
  public add: boolean = false

  private getMenuItems(): void{
    this.meniService.pridobiMeni().then(menuItems => this.menuItems = menuItems)
  }

  ngOnInit(): void {
    this.getMenuItems()
  }

  delete(_id: string) {
    this.meniService.deleteItem(_id).then(() => {
      this.getMenuItems()
    })
  }

  editItem(item: MeniItem): void {
    this.selectedItem = item
  }
  discard(){
    this.sestavine = []
    this.selectedItem = null
    this.add=false
  }

  removeSestavina(index: number){
    delete this.sestavine[index]
    var noveSestavine: Sestavina[] = []
    for(var i = 0; i < this.sestavine.length; i++){
      if(this.sestavine[i] != null){
        noveSestavine.push(this.sestavine[i])
      }
    }
    this.sestavine = noveSestavine
    console.log(this.sestavine)
  }

  addSestavina(sestavina: string, kolicina: string){
    this.sestavine.push(new Sestavina(sestavina, parseFloat(kolicina)))
  }

  onClickSubmitAdd(data){
    const newMenuItem: MeniItemPOST = new MeniItemPOST()

    newMenuItem.ime = data.name;
    newMenuItem.cena = data.price;
    newMenuItem.opis = data.description;
    newMenuItem.kalorije = data.calories;
  console.log(newMenuItem)
    this.meniService.addItem(newMenuItem).then(() => {
      this.getMenuItems()
      this.selectedItem = null
      this.add = false
      this.sestavine = []
    }).catch()
  }

  onClickSubmitUpdate(data){
    const newMenuItem: MeniItemPUT = new MeniItemPUT()

    newMenuItem.id = this.selectedItem._id
    newMenuItem.slika = this.selectedItem.slika
    newMenuItem.ime = data.name;
    newMenuItem.cena = data.price;
    newMenuItem.opis = data.description;
    newMenuItem.kalorije = data.calories;

    this.meniService.editItem(newMenuItem).then(() => {
      this.getMenuItems()
      this.selectedItem = null
      this.add = false
      this.sestavine = []
    }).catch()
  }

  dodaj(){
    this.selectedItem = null
    this.add =  true
  }
}
