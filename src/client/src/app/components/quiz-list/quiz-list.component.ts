import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { loadQuizzes, selectQuiz } from 'src/app/store/actions/quiz/quiz.actions';
import { quizzesSelector } from 'src/app/store/selectors/quiz/quiz.selectors';
import { Quiz } from '../../../../../shared/models/quiz.model';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
  quizzes$:Observable<Quiz[] | null>

  constructor(
    private store:Store<AppState>,
    private router:Router) 
  {
      this.quizzes$ = this.store.select(quizzesSelector);
  }

  ngOnInit(): void {
    this.store.dispatch(loadQuizzes());
  }

  goToDetails(quiz: Quiz){
    this.store.dispatch(selectQuiz({data:quiz}));
    this.router.navigate(['quiz-details/'+ quiz._id]);
  }

  getIndex(i: any) {
    return Math.floor(i%4);
  }

}
