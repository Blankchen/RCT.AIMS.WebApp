import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './reducer';

export const rootFeatureKey = 'root';

const rootFeatureSelector = createFeatureSelector<State>(rootFeatureKey);

const message = createSelector(
  rootFeatureSelector,
  state => state.msg
);

export const rootSelectorTypes = {
  message,
};
