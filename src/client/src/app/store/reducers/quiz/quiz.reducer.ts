import { Action, createReducer, on } from '@ngrx/store';
import { Quiz } from '../../../../../../shared/models/quiz.model';
import {
  createQuizTitleFailure,
  createQuizTitleSuccess,
  loadQuizDetailsSuccess,
  loadQuizzesSuccess,
  selectQuizAction,
} from '../../actions/quiz/quiz.actions';

export const quizFeatureKey = 'quiz';

export interface State {
  quizs: Quiz[];
  selectedQuiz: Quiz | null;
  // createQuizTitleSuccessMessage: string | null;
  // createQuizTitleFailMessage: string | null;
}

export const initialState: State = {
  quizs: [],
  selectedQuiz: null,
  // createQuizTitleSuccessMessage: null,
  // createQuizTitleFailMessage: null,
};

export const reducer = createReducer(
  initialState,

  on(createQuizTitleSuccess, (state, action) => {
    const quizs = [...state.quizs];
    quizs.push(action.data);
    return {
      ...state,
      quizs,
    };
  }),

  on(createQuizTitleFailure, (state, action) => {
    return {
      ...state
      // createQuizSuccessMessage: null,
      // createQuizFailMessage: action.error.message,
    };
  }),
  
  on(loadQuizzesSuccess,(state,action)=>{
    return {...state, quizs:action.data}
  }),

  on(selectQuizAction, (state, action) => {
    return { ...state, selectedQuiz: action.data }
  }),

  on(loadQuizDetailsSuccess,(state,action)=>{
    return {...state, quizs:action.data}
  })
);
