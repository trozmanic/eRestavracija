import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MeniService} from '../../storitve/meni.service';
import {MeniItem, MeniItemGost} from '../../razredi/meniItem';
import {AuthService} from '../../storitve/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-meni',
  templateUrl: './meni.component.html',
  styleUrls: ['./meni.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MeniComponent implements OnInit {

  constructor(private meniService: MeniService, private authService: AuthService) { }

  public meniItems: MeniItemGost [];

  ngOnInit(): void {
    if (this.authService.jePrijavljen()) {
      this.meniService.pridobiMeniGost()
        .then((meniItems) => {
          this.meniItems = meniItems;
          console.log(meniItems);
        })
        .catch((err) => Swal.fire('Napaka', 'Napaka pri pridobivanju menijev', 'error'));
    }
    else {
      this.meniItems = [];
      this.meniService.pridobiMeni()
        .then((meniItems) => {
          meniItems.forEach((meniItem) => {
            this.meniItems.push({
              ...meniItem,
              ocenjena: false
            });
          });
        })
        .catch((err) => Swal.fire('Napaka', 'Napaka pri pridobivanjue menijev', 'error'));
    }
  }

}
