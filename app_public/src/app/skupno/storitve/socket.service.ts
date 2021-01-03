import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';
import { environment } from 'src/environments/environment';
import {NarociloSocket} from '../razredi/narocilo';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket: any;
  constructor() {
    console.log('constructing');
    this.socket = io (environment.socket_url);
  }

  narociloKuhar(narocilo: NarociloSocket): void {
    this.socket.emit('narociloKuhar', JSON.stringify(narocilo));
  }
  narociloNatakar(narocilo: NarociloSocket): void {
    this.socket.emit('narociloNatakar', JSON.stringify(narocilo));
  }
  listenForEvent(eventName: string, handler: any): void {
    this.socket.on(eventName, handler);
  }
}
