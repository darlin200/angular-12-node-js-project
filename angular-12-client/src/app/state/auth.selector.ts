import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromUser from "./auth.reducer";

export const selectUserState = createFeatureSelector<fromUser.UserState>(
  "user"
);

export const selectUser = createSelector(
  selectUserState,
  state => state.user
);