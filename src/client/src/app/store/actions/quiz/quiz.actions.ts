import { createAction, props } from "@ngrx/store";
import type {Quiz} from "../../../../../../shared/models/quiz.model";

export const createQuizTitle = createAction(
    '[Quiz] Create Quiz Title',
    props<{data: Quiz}>()
  );

  export const createQuizTitleSuccess = createAction(
    '[Quiz] Create Quiz Title Success',
    props<{ data: Quiz }>()
  );

  export const createQuizTitleFailure = createAction(
    '[Quiz] Create Quiz Title Failure',
    props<{  error: Error }>()
  );

  export const navigateToCreateQuestion = createAction(
    '[Quiz] Navigate To Create Question'
  );

  export const loadQuizzes = createAction(
    '[Quiz] Load Quiz Title',

  );

  export const loadQuizzesSuccess = createAction(
    '[Quiz] Load Quiz Title Success',
    props<{ data: Quiz[] }>()
  );

  export const loadQuizzesFailure = createAction(
    '[Quiz] Load Quiz Title Failure',
    props<{  error: Error }>()
  );

  export const selectQuiz = createAction(
    '[Quiz] Select Quiz',
    props<{ data: Quiz }>()
  );

  export const selectQuizSuccess = createAction(
    '[Quiz] Select Quiz Success',
    props<{ data: Quiz }>()
  );

  export const selectQuizFailure = createAction(
    '[Quiz] Select Quiz Failure',
    props<{  error: Error }>()
  );

  