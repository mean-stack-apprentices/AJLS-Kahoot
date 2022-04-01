import { Action, createReducer, on } from '@ngrx/store';
import { Quiz } from '../../../../../../shared/models/quiz.model';
import {
  createQuizFailure,
  createQuizSuccess,
} from '../../actions/quiz/quiz.actions';

export const quizFeatureKey = 'quiz';

export interface State {
  quizs: Quiz[];
  // createQuizSuccessMessage: string | null;
  // createQuizFailMessage: string | null;
}

export const initialState: State = {
  quizs: [],
  // createQuizSuccessMessage: null,
  // createQuizFailMessage: null,
};

export const reducer = createReducer(
  initialState,

  on(createQuizSuccess, (state, action) => {
    const quizs = [...state.quizs];
    quizs.push(action.data);
    return {
      ...state,
      quizs,
    };
  }),

  on(createQuizFailure, (state, action) => {
    return {
      ...state
      // createQuizSuccessMessage: null,
      // createQuizFailMessage: action.error.message,
    };
  })
);
