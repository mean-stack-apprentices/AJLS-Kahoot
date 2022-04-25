import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Question } from '../../../../shared/models/question.model';
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

  getQuizzes(){
    return this.api.get<{data:Quiz[]}>(`${this.routeString}`).pipe(map((res)=>res.data))
  }

  getQuizDetails(quiz: Quiz){
    return this.api.get<{data:Quiz}>(`${this.routeString}quiz/`+ quiz._id).pipe(map((res)=>res.data))
  }

  createQuiz(quiz: Quiz){
    return this.api.post<{data: Quiz}, Quiz>(`${this.routeString}create-quiz-title`,quiz).pipe(map((res)=>res.data))
  }

  navigateToCreateQuestion(quiz: Quiz) {
    return of(this.router.navigate(['/create-question/'+ quiz._id]));
  }

  createQuestion(question: Question, quizId: String | null) {
    console.log("services", question,quizId);
    return this.api.post<{data: Quiz},Question>(`${this.routeString}create-quiz-question/`+quizId, question);
  }

}
