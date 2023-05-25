import { createAction, props } from "@ngrx/store";
import { User } from "./user.model";
// import { User } from ";

export const loadUser = createAction(
  "[Some Component] Load Data",
  props<{ payload: User }>()
);

export const loadUserSuccess = createAction(
  "[Some Component] Load Data Success",
  props<{ payload: User }>()
);

export const loadUserError = createAction(
  "[Some Component] Load Data Error",
  props<Error>()
);

export const addCustomer = createAction(
  "[Customer] Add Customer",
  (customer: User) => ({ customer })
);