import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthorState, selectAll, selectIds } from './reducer';

export const authorFeatureKey = 'author';

const authorFeatureSelector = createFeatureSelector<AuthorState>(authorFeatureKey);

const getAll = createSelector(
  authorFeatureSelector,
  selectAll
);

export const authorSelectorTypes = {
  getAll,
};
