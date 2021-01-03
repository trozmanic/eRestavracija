import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../razredi/user';
import {AuthService} from '../../storitve/auth.service';
import { PovezavaService } from '../../storitve/povezava.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  public user: User;

  constructor(public authService: AuthService, private povezavaStoritev: PovezavaService) { }

  ngOnInit(): void {
    this.user = this.authService.vrniTrenutnegaUporabnika();
  }

  odjavi(): void {
    this.authService.odjava();
  }

  public jePovezava(){
    return this.povezavaStoritev.jePovezava;
  }

}
