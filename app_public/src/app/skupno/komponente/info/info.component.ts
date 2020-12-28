import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../razredi/user";
import {AuthService} from "../../storitve/auth.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  public user:User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.vrniTrenutnegaUporabnika()
  }

}
