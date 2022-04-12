import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectedQuizSelector } from 'src/app/store/selectors/quiz/quiz.selectors';
import { Quiz } from '../../../../../shared/models/quiz.model';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss']
})
export class QuizDetailsComponent implements OnInit {

  QuizId : String | null = null;
  
  selectedQuiz$: Observable<Quiz | null>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) { 
    
    this.selectedQuiz$ = this.store.select(selectedQuizSelector);
      }
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      this.QuizId = params.get('quizId');
        });
        
  }
}
