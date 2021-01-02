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

  public selectedFiles: FileList

  public kal: number = 0

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
      // let newMenuItems = [];
      for(let i = 0; i < this.menuItems.length; i++){
        if(this.menuItems[i]._id == _id) {
          this.menuItems.splice(i, 1)
        }
      }
    })
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  editItem(item: MeniItem): void {
    this.selectedItem = item
    this.kal =  item.kalorije.valueOf()
  }
  discard(){
    this.sestavine = []
    this.selectedItem = null
    this.add=false
    this.kal = 0
    this.selectedFiles = null
  }

  removeSestavina(index: number){
    this.kal -= this.sestavine[index].kcal
    this.sestavine.splice(index, 1)

    console.log(this.sestavine)
  }

  addSestavina(sestavina: string, kolicina: string){
    console.log(this.kal)
    let energy = 0;
    this.meniService.foodAPI(sestavina, kolicina).then(res => {
      console.log(res);
      if(res.parsed[0] === undefined){
        energy = 0
      }else{
        energy = parseInt(kolicina) * ((res.parsed[0].food.nutrients.ENERC_KCAL) / 100.0);
      }
      this.sestavine.push(new Sestavina(sestavina, parseFloat(kolicina), energy));
      this.kal += energy
    });



  }

  onClickSubmitAdd(data){
    const newMenuItem: MeniItemPOST = new MeniItemPOST()

    newMenuItem.ime = data.name;
    newMenuItem.cena = data.price;
    newMenuItem.opis = data.description;
    newMenuItem.kalorije = data.calories;
    newMenuItem.slika = "";


    if(data.name == '' || data.price == '' || data.opis == '' || data.calories == ''){
      alert("Ime, Opis, Cena in Kalorije so obvezni atributi")
    }else {
      if(this.selectedFiles && this.selectedFiles.length > 0){
        let file = this.selectedFiles.item(0);
        console.log(file)
        let image = new FormData();
        image.append('image', file);
        this.meniService.postImage(image).then(odgovor => {
          var string = odgovor.image.replaceAll('\\', '/');
          string = string.replace('app_public', '');
          string = string.replace('/src', '');
          console.log(string);
          newMenuItem.slika = string
          this.meniService.addItem(newMenuItem).then((response) => {
            this.menuItems.push(response)
            this.selectedItem = null
            this.add = false
            this.sestavine = []
            this.kal = 0
            this.selectedFiles = null
          }).catch()
        })

      }else {
        this.meniService.addItem(newMenuItem).then((response) => {
          this.menuItems.push(response)
          this.selectedItem = null
          this.add = false
          this.sestavine = []
          this.kal = 0
          this.selectedFiles = null
        }).catch()
      }


    }
  }

  onClickSubmitUpdate(data){
    const newMenuItem: MeniItemPUT = new MeniItemPUT()

    newMenuItem.id = this.selectedItem._id
    newMenuItem.slika = this.selectedItem.slika
    newMenuItem.ime = data.name;
    newMenuItem.cena = data.price;
    newMenuItem.opis = data.description;
    newMenuItem.kalorije = data.calories;
    if(data.name == '' || data.price == '' || data.opis == '' || data.calories == ''){
      alert("Ime, Opis, Cena in Kalorije so obvezni atributi")
    }else {

      if(this.selectedFiles && this.selectedFiles.length > 0) {
        let file = this.selectedFiles.item(0);
        console.log(file)
        let image = new FormData();
        image.append('image', file);

        this.meniService.postImage(image).then(odgovor => {
          var string = odgovor.image.replaceAll('\\', '/');
          string = string.replace('app_public', '');
          string = string.replace('/src', '');

          newMenuItem.slika = string
          this.meniService.editItem(newMenuItem).then((res) => {

            let newMenuItems = [];
            for (let i = 0; i < this.menuItems.length; i++) {
              if (this.menuItems[i]._id === res._id) {
                newMenuItems.push(res)
              } else {
                newMenuItems.push(this.menuItems[i])
              }

            }
            this.menuItems = newMenuItems;
            this.selectedItem = null
            this.add = false
            this.sestavine = []
            this.kal = 0
            this.selectedFiles = null
          }).catch()
        })
      }else {
        this.meniService.editItem(newMenuItem).then((res) => {

          let newMenuItems = [];
          for (let i = 0; i < this.menuItems.length; i++) {
            if (this.menuItems[i]._id === res._id) {
              newMenuItems.push(res)
            } else {
              newMenuItems.push(this.menuItems[i])
            }

          }
          this.menuItems = newMenuItems;
          this.selectedItem = null
          this.add = false
          this.sestavine = []
          this.kal = 0
          this.selectedFiles = null
        }).catch()
      }
    }
  }

  dodaj(){
    this.selectedItem = null
    this.add =  true
  }
}
