import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {NarociloSocket, NarociloUpdetable, NarociloZaposleni} from '../../razredi/narocilo';
import {NarociloService} from '../../storitve/narocilo.service';
import {AuthService} from '../../storitve/auth.service';
import {SocketService} from '../../storitve/socket.service';
import {User} from '../../razredi/user';

@Component({
  selector: 'app-narocilo',
  templateUrl: './narocilo.component.html',
  styleUrls: ['./narocilo.component.css']
})
export class NarociloComponent implements OnInit {

  constructor( private narociloService: NarociloService, private authService: AuthService, private socketService: SocketService) { }
  @Input() narocilo: NarociloZaposleni;
  @Output() newStatusEvent = new EventEmitter <NarociloZaposleni>();
  private availableStates = ['zbrisano', 'sprejeto', 'v pripravi', 'pripravljeno', 'postrezeno', 'placano'];
  private vloga: string;
  private stateAllowed = {
    natakar : {
      positive: ['pripravljeno', 'postrezeno'],
      negative: ['sprejeto', 'postrezeno']
    },
    kuhar: {
      positive: ['sprejeto', 'v pripravi'],
      negative: ['v pripravi']
    }
  };

  ngOnInit(): void {
    this.vloga = this.authService.vrniTrenutnegaUporabnika().vloga.toString();
  }

  showPositive(): boolean {
    return this.stateAllowed[this.vloga].positive.includes(this.narocilo.stanje.toString());
  }
  showNegative(): boolean {
    return this.stateAllowed[this.vloga].negative.includes(this.narocilo.stanje.toString());
  }

  handlePositive(): void {
    let newState = '';
    for (let index = 0; index < this.availableStates.length - 1 ; index ++) {
      if (this.availableStates[index] === this.narocilo.stanje){
        newState = this.availableStates[index + 1];
        break;
      }
    }
    this.changeOrderStatus(newState);
  }

  handleNegative(): void {
    let newState = '';
    for (let index = 1 ; index < this.availableStates.length ; index ++) {
      if (this.availableStates[index] === this.narocilo.stanje) {
        newState = this.availableStates[index - 1];
        break;
      }
    }
    this.changeOrderStatus(newState);
  }

  changeOrderStatus(toStatus: string): void {
    // tslint:disable-next-line:prefer-const
    let narociloUpd: NarociloUpdetable = new NarociloUpdetable();
    narociloUpd._id = this.narocilo._id.toString();
    narociloUpd.stanje = toStatus.toString();

    this.narociloService.posodobiNarociloAuth(narociloUpd)
      .then(() => {
        const from = this.narocilo.stanje;
        this.narocilo.stanje = toStatus;
        this.emitSocketEvent(this.narocilo, from.toString(), this.narocilo.stanje.toString());
        this.newStatusEvent.emit(this.narocilo);
      });
  }

  emitSocketEvent(narocilo: NarociloZaposleni, from: string, to: string): void {
    const user: User = this.authService.vrniTrenutnegaUporabnika();
    const narociloSocket: NarociloSocket = new NarociloSocket();
    narociloSocket.from = from;
    narociloSocket.to = to;
    narociloSocket.narocilo = narocilo;
    if ( (to === 'sprejeto' || to === 'zbrisano') && user.vloga === 'natakar') {
      this.socketService.narociloKuhar(narociloSocket);
    }

    if (user.vloga === 'kuhar') {
      this.socketService.narociloNatakar(narociloSocket);
    }
  }

}
