import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Player } from '../../../../shared/models/player.model';
import { Quiz } from '../../../../shared/models/quiz.model';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private socket: Socket,
    private route: Router
  )
  {
    this.socket.on('connect', () => {})
    
    this.socket.on('route',(url:string)=>{
      this.route.navigate([url])
    })

  }

  getMessage() {
    return this.socket.fromEvent<string>('message');
  }

  getErrMessage() {
    return this.socket.fromEvent<string>('err-message');
  }

  // set host to true for current socket id
  startQuiz(quiz:Quiz) {
    return this.socket.emit('start quiz',quiz);
  }

  isValidPin(pin:string) {
    return this.socket.emit('validate gamepin', pin);
  }

}
