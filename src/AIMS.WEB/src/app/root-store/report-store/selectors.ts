import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReportState } from './reducer';

export const reportFeatureKey = 'report';

export const reportFeatureSelector = createFeatureSelector<ReportState>(reportFeatureKey);


const getAssetChart = createSelector(
  reportFeatureSelector,
  state => state.asset
);

const getMemberChart = createSelector(
  reportFeatureSelector,
  state => state.member
);

const getSummary = createSelector(
  reportFeatureSelector,
  state => state.summary
);


export const reportSelectorTypes = {
  getAssetChart,
  getMemberChart,
  getSummary,
};
