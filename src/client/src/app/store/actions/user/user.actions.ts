import { createAction, props } from '@ngrx/store';
import { Error } from 'mongoose';
import { User } from '../../../../../../shared/models/user.model';


export const createUser = createAction(
  '[User] Create User',
  props<{data: User}>()
);

export const createUserSuccess = createAction(
  '[User] Create User Success',
  props<{ data: User }>()
);

export const createUserFailure = createAction(
  '[User] Create User Failure',
  props<{ error: Error }>()
);
export const loginUser = createAction(
  '[User] Login User',
  props<{data: Partial<User>}>()
);

export const loginUserSuccess = createAction(
  '[User] Login User Success',
  props<{ data: User }>()
);

export const loginUserFailure = createAction(
  '[User] Login User Failure',
  props<{ error: Error }>()
);
