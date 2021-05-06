import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { DataService } from 'src/app/shared/service';
import { RootState } from '../state';
import { reportActionTypes } from './actions';

@Injectable()
export class ReportEffects {
  getAssetChart$ = createEffect(() => this.actions$.pipe(
    ofType(reportActionTypes.getAssetChart),
    switchMap(() => this.dataService.getall('/api/report/getassetchart')),
    map(data => reportActionTypes.getAssetChartLoaded({ data })),
    catchError(() => EMPTY)
  ));

  getMemberChart$ = createEffect(() => this.actions$.pipe(
    ofType(reportActionTypes.getMemberChart),
    switchMap(() => this.dataService.getall('/api/report/getmemberchart')),
    map(data => reportActionTypes.getMemberChartLoaded({ data })),
    catchError(() => EMPTY)
  ));


  getAllSummary$ = createEffect(() => this.actions$.pipe(
    ofType(reportActionTypes.getAllSummary),
    switchMap(() => this.dataService.getall('/api/dashboard/getallsummary')),
    map(data => reportActionTypes.getAllSummaryLoaded({ data })),
    catchError(() => EMPTY)
  ));

  constructor(
    private actions$: Actions,
    private dataService: DataService,
  ) {

  }



}
