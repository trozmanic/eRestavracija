import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NarocilaNatakar, NarociloSocket, NarociloZaposleni} from '../../razredi/narocilo';
import {NarociloService} from '../../storitve/narocilo.service';
import Swal from 'sweetalert2';
import {MeniItem} from '../../razredi/meniItem';
import {MeniService} from '../../storitve/meni.service';
import {SocketService} from '../../storitve/socket.service';
import {AuthService} from '../../storitve/auth.service';
@Component({
  selector: 'app-nadzorna-plosca-natakar',
  templateUrl: './nadzorna-plosca-natakar.component.html',
  styleUrls: ['./nadzorna-plosca-natakar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NadzornaPloscaNatakarComponent implements OnInit {
  public narocila: NarocilaNatakar;
  public meniItems: MeniItem [];
  public socket: any;

  constructor(private narociloService: NarociloService, private meniService: MeniService, private socketService: SocketService, private authService: AuthService) { }

  ngOnInit(): void {
    this.narociloService.pridobiNarocilaNatakar()
      .then(res => {
        this.narocila = res;
        console.log("fsfd"+res);
      })
      .catch(err => {
        Swal.fire('Napaka', 'Napaka pri pridobivanju narocil za uporabnisko vlogo natakar', 'error');
        console.log(err);
      });
    this.meniService.pridobiMeni()
      .then(res => {
        this.meniItems = res;
      })
      .catch(err =>  {
        Swal.fire('Napaka', 'Napaka pri pridobivanju podatkov o meniju potrebnih za kreiranje naoricla', 'error');
        console.log(err);
      });
    this.socketService.socket.on('narociloNatakar-' + this.authService.vrniTrenutnegaUporabnika()._id, (message) => {
      const narociloSocket: NarociloSocket = JSON.parse(message);
      if (narociloSocket.from === 'sprejeto' && narociloSocket.to === 'v pripravi') {
        // tslint:disable-next-line:max-line-length
        Swal.fire('Narocilo', 'Kuhar je spremenil narocilo za mizo: ' + narociloSocket.narocilo.miza + ' iz ' + narociloSocket.from + ' v ' + narociloSocket.to, 'info');
        this.narocila.vrsta = this.narocila.vrsta.filter((narociloCur) => narociloCur._id !== narociloSocket.narocilo._id);
      }
      if (narociloSocket.from === 'v pripravi' && narociloSocket.to === 'sprejeto') {
        // tslint:disable-next-line:max-line-length
        Swal.fire('Narocilo', 'Kuhar je spremenil narocilo za mizo: ' + narociloSocket.narocilo.miza + ' iz ' + narociloSocket.from + ' v ' + narociloSocket.to, 'info');
        this.narocila.vrsta.push(narociloSocket.narocilo);
      }
      if (narociloSocket.from === 'v pripravi' && narociloSocket.to === 'pripravljeno') {
        // tslint:disable-next-line:max-line-length
        Swal.fire('Narocilo', 'Kuhar je spremenil narocilo za mizo: ' + narociloSocket.narocilo.miza + ' iz ' + narociloSocket.from + ' v ' + narociloSocket.to, 'info');
        this.narocila.priprava.push(narociloSocket.narocilo);
      }
     });
  }


  // tslint:disable-next-line:typedef
  public stateToArrayMapper(state: string) {
    console.log(state);
    const mapper = {
      placano: 'vrsta',
      pripravljeno: 'priprava',
      postrezeno: 'postrezena'
    };
    console.log(mapper[state]);
    return mapper[state];
  }

  changeOrders(narocilo: NarociloZaposleni, oldStatus: string): void {
    const newState = narocilo.stanje;
    if (newState === 'placano') {
      this.narocila.postrezena  = this.narocila.postrezena.filter(narociloCur => narocilo._id !== narociloCur._id);
      return;
    }
    if (newState === 'zbrisano') {
      this.narocila.vrsta = this.narocila.vrsta.filter(narociloCur => narocilo._id !== narociloCur._id);
      return;
    }
    // tslint:disable-next-line:max-line-length
    this.narocila[this.stateToArrayMapper(oldStatus)] = this.narocila[this.stateToArrayMapper(oldStatus)].filter((narociloCur) => narociloCur._id !== narocilo._id);
    // @ts-ignore
    this.narocila[this.stateToArrayMapper(newState)].push(narocilo);
    console.log(narocilo._id, narocilo.stanje, oldStatus);
  }

  // tslint:disable-next-line:typedef
  dodajNarocilo($event: NarociloZaposleni) {
    this.narocila.vrsta.push($event);
    const narociloSocket: NarociloSocket = new NarociloSocket();
    narociloSocket.narocilo = $event;
    narociloSocket.from = '';
    narociloSocket.to = 'sprejeto';
    this.socketService.narociloKuhar(narociloSocket);
  }
}
