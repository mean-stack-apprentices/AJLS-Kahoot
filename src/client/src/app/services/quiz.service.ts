import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Quiz } from '../../../../shared/models/quiz.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  routeString = 'quizzes/';

  constructor( private api:ApiService,private router: Router ) { }

  createQuiz(quiz: Quiz){
    return this.api.post<{data: Quiz}, Quiz>(`${this.routeString}create-quiz`,quiz).pipe(map((res)=>res.data))
  }
}
