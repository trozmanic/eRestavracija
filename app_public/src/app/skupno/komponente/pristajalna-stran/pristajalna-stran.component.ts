import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import {AuthService} from '../../storitve/auth.service';
import {User} from '../../razredi/user';
import { PovezavaService } from '../../storitve/povezava.service';

@Component({
  selector: 'app-pristajalna-stran',
  templateUrl: './pristajalna-stran.component.html',
  styleUrls: ['./pristajalna-stran.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PristajalnaStranComponent implements OnInit {

  public izbrano_ime: String;

  constructor(private router: Router, private authSerivce: AuthService,private povezavaStoritev: PovezavaService) { }

  ngOnInit(): void {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        console.log();
        if(data.state.root.firstChild.firstChild.url.length>0){
          this.izbrano_ime = data.state.root.firstChild.firstChild.url[0].path;
        }else{
          this.izbrano_ime = 'index';
        }

      }
    });
  }
  vrniVlogo(): string {
    const user: User = this.authSerivce.vrniTrenutnegaUporabnika();
    if (!user) {
      return 'anonymous';
    }
    else {
      return user.vloga;
    }
  }

  public jePovezava(){
    return this.povezavaStoritev.jePovezava;
  }

}
