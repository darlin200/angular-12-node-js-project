import { createFeatureSelector } from '@ngrx/store';

import * as auth from './auth.reducer';


export interface AppState {
  authState: auth.State;
}

export const reducers = {
  auth: auth.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');