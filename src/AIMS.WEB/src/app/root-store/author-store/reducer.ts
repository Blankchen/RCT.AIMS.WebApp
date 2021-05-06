import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Author } from 'src/app/shared/interfaces/author';
import { authorActionTypes } from './actions';

export interface AuthorState extends EntityState<Author> {
}

export const adapter: EntityAdapter<Author> = createEntityAdapter<Author>();

export const initialState = adapter.getInitialState({
});

const myReducer = createReducer(
  initialState,
  on(authorActionTypes.getAllLoaded, (state, action) => {
    return adapter.setAll(
      action.data,
      { ...state}
    );
  }),
);

export const { selectAll, selectIds } = adapter.getSelectors();

export function reducer(state: any, action: Action) {
  return myReducer(state, action);
}
