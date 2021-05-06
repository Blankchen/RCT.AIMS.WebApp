import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd';
import { EMPTY } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { DataService } from 'src/app/shared/service';
import { rootActionTypes } from '../actions';
import { RootState } from '../state';
import { circulationActionTypes } from './actions';

@Injectable()
export class CirculationEffects {
  getIssueAll$ = createEffect(() => this.actions$.pipe(
    ofType(circulationActionTypes.getIssueAll),
    switchMap(() => this.dataService.getall('/api/circulation/getissueall')),
    map(data => circulationActionTypes.getIssueAllLoaded({ data })),
    catchError(() => EMPTY)
  ));

  getIssueInfo$ = createEffect(() => this.actions$.pipe(
    ofType(circulationActionTypes.getIssueInfo),
    switchMap(action => this.dataService.getbyid(action.rfid, '/api/circulation/getissuebyrfid')),
    tap(data => {
      const assets = data.reduce((prev, value) => {
        prev.push(...value.assets);
        return prev;
      }, []);
      const content = assets.reduce((prev, value, index) => {
        prev += `${index + 1}.${value.assetname} `;
        return prev;
      }, '');
      this.notification.blank(
        `Assets`,
        content
      );
    }),
    catchError(() => EMPTY)
  ), { dispatch: false });

  getReturnAll$ = createEffect(() => this.actions$.pipe(
    ofType(circulationActionTypes.getReturnAll),
    switchMap(() => this.dataService.getall('/api/circulation/getreturnall')),
    map(data => circulationActionTypes.getReturnAllLoaded({ data })),
    catchError(() => EMPTY)
  ));

  issueAsset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(circulationActionTypes.issueAsset),
      switchMap(action => {
        return this.dataService.save(action.data, '/api/circulation/issueasset');
      }),
      map(msg => rootActionTypes.message({ msg })),
      catchError(() => EMPTY)
    )
  );

  returnAsset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(circulationActionTypes.returnAsset),
      switchMap(action => {
        return this.dataService.save(action.data, '/api/circulation/returnasset');
      }),
      map(msg => rootActionTypes.message({ msg })),
      catchError(() => EMPTY)
    )
  );

  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private notification: NzNotificationService
  ) {

  }



}
