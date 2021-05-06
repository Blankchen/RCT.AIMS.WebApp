import { Action, createReducer, on } from '@ngrx/store';
import { rootActionTypes } from './actions';

export interface State {
  msg?: string;
}

export const initialState: State = {
  msg: '',
};

const myReducer = createReducer(
  initialState,
  on(rootActionTypes.message, (state, action) => {
    return { ...state, msg: action.msg };
  }),
  on(rootActionTypes.messageReset, (state, action) => {
    return { ...state, msg: '' };
  }),
);

export function reducer(state: any, action: Action) {
  return myReducer(state, action);
}
