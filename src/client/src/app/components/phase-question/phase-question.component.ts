import { Component, Input, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Question } from '../../../../../shared/models/question.model';

@Component({
  selector: 'app-phase-question',
  templateUrl: './phase-question.component.html',
  styleUrls: ['./phase-question.component.scss']
})
export class PhaseQuestionComponent implements OnInit {
  question:null | Question = null;
   public answer= ''
  constructor(private socket:Socket) { }

  ngOnInit(): void {

    this.socket.emit('get-question')
    this.socket.on('data-question',(question:Question)=>{ this.question=question;  } )
  }

  
}
