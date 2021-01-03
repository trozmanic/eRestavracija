import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NarocilaKuhar, NarociloSocket, NarociloZaposleni} from '../../razredi/narocilo';
import {NarociloService} from '../../storitve/narocilo.service';
import {SocketService} from '../../storitve/socket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nadzorna-plosca-kuhar',
  templateUrl: './nadzorna-plosca-kuhar.component.html',
  styleUrls: ['./nadzorna-plosca-kuhar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NadzornaPloscaKuharComponent implements OnInit {

  constructor(private narociloService: NarociloService, private socketService: SocketService) { }
  public narocila: NarocilaKuhar;

  ngOnInit(): void {
    this.narociloService.pridobiNarocila()
      .then((narocila) => {
        console.log(narocila);
        this.narocila = narocila;
      });
    this.socketService.socket.on('narociloKuhar', (message) => {
      const narociloSocket: NarociloSocket  = JSON.parse(message);
      console.log(message);
      if (narociloSocket.to === 'zbrisano') {
        this.narocila.vrsta = this.narocila.vrsta.filter((narocilo) => narocilo._id !== narociloSocket.narocilo._id);
        Swal.fire('Posodobitev narocila', 'Natakar je izbrisal narocilo', 'info');
      }
      if (narociloSocket.to === 'sprejeto') {
        this.narocila.vrsta.push(narociloSocket.narocilo);
        Swal.fire('Novo narocilo', 'Natakar je kreirakl novo narocilo', 'info');
      }
    });
  }

  changeOrders(narocilo: NarociloZaposleni): void {
    const novoStanje = narocilo.stanje;
    const id = narocilo._id;
    if (novoStanje === 'v pripravi') {
      this.narocila.vrsta = this.narocila.vrsta.filter(item => item._id !== id);
      this.narocila.priprava.push(narocilo);
    }
    if (novoStanje === 'sprejeto') {
      this.narocila.priprava = this.narocila.priprava.filter(item => item._id !== id);
      this.narocila.vrsta.push(narocilo);
    }
    if (novoStanje === 'pripravljeno') {
      this.narocila.priprava = this.narocila.priprava.filter((item) => {
        return item._id !== id;
      });
    }
  }

  socketOrderHandler(message): void {
    const narociloSocket: NarociloSocket  = JSON.parse(message);
    console.log(message);
    if (narociloSocket.to === 'zbrisano') {
      this.narocila.vrsta = this.narocila.vrsta.filter((narocilo) => narocilo._id !== narociloSocket.narocilo._id);
    }
  }

}
