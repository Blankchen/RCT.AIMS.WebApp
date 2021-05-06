import { createAction, props } from '@ngrx/store';
import { AssetChart } from 'src/app/shared/interfaces/asset-chart';
import { MemberChart } from 'src/app/shared/interfaces/member-chart';
import { Summary } from 'src/app/shared/interfaces/summary';

const getAssetChart = createAction(
  '[Report] Get Asset Chart',
);

const getAssetChartLoaded = createAction(
  '[Report] Get Asset Chart Loaded',
  props<{ data: AssetChart[] }>()
);

const getMemberChart = createAction(
  '[Report] Get Member Chart',
);

const getMemberChartLoaded = createAction(
  '[Report] Get Member Chart Loaded',
  props<{ data: MemberChart[] }>()
);

const getAllSummary = createAction(
  '[Report] Get All Summary',
);

const getAllSummaryLoaded = createAction(
  '[Report] Get All Summary Loaded',
  props<{ data: Summary }>()
);

export const reportActionTypes = {
  getAssetChart,
  getAssetChartLoaded,
  getMemberChart,
  getMemberChartLoaded,
  getAllSummary,
  getAllSummaryLoaded,
};
