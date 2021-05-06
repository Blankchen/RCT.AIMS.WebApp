import { Action, createReducer, on } from '@ngrx/store';
import { Circulation } from 'src/app/shared/interfaces/circulation';
import { circulationActionTypes } from './actions';

export interface CirculationState {
  issue: Circulation[];
  return: Circulation[];
}

export const initialState: CirculationState = {
  issue: [],
  return: [],
};

const myReducer = createReducer(
  initialState,
  on(circulationActionTypes.getIssueAllLoaded, (state, action) => {
    return { ...state, issue: action.data };
  }),
  on(circulationActionTypes.getReturnAllLoaded, (state, action) => {
    return { ...state, return: action.data };
  }),
);

export function reducer(state: any, action: Action) {
  return myReducer(state, action);
}
