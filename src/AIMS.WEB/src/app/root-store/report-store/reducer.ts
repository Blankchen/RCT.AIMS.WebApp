import { Action, createReducer, on } from '@ngrx/store';
import { AssetChart } from 'src/app/shared/interfaces/asset-chart';
import { MemberChart } from 'src/app/shared/interfaces/member-chart';
import { Summary } from 'src/app/shared/interfaces/summary';
import { reportActionTypes } from './actions';

export interface ReportState {
  asset: AssetChart[];
  member: MemberChart[];
  summary: Summary;
}

export const initialState = {
  asset: [],
  member: [],
  summary: null,
};

const myReducer = createReducer(
  initialState,
  on(reportActionTypes.getAssetChartLoaded, (state, action) => {
    return { ...state, asset: action.data };
  }),
  on(reportActionTypes.getMemberChartLoaded, (state, action) => {
    return { ...state, member: action.data };
  }),
  on(reportActionTypes.getAllSummaryLoaded, (state, action) => {
    return { ...state, summary: action.data };
  }),
);

export function reducer(state: any, action: Action) {
  return myReducer(state, action);
}
