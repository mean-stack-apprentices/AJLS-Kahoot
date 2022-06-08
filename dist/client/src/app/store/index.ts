import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromUser from './reducers/user/user.reducer';
import * as fromQuiz from './reducers/quiz/quiz.reducer';


export interface AppState {

  [fromUser.userFeatureKey]: fromUser.State;
  [fromQuiz.quizFeatureKey]: fromQuiz.State;
}

export const reducers: ActionReducerMap<AppState> = {

  [fromUser.userFeatureKey]: fromUser.reducer,
  [fromQuiz.quizFeatureKey]: fromQuiz.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
