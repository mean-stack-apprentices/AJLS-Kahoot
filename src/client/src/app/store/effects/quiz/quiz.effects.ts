import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  createQuiz,
  createQuizSuccess,
  createQuizFailure,
} from '../../actions/quiz/quiz.actions';
import { QuizService } from 'src/app/services/quiz.service';

@Injectable()
export class QuizEffects {
  createQuiz$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createQuiz),
      mergeMap((action) =>
        this.quizService.createQuiz(action.data).pipe(
          map((data) => createQuizSuccess({ data })),
          catchError((error) => of(createQuizFailure(error)))
        )
      )
    )
  );

  constructor(private actions$: Actions, private quizService: QuizService) {}
}
