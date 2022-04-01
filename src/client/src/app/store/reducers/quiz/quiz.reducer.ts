import { Action, createReducer, on } from '@ngrx/store';
import { Quiz } from '../../../../../../shared/models/quiz.model';
import {
  createQuizTitleFailure,
  createQuizTitleSuccess,
} from '../../actions/quiz/quiz.actions';

export const quizFeatureKey = 'quiz';

export interface State {
  quizs: Quiz[];
  // createQuizTitleSuccessMessage: string | null;
  // createQuizTitleFailMessage: string | null;
}

export const initialState: State = {
  quizs: [],
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
  })
);
