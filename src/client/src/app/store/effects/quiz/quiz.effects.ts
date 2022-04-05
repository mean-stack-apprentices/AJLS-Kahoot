import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  createQuizTitle,
  createQuizTitleSuccess,
  createQuizTitleFailure,
  navigateToCreateQuestion,
  loadQuizzes,
  loadQuizzesSuccess,
  loadQuizzesFailure,
} from '../../actions/quiz/quiz.actions';
import { QuizService } from 'src/app/services/quiz.service';

@Injectable()
export class QuizEffects {
  createQuiz$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createQuizTitle),
      mergeMap((action) =>
        this.quizService.createQuiz(action.data).pipe(
          map((data) => createQuizTitleSuccess({ data })),
          catchError((error) => of(createQuizTitleFailure(error)))
        )
      )
    )
  );

  navigateToCreateQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createQuizTitleSuccess),
      mergeMap(() =>
        this.quizService.navigateToCreateQuestion().pipe(
          map(() => navigateToCreateQuestion())
        )
      )
    )
  );

loadQuizzes$ = createEffect(() =>
this.actions$.pipe(
  ofType(loadQuizzes),
  mergeMap(() =>
    this.quizService.getQuizzes().pipe(
      map((data) => loadQuizzesSuccess ({ data })),
      catchError((error) => of(loadQuizzesFailure({ error })))
    )
  )
)
);

  constructor(private actions$: Actions, private quizService: QuizService) {}
}
