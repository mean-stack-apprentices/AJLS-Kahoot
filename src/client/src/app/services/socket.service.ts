import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Quiz } from '../../../../shared/models/quiz.model';

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
  startQuiz(quiz:Quiz) {
    return this.socket.emit('start quiz',quiz);
  }

}
