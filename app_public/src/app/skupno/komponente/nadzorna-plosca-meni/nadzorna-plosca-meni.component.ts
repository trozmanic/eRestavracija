import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {MeniItem} from "../../razredi/meniItem";
import {MeniService} from "../../storitve/meni.service";

@Component({
  selector: 'app-nadzorna-plosca-meni',
  templateUrl: './nadzorna-plosca-meni.component.html',
  styleUrls: ['./nadzorna-plosca-meni.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NadzornaPloscaMeniComponent implements OnInit {

  public menuItems: MeniItem[]
  constructor(private meniService: MeniService) { }



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

  edit(menuItem: MeniItem) {
    this.meniService.editItem(menuItem)
      .then(() => {
        this.getMenuItems()
      })
      .catch()
  }
}
