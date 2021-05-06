import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Asset } from 'src/app/shared/interfaces/asset';
import { assetActionTypes } from './actions';

export interface AssetState extends EntityState<Asset> {
  asset: Asset;
}

export const adapter: EntityAdapter<Asset> = createEntityAdapter<Asset>();

export const initialState = adapter.getInitialState({
  asset: null,
});

const myReducer = createReducer(
  initialState,
  on(assetActionTypes.getAllLoaded, (state, action) => {
    return adapter.setAll(
      action.data,
      { ...state }
    );
  }),
  on(assetActionTypes.getOneLoaded, (state, action) => {
    return { ...state, asset: action.data };
  }),
  on(assetActionTypes.removeOne, (state, action) => {
    return { ...state, asset: null };
  }),
);

export const { selectAll, selectIds } = adapter.getSelectors();

export function reducer(state: any, action: Action) {
  return myReducer(state, action);
}
