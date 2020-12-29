import { Component, OnInit } from '@angular/core';
import {OcenaService} from '../../storitve/ocena.service';
import {MeniItemGost} from '../../razredi/meniItem';
import {Ocena} from '../../razredi/ocena';
import {Uporabnik} from '../../razredi/uporabnik';
import {AuthService} from '../../storitve/auth.service';
import {User} from '../../razredi/user';

@Component({
  selector: 'app-modal-rating',
  templateUrl: './modal-rating.component.html',
  styleUrls: ['./modal-rating.component.css']
})
export class ModalRatingComponent implements OnInit {

  message: MeniItemGost;
  currentRating: number;

  constructor(private ocenaService: OcenaService, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentRating = 3;
    this.ocenaService.currentMessage.subscribe((message) => {
      this.message = message;
      if (message !== null) {
        this.show();
      }
    });
  }

  close(): void {
    this.message = null;
    this.currentRating = 3;
    document.getElementsByClassName('modal_rating')[0].classList.add('hidden');
  }

  show(): void {
    console.log('shwoing');
    document.getElementsByClassName('modal_rating')[0].classList.remove('hidden');
  }

  posljiOceno(): void {
    // tslint:disable-next-line:no-unused-expression
    const ocena: Ocena = new Ocena();
    const uporabnik: User = this.authService.vrniTrenutnegaUporabnika();
    ocena.id = this.message._id.toString();
    ocena.id_uporabnika = uporabnik._id.toString();
    ocena.ocena = this.currentRating;
    this.ocenaService.oceniJed(ocena)
      .then((meniItem) => {
        alert('Uspesno oddana ocena');
        this.message.ocenjena = true;
        // @ts-ignore
        this.message.ocena_count += 1;
        // @ts-ignore
        this.message.ocena += this.currentRating;
        this.ocenaService.changeMessage(this.message);
        this.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }


}
