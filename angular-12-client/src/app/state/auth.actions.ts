import { createAction, props } from "@ngrx/store";
import { User } from "./user.model";
import { Action } from '@ngrx/store';
// import { User } from ";

// export const loadUser = createAction(
//   "[Some Component] Load Data",
//   props<{ payload: User }>()
// );
export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failure',
  LOGOUT = '[Auth] Logout',
  GET_STATUS = '[Auth] GetStatus'
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) {
    console.log('намагання');
  }
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {
    console.log('намагання успішне'); 
  }
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export const addCustomer = createAction(
  "[Customer] Add Customer",
  (customer: User) => ({ customer })
);

export type All =
  | LogIn
  | LogInSuccess
  | LogInFailure;