import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/catch';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure
} from './auth.actions';
import { AuthenticationService } from '../services/auth.service';
import { Observable, of } from 'rxjs';

@Injectable()

export class AuthEffects {
 
LogIn: Observable<any> = createEffect(() => {
  console.log('ja d log In effect')
  return this.actions$.pipe(
  ofType(AuthActionTypes.LOGIN),
  map((action: LogIn) => action.payload),
  switchMap((payload: any) => {
    return this.authService.login(payload.email, payload.password).pipe(
      map((user: any) => {
        console.log('auth effects chiki puki' , user);
        return new LogInSuccess({token: user.token, email: payload.email});
      }),
      catchError((error: any) => {
        console.log('auth effects error');
        console.log(error);
        return of(new LogInFailure({ error: error }));
      })
  )}))
});
  
      constructor(
        private actions$: Actions,
        private authService: AuthenticationService,
        private router: Router
      ) {}
}