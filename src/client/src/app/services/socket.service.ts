import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Player } from '../../../../shared/models/player.model';
import { Question } from '../../../../shared/models/question.model';
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
    this.socket.on('connect', () => {});
    
    this.socket.on('route',(url:string)=>{
      this.route.navigate([url])
    });

  }

  getMessage() {
    return this.socket.fromEvent<string>('message');
  }

  getErrMessage() {
    return this.socket.fromEvent<string>('err-message');
  }

  getErrorMessage() {
    return this.socket.fromEvent<string>('error-message');
  }

  // set host to true for current socket id
  startQuiz(quiz:Quiz) {
    return this.socket.emit('start quiz',quiz);
  }

  getGamePin() {
    return this.socket.fromEvent<string>('get-pin');
  }

  isValidPin(pin:string) {
    return this.socket.emit('validate gamepin', pin);
  }

  addPlayerName(name: string) {
    return this.socket.emit('add-name',name);
  }

  getPlayersJoined() {
    return this.socket.fromEvent<Player[]>('player joined');  
  }

  getPlayerJoinMsg() {
    return this.socket.fromEvent('get-join-msg');
  }

  // start quiz and send players to question page
  goToQuestionPage() {
    return this.socket.emit('go-to-question');
  }

  // request for question
  requestQuestion() {
    return this.socket.emit('request-question');
  }

  // get one question
  getQuestion() {
    return this.socket.fromEvent<Question>('data-question');
  }

  // send player answer choice
  sendAnswer(answer: String) {
    return this.socket.emit('send-answer',answer);
  }

  checkIfHost() {
    return this.socket.emit('check-if-host');
  }

  isHost() {
    return this.socket.fromEvent<boolean>('is-host');
  }

  requestScores() {
    return this.socket.emit('request-players-scores');
  }

  getScores() {
    return this.socket.fromEvent<Player[]>('all-players-scores');
  }

}
