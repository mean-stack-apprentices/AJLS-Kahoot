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

  // set host to true for current socket id
  startQuiz() {
    return this.socket.emit('start quiz');
  }

  isValidPin(pin:string) {
    return this.socket.emit('validate gamepin', pin);
  }

}
