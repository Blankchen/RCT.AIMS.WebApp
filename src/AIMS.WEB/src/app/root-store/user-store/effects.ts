import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd';
import { EMPTY } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { User } from 'src/app/shared/interfaces/user';
import { DataService } from 'src/app/shared/service';
import { rootActionTypes } from '../actions';
import { RootState } from '../state';
import { userActionTypes } from './actions';

@Injectable()
export class UserEffects {
  getUsers$ = createEffect(() => this.actions$.pipe(
    ofType(userActionTypes.getAll),
    switchMap(() => this.dataService.getall('/api/users/getall')),
    map(data => userActionTypes.getAllLoaded({ data })),
    catchError(() => EMPTY)
  ));

  getUserInfo$ = createEffect(() => this.actions$.pipe(
    ofType(userActionTypes.getUserInfo),
    switchMap(action => this.dataService.getbyid(action.id, '/api/users/getbyid')),
    tap((user: User) => {
      this.notification.blank(
        `User Name: ${user.firstname} ${user.lastname}`,
        `Email: ${user.email}`
      );
    }),
    catchError(() => EMPTY)
  ), { dispatch: false });

  getUserByRfid$ = createEffect(() => this.actions$.pipe(
    ofType(userActionTypes.getOneByRfid),
    switchMap(action => this.dataService.getbyid(action.rfid, '/api/users/getbyrfid')),
    map(data => userActionTypes.getOneByRfidLoaded({ data })),
    catchError(() => EMPTY)
  ));

  saveUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActionTypes.save),
      switchMap(action => {
        return this.dataService.save(action.data, '/api/users/save');
      }),
      map(msg => rootActionTypes.message({ msg })),
      // save then get list again
      tap(_ => this.store$.dispatch(userActionTypes.getAll())),
      catchError(() => EMPTY)
    )
  );

  removeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActionTypes.remove),
      switchMap(action => this.dataService.delete(action.id, '/api/users/deletebyid')),
      map(msg => rootActionTypes.message({ msg })),
      // delete then get list again
      tap(_ => this.store$.dispatch(userActionTypes.getAll())),
      catchError(() => EMPTY)
    )
  );

  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store$: Store<RootState>,
    private notification: NzNotificationService
  ) {

  }



}
