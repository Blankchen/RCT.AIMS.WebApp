import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/shared/interfaces/category';
import { categoryActionTypes } from './actions';

export interface CategoryState extends EntityState<Category> {
}

export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>();

export const initialState = adapter.getInitialState({
});

const myReducer = createReducer(
  initialState,
  on(categoryActionTypes.getAllLoaded, (state, action) => {
    return adapter.setAll(
      action.data,
      { ...state }
    );
  }),
);

export const { selectAll, selectIds } = adapter.getSelectors();

export function reducer(state: any, action: Action) {
  return myReducer(state, action);
}
