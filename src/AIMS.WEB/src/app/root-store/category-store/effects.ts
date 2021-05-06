import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { DataService } from 'src/app/shared/service';
import { rootActionTypes } from '../actions';
import { RootState } from '../state';
import { categoryActionTypes } from './actions';

@Injectable()
export class CategoryEffects {
  getCategories$ = createEffect(() => this.actions$.pipe(
    ofType(categoryActionTypes.getAll),
    switchMap(() => this.dataService.getall('/api/category/getall')),
    map(data => categoryActionTypes.getAllLoaded({ data })),
    catchError(() => EMPTY)
  ));

  saveCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoryActionTypes.save),
      switchMap(action => {
        return this.dataService.save(action.data, '/api/category/save');
      }),
      map(msg => rootActionTypes.message({ msg })),
      // save then get list again
      tap(_ => this.store$.dispatch(categoryActionTypes.getAll())),
      catchError(() => EMPTY)
    )
  );

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoryActionTypes.remove),
      switchMap(action => this.dataService.delete(action.id, '/api/category/deletebyid')),
      map(msg => rootActionTypes.message({ msg })),
      // delete then get list again
      tap(_ => this.store$.dispatch(categoryActionTypes.getAll())),
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
