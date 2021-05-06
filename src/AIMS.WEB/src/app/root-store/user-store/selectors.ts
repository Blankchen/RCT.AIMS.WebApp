import { createFeatureSelector, createSelector, props } from '@ngrx/store';
import { UserState, selectAll, selectIds } from './reducer';

export const userFeatureKey = 'user';

const userFeatureSelector = createFeatureSelector<UserState>(userFeatureKey);

const getAll = createSelector(
  userFeatureSelector,
  selectAll
);

const getOneRfid = createSelector(
  userFeatureSelector,
  state => state.rfidUser
);

export const userSelectorTypes = {
  getAll,
  getOneRfid,
};
