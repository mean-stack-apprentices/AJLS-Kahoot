import { createAction, props } from "@ngrx/store";
import { Question } from "../../../../../../shared/models/question.model";
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

  export const createQuizQuestion = createAction(
    '[Quiz] Create Quiz Question',
    props<{  data: Question, QuizId:String | null  }>()
  );

  export const createQuizQuestionSuccess = createAction(
    '[Quiz] Create Quiz Question Success',
    props<{  data:Quiz }>()
  );

  export const createQuizQuestionFailure = createAction(
    '[Quiz] Create Quiz Question Failure',
    props<{  error: Error }>()
  );

  export const deleteQuiz = createAction(
    '[Quiz] Delete Quiz',
    props<{ data: Quiz }>()
  );

  export const deleteQuizSuccess = createAction(
    '[Quiz] Delete Quiz Success',
    props<{ data: Quiz }>()
  );

  export const deleteQuizFailure = createAction(
    '[Quiz] Delete Quiz Failure',
    props<{  error: Error }>()
  );
  
  export const navigateOnDeleteQuiz = createAction(
    '[Quiz] Navigate On Delete Quiz',
   );
  