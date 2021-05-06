import { createAction } from '@ngrx/store';
import { circulationActionTypes } from './actions';
import { initialState, reducer } from './reducer';
import { Circulation } from 'src/app/shared/interfaces/circulation';

describe('Circulation-store reducer', () => {
  it('should return init state', () => {
    const action = createAction('noop');
    const newState = reducer(undefined, action);

    expect(newState).toEqual(initialState);
  });

  it('should return issue all', () => {
    const data = [] as Circulation[];
    const action = circulationActionTypes.getIssueAllLoaded({ data });
    const newState = reducer(initialState, action);
    const expected = { ...initialState, issue: action.data };
    expect(newState).toEqual(expected);
  });

  it('should return return all', () => {
    const data = [] as Circulation[];
    const action = circulationActionTypes.getReturnAllLoaded({ data });
    const newState = reducer(initialState, action);
    const expected = { ...initialState, issue: action.data };
    expect(newState).toEqual(expected);
  });

});
