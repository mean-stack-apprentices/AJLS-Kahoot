import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {createUser,createUserFailure,createUserSuccess, loginUser, loginUserFailure, loginUserSuccess, logoutUser, logoutUserFailure, logoutUserSuccess, navigateOnLoginSuccess, navigateOnLogout } from '../../actions/user/user.actions';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';


@Injectable()
export class UserEffects {

  createUsers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(createUser),
    mergeMap((action) =>
      this.userService.createUser(action.data)
      .pipe(
        map((data) => createUserSuccess({ data })),
        catchError((error) => of(createUserFailure(error)))
      )
    )
  ));

  loginUsers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loginUser),
    mergeMap((action) =>
      this.authService.login(action.data).pipe(
        map((data) => loginUserSuccess( data )),
        catchError((error) => of(loginUserFailure({ error })))
      )
    )
  ));

  navigateOnLogin$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loginUserSuccess),
    mergeMap((action) =>
    this.authService.navigateOnLogin().pipe(
      map(() => navigateOnLoginSuccess())
    ))
  )
  );

  navigateOnLogout$ = createEffect(() =>
  this.actions$.pipe(
    ofType(logoutUserSuccess),
    mergeMap(() =>
    this.authService.navigateOnLogout().pipe(
      map(() => navigateOnLogout())
    ))
  )
  );

  logoutUser$ = createEffect( () =>
  this.actions$.pipe(
    ofType(logoutUser),
    mergeMap(() =>
    this.authService.logout().pipe(
      map(data => logoutUserSuccess()),
      catchError(err => of(logoutUserFailure(err))))
    ))
  );

  constructor(
   private actions$: Actions,
   private userService: UserService,private authService: AuthService
  ) {}

}
