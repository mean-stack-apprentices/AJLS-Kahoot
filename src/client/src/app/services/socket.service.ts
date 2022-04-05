import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private socket: Socket
  ) 
  { 
    this.socket.on('connect', () => {})
  }

  getMessage() {
    return this.socket.fromEvent<string>('message');
  }

}
