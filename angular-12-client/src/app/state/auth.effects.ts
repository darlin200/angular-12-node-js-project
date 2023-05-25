import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { mergeMap, tap } from "rxjs/operators";
import * as UserActions from "./auth.actions";

@Injectable()
export class UserEffects {
  constructor(private action$: Actions) {}

  GetUser$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.loadUser),
      tap(u => console.log(u)),
      mergeMap(async (user) => UserActions.loadUserSuccess({ payload: user.payload }))
    )
  );
}