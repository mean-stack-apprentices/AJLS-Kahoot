import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';
import { Question } from '../../../../../shared/models/question.model';


@Component({
  selector: 'app-phase-question',
  templateUrl: './phase-question.component.html',
  styleUrls: ['./phase-question.component.scss']
})
export class PhaseQuestionComponent implements OnInit {
  data$! : Observable<any>;
  answer : String | null = null;
  submitted: boolean = false;

  constructor(
    private socketService: SocketService
  )
  {

  }

  ngOnInit(): void {
    this.socketService.requestQuestion();
    this.data$ = this.socketService.getQuestion();
  }

  submitAnswer(){
    if(this.answer) {
      this.socketService.sendAnswer(this.answer);
      this.submitted = true;
    }
    else{
      alert("Please choose your answer.");
    }
  }

}
