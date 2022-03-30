import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../../../../../shared/models/user.model';
import {
  createUserFailure,
  createUserSuccess,
  loginUserFailure,
  loginUserSuccess,
} from '../../actions/user/user.actions';

export const userFeatureKey = 'user';

export interface State {
  users: User[];
  signUpFailure: String | null;
  signUpSuccess: String | null;
  loginFailureMsg: string;
  loginUser: User | null;
}

export const initialState: State = {
  users: [],
  signUpFailure: null,
  signUpSuccess: null,
  loginFailureMsg: '',
  loginUser: null,
};

export const reducer = createReducer(
  initialState,

  on(createUserSuccess, (state, action) => {
    const users = [...state.users];
    users.push(action.data);
    return {
      ...state,
      users,
      signUpFailure: null,
      signUpSuccess: 'Account created successfully',
    };
  }),
  on(createUserFailure, (state, action) => {
    return {
      ...state,
      signUpSuccess: null,
      signUpFailure: action.error.message,
    };
  }),

  on(loginUserSuccess, (state, action) => {
    if (action.data) {
      localStorage.setItem('Token', JSON.stringify(action.data));
    }
    return { ...state, loginUser: action.data };
  }),

  on(loginUserFailure, (state, action) => {
    return { ...state, loginFailureMsg: 'Invalid username or password' };
  })
);
