import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/shared/interfaces/user';
import { userActionTypes } from './actions';

export interface UserState extends EntityState<User> {
  rfidUser: User;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState = adapter.getInitialState({
  rfidUser: null,
});

const myReducer = createReducer(
  initialState,
  on(userActionTypes.getAllLoaded, (state, action) => {
    return adapter.setAll(
      action.data,
      { ...state}
    );
  }),
  on(userActionTypes.getOneByRfidLoaded, (state, action) => {
    return { ...state, rfidUser: action.data };
  }),
  on(userActionTypes.removeOneByRfid, (state, action) => {
    return { ...state, rfidUser: null };
  }),
);

export const { selectAll, selectIds } = adapter.getSelectors();

export function reducer(state: any, action: Action) {
  return myReducer(state, action);
}
