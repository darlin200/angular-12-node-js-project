import { Action, createReducer, on } from "@ngrx/store";
import * as UserActions from "./auth.actions";
import { User } from "./user.model";

export interface UserState {
  user: User;
}

export const initialState: UserState = {
  user: {}
};

const reducer = createReducer(
  initialState,
  on(UserActions.loadUser, (state: UserState, { payload }) => {
    console.log(payload);
    return { ...state, user: payload };
  }),
  on(UserActions.loadUserSuccess, (state: UserState, { payload }) => {
    return { ...state, user: payload };
  }),
  on(UserActions.loadUserError, (state: UserState, error: Error) => {
    console.log(error);
    return { ...state, error: error };
  })
);

export function UserReducer(state: UserState | undefined, action: Action) {
  return reducer(state, action);
}