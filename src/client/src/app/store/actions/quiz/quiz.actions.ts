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