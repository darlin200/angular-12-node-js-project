import { Action, createReducer, on } from "@ngrx/store";
import * as UserActions from "./auth.actions";
import { All } from './auth.actions';
import { User } from "./user.model";

export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

export function reducer(state = initialState, action: All): State {
  console.log('pochatok reducera')
  switch (action.type) {
    case UserActions.AuthActionTypes.LOGIN_SUCCESS: {
      console.log('пробуєм в логін ');
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email
        },
        errorMessage: null
      };
    }
    case UserActions.AuthActionTypes.LOGIN_FAILURE: {
      console.log('пробуєм зафейлитись');
      return {
        ...state,
        errorMessage: 'Incorrect email and/or password.'
      };
    }
    // case UserActions.AuthActionTypes.SIGNUP_SUCCESS: {
    //   return {
    //     ...state,
    //     isAuthenticated: true,
    //     user: {
    //       token: action.payload.token,
    //       email: action.payload.email
    //     },
    //     errorMessage: null
    //   };
    // }
    // case UserActions.AuthActionTypes.SIGNUP_FAILURE: {
    //   return {
    //     ...state,
    //     errorMessage: 'That email is already in use.'
    //   };
    // }
    // case UserActions.AuthActionTypes.LOGOUT: {
    //   return initialState;
    // }
    default: {
      console.log('default');
      return state;
    }
  }
}