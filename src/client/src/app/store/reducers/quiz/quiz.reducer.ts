import { createReducer, on } from '@ngrx/store';
import { Quiz } from '../../../../../../shared/models/quiz.model';
import {
  createQuizTitleFailure,
  createQuizTitleSuccess,
  selectQuizSuccess,
  loadQuizzesSuccess,
  deleteQuizSuccess,
  } from '../../actions/quiz/quiz.actions';

export const quizFeatureKey = 'quiz';

export interface State {
  quizs: Quiz[];
  selectedQuiz: Quiz | null;
  quiz: Quiz | null;
  }

export const initialState: State = {
  quizs: [],
  selectedQuiz: null,
  quiz: null,
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
         };
  }),
  
  on(loadQuizzesSuccess,(state,action)=>{
    return {...state, quizs:action.data}
  }),

  on(selectQuizSuccess,(state,action)=>{
    return {...state, selectedQuiz:action.data}
  }),

  on(deleteQuizSuccess, (state, action) => {
    return {...state, quiz: action.data}
  }),
);
