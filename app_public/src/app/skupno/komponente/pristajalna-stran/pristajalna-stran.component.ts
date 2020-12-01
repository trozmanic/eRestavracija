import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-pristajalna-stran',
  templateUrl: './pristajalna-stran.component.html',
  styleUrls: ['./pristajalna-stran.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PristajalnaStranComponent implements OnInit {

  public izbrano_ime: String;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        if(data.state.root.firstChild.url.length>0){
          this.izbrano_ime=data.state.root.firstChild.url[0].path;
        }else{
          this.izbrano_ime="index";
        }
        
      }
    });
  }

}
