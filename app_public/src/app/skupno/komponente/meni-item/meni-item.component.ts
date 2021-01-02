import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MeniService} from '../../storitve/meni.service';
import {MeniItem, MeniItemGost} from '../../razredi/meniItem';
import {OcenaService} from '../../storitve/ocena.service';
import {AuthService} from '../../storitve/auth.service';

@Component({
  selector: 'app-meni-item',
  templateUrl: './meni-item.component.html',
  styleUrls: ['./meni-item.component.css']
})
export class MeniItemComponent implements OnInit {

  constructor(meniService: MeniService, private ocenaService: OcenaService, private authService: AuthService) { }
  @Input() meniItem: MeniItemGost;
  message: MeniItemGost;

  ngOnInit(): void {
    this.ocenaService.currentMessage.subscribe((message) => {
      if (this.message) {
        if (this.message._id === this.meniItem._id) {
          this.meniItem = message;
        }
      }
    });
  }

  toggleInfo(): void {
    const properties = document.getElementById(this.meniItem._id.toString());
    if (properties.classList.contains('hidden')) {
      properties.classList.remove('hidden');
    }
    else {
      properties.classList.add('hidden');
    }
  }

  calculateStars(): Array<any> {
    // tslint:disable-next-line:radix
    const ocena = parseInt(this.meniItem.ocena.toString());
    // tslint:disable-next-line:radix
    const ocenaCount = parseInt(this.meniItem.ocena_count.toString());
    if (ocenaCount === 0) {
      return new Array(0);
    }
    else {
      return new Array ( Math.round(ocena / ocenaCount) );
    }
  }

  // tslint:disable-next-line:typedef
  newMessage() {
    if (!this.authService.jePrijavljen()) {
      return alert('Ce zeliste oceniti jed je potrebna prijava ali registracija');
    }
    if (this.authService.vrniTrenutnegaUporabnika().vloga !== 'gost') {
      return alert('Ocenjevanje jedi je na voljo le gostom');
    }
    this.ocenaService.changeMessage(this.meniItem);
  }

}
