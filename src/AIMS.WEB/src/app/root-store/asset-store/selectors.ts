import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AssetState, selectAll, selectIds } from './reducer';

export const assetFeatureKey = 'asset';

const assetFeatureSelector = createFeatureSelector<AssetState>(assetFeatureKey);

const getAll = createSelector(
  assetFeatureSelector,
  selectAll
);

const getOne = createSelector(
  assetFeatureSelector,
  state => state.asset
);

export const assetSelectorTypes = {
  getAll,
  getOne,
};
