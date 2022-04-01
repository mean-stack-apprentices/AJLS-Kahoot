import { createAction, props } from "@ngrx/store";
import type {Quiz} from "../../../../../../shared/models/quiz.model";

export const createQuiz = createAction(
    '[Quiz] Create Quiz',
    props<{data: Quiz}>()
  );
  
  export const createQuizSuccess = createAction(
    '[Quiz] Create Quiz Success',
    props<{ data: Quiz }>()
  ); 

  export const createQuizFailure = createAction(
    '[Quiz] Create Quiz Failure',
    props<{  error: Error }>()
  );  