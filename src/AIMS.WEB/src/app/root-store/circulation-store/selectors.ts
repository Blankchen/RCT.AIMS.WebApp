import { createFeatureSelector, createSelector, props } from '@ngrx/store';
import { CirculationState } from './reducer';

export const circulationFeatureKey = 'circulation';

const circulationFeatureSelector = createFeatureSelector<CirculationState>(circulationFeatureKey);

const getIssueAll = createSelector(
  circulationFeatureSelector,
  state => state.issue
);

const getReturnAll = createSelector(
  circulationFeatureSelector,
  state => state.return
);

export const circulationSelectorTypes = {
  getIssueAll,
  getReturnAll,
};
