import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../..';
import * as fromQuiz from '../../reducers/quiz/quiz.reducer';

const quizFeatureSelector = createFeatureSelector<AppState, fromQuiz.State>(fromQuiz.quizFeatureKey);

export const quizzesSelector = createSelector(
  quizFeatureSelector,
  (state)=> state.quizs
)

export const selectedQuizSelector = createSelector(
  quizFeatureSelector,
  (state) => state.selectedQuiz
);
