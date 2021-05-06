import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { DataService } from 'src/app/shared/service';
import { rootActionTypes } from '../actions';
import { RootState } from '../state';
import { assetActionTypes } from './actions';

@Injectable()
export class AssetEffects {
  getAssets$ = createEffect(() => this.actions$.pipe(
    ofType(assetActionTypes.getAll),
    switchMap(() => this.dataService.getall('/api/asset/getall')),
    map(data => assetActionTypes.getAllLoaded({ data })),
    catchError(() => EMPTY)
  ));

  getAsset$ = createEffect(() => this.actions$.pipe(
    ofType(assetActionTypes.getOne),
    switchMap(action => this.dataService.getbyid(action.rfid, '/api/asset/getbyrfid')),
    map(data => assetActionTypes.getOneLoaded({ data })),
    catchError(() => EMPTY)
  ));

  saveAsset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(assetActionTypes.save),
      switchMap(action => {
        const data = action.data;
        const formModel = new FormData();
        formModel.append('id', data.id.toString());
        formModel.append('assetName', data.assetname);
        formModel.append('authorId', data.authorId.toString());
        formModel.append('category', data.category.toString());
        formModel.append('description', null);
        formModel.append('rfidCode', data.rfidCode);
        if (data.coverimage instanceof File) {
          formModel.append('fileupload', data.coverimage);
        }
        return this.dataService.saveForm(formModel, '/api/asset/save');
      }),
      map(msg => rootActionTypes.message({ msg })),
      // save then get list again
      tap(_ => this.store$.dispatch(assetActionTypes.getAll())),
      catchError(() => EMPTY)
    )
  );

  removeAsset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(assetActionTypes.remove),
      switchMap(action => this.dataService.delete(action.id, '/api/asset/deletebyid')),
      map(msg => rootActionTypes.message({ msg })),
      // delete then get list again
      tap(_ => this.store$.dispatch(assetActionTypes.getAll())),
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
