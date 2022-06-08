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
  selectQuizSuccess,
  selectQuiz,
  selectQuizFailure,
  createQuizQuestion,
  createQuizQuestionFailure,
  createQuizQuestionSuccess,
  deleteQuiz,
  deleteQuizSuccess,
  deleteQuizFailure,
  navigateOnDeleteQuiz,
  
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

  createQuizQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createQuizQuestion),
      mergeMap((action) =>
        this.quizService.createQuestion(action.data, action.QuizId).pipe(
          map((data) => createQuizQuestionSuccess(data)),
          catchError((error) => of(createQuizQuestionFailure(error)))
        )
      )
    )
  );

  navigateToCreateQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createQuizTitleSuccess),
      mergeMap((action) => 
        this.quizService.navigateToCreateQuestion(action.data).pipe(
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

selectQuiz$ = createEffect(() =>
this.actions$.pipe(
  ofType(selectQuiz),
  mergeMap((action) =>
    this.quizService.getQuizDetails(action.data).pipe(
      map((data) => selectQuizSuccess ({ data })),
      catchError((error) => of(selectQuizFailure({ error })))
    )
  )
)
);

deleteQuiz$ = createEffect(() =>
this.actions$.pipe(
  ofType(deleteQuiz),
  mergeMap((action) =>
    this.quizService.deleteQuiz(action.data).pipe(
      map((data) => deleteQuizSuccess ({ data })),
      catchError((error) => of(deleteQuizFailure({ error })))
    )
  )
)
);

navigateOnDeleteQuiz$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteQuizSuccess),
      mergeMap(() => 
        this.quizService.navigateOnDeleteQuiz().pipe(
          map(() => navigateOnDeleteQuiz())
        )
      )
    )
  );

  constructor(private actions$: Actions, private quizService: QuizService) {}
}
