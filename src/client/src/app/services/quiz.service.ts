import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Quiz } from '../../../../shared/models/quiz.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  routeString = 'quizzes/';

  constructor(
    private api:ApiService,
    private router: Router
  )
  { }

  createQuiz(quiz: Quiz){
    return this.api.post<{data: Quiz}, Quiz>(`${this.routeString}create-quiz-title`,quiz).pipe(map((res)=>res.data))
  }

  navigateToCreateQuestion(quiz: Quiz) {
    return of(this.router.navigate(['/create-question/'+ quiz._id]));
  }

  getQuizzes(){
    return this.api.get<{ data:Quiz[]}>(`${this.routeString}`).pipe(map((res)=>res.data))
  }

}
