import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { DataService } from 'src/app/shared/service';
import { rootActionTypes } from '../actions';
import { RootState } from '../state';
import { authorActionTypes } from './actions';

@Injectable()
export class AuthorEffects {
  getAuthors$ = createEffect(() => this.actions$.pipe(
    ofType(authorActionTypes.getAll),
    switchMap(() => this.dataService.getall('/api/author/getall')),
    map(data => authorActionTypes.getAllLoaded({ data })),
    catchError(() => EMPTY)
  ));

  saveAuthor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authorActionTypes.save),
      switchMap(action => {
        return this.dataService.save(action.data, '/api/author/save');
      }),
      map(msg => rootActionTypes.message({ msg })),
      // save then get list again
      tap(_ => this.store$.dispatch(authorActionTypes.getAll())),
      catchError(() => EMPTY)
    )
  );

  deleteAuthor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authorActionTypes.remove),
      switchMap(action => this.dataService.delete(action.id, '/api/author/deletebyid')),
      map(msg => rootActionTypes.message({ msg })),
      // delete then get list again
      tap(_ => this.store$.dispatch(authorActionTypes.getAll())),
      catchError(() => EMPTY)
    )
  );

  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store$: Store<RootState>,
  ) {

  }



}
