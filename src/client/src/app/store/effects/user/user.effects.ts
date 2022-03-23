import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {createUser,createUserFailure,createUserSuccess } from '../../actions/user/user.actions';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class UserEffects {

  createUsers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(createUser),
    mergeMap((action) =>
    this.userService.createUser(action.data).pipe(
      map((data) => createUserSuccess({ data })),
      catchError((error) => of(createUserFailure({ error })))
      )
      )
      )
      );

 constructor(private actions$: Actions, private userService: UserService) {}

}
