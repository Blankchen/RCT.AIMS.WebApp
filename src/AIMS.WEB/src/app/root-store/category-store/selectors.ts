import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoryState, selectAll } from './reducer';

export const categoryFeatureKey = 'category';

const categoryFeatureSelector = createFeatureSelector<CategoryState>(categoryFeatureKey);

const getAll = createSelector(
  categoryFeatureSelector,
  selectAll
);

export const categorySelectorTypes = {
  getAll,
};
