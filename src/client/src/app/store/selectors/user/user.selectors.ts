import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../..';
import * as fromUser from '../../reducers/user/user.reducer';

const userFeatureSelector = createFeatureSelector<AppState, fromUser.State>(fromUser.userFeatureKey);

export const signUpFailureSelector = createSelector(
    userFeatureSelector,
    (state) => state.signUpFailure
);

export const signUpSuccessSelector = createSelector(
    userFeatureSelector,
    (state) => state.signUpSuccess
);

 export const loginFailureSelector = createSelector(
   userFeatureSelector,
   (state) => state.loginFailureMsg
 );

 export const loggedUserSelector = createSelector(
   userFeatureSelector,
   (state)=>state.loginUser
 )
