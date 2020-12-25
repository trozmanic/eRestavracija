import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Uporabnik } from '../../razredi/uporabnik';
import { UporabnikService } from '../../storitve/uporabnik.service';

@Component({
  selector: 'app-rezervacija-podatki',
  templateUrl: './rezervacija-podatki.component.html',
  styleUrls: ['./rezervacija-podatki.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RezervacijaPodatkiComponent implements OnInit {

  public uporabnik: Uporabnik;

  private date: Date = new Date();
  private today: Date = new Date();

  constructor(private uporabnikService: UporabnikService,private router: Router) { }

  ngOnInit(): void {
    let id = JSON.parse(localStorage.getItem("credentials")).uporabnik_id;
    this.uporabnikService.pridobiUporabnike(id).then(uporabnik => this.uporabnik = uporabnik);

    this.drawCalander(this.date.getFullYear(), this.date.getMonth());
    document.getElementsByClassName("calander")[0].getElementsByTagName("tbody")[0].addEventListener('click', this.klicKolendar.bind(this));
    document.getElementById("kolendarNaprej").addEventListener("click", this.klickKolendarNaprej.bind(this));
    document.getElementById("kolendarNazaj").addEventListener("click", this.klickKolendarNazaj.bind(this));
    document.getElementById("klikNaprej").addEventListener("click",this.klikNaprej.bind(this));
  }

  private drawCalander(year, month) {
    let meseci = ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"];
    let firstDay = new Date(year, month, 1).getDay();
    if (firstDay == 0) firstDay = 7;

    let numOfDaysCurrent = this.getDaysInMonth(year, month);
    let numOfDaysPrevious = this.getDaysInMonth(year, month - 1);
    let dayArray = Array.from(new Array(firstDay - 1), (x, i) => [numOfDaysPrevious - firstDay + i + 2, true]);
    dayArray.push(...Array.from(new Array(numOfDaysCurrent), (x, i) => [i + 1,this.today.getDay()>i+1 && year==this.today.getFullYear() && month==this.today.getMonth() ? true : false]));
    dayArray.push(...Array.from(new Array(42 - dayArray.length), (x, i) => [i + 1, true]));
    let res = '';
    for (let i = 0; i < 6; i++) {
      res += '<tr>';
      for (let j = 0; j < 7; j++) {
        res += '<td' + (dayArray[i * 7 + j][1] ? ' class="grayedout"' : '') + '>' + dayArray[i * 7 + j][0] + '</td>'
      }
      res += '</tr>';
    }
    document.getElementById("calander_inner").innerHTML = res;
    document.getElementById("leto").innerHTML = meseci[month] + " " + year;
  }

  private getDaysInMonth(year, month) {
    return 32 - new Date(year, month, 32).getDate();
  }

  private removeColored() {
    let tds = document.getElementsByClassName("calander")[0].getElementsByTagName("tbody")[0].getElementsByTagName("td");
    [].forEach.call(tds, (td) => {
      td.classList.remove('calander_click');
    })
  }

  private klicKolendar(dogodek) {
    if (!dogodek.target.classList.contains('grayedout')) {
      this.removeColored();
      dogodek.target.classList.add("calander_click");
    }
  }

  private klickKolendarNaprej() {
    this.date.setMonth(this.date.getMonth() + 1);
    this.drawCalander(this.date.getFullYear(), this.date.getMonth());
  }

  private klickKolendarNazaj() {
    let newDate = new Date(this.date);
    newDate.setMonth(this.date.getMonth() - 1);
    console.log(newDate);
    if (newDate >= this.today) {
      this.date.setMonth(this.date.getMonth() - 1);
      this.drawCalander(this.date.getFullYear(), this.date.getMonth());
    }
  }

  public klikNaprej(dogodek){
    let ura=(<HTMLInputElement>document.getElementById("time")).value;
    let stOseb=(<HTMLInputElement>document.getElementById("stoseb")).value;
    let dan= document.querySelector(".calander_click");
    
    let errors=[];
    if(ura=="") errors.push("uro");
    if(+stOseb<1) errors.push("število oseb");
    if(dan==null) errors.push("datum");

    if(errors.length>0){
        window.alert("Prosim vnesite: "+errors.join(", "));
    }else{
        let datum=new Date(this.date.getFullYear(),this.date.getMonth(),parseInt(dan.innerHTML));
        let sessionStorage=window.sessionStorage;
        sessionStorage.setItem("ura",ura);
        sessionStorage.setItem("stOseb",stOseb);
        sessionStorage.setItem("datum",datum.toJSON());
        this.router.navigate(["rezerviraj","meni"]);
    }
}

}
