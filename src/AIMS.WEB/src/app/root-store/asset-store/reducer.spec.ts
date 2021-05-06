import { Asset } from './../../shared/interfaces/asset';
import { createAction } from '@ngrx/store';
import { assetActionTypes } from './actions';
import { adapter, initialState, reducer } from './reducer';
import { state } from '@angular/animations';

describe('Asset-store reducer', () => {
  it('should return init state', () => {
    const action = createAction('noop');
    const newState = reducer(undefined, action);

    expect(newState).toEqual(initialState);
  });

  it('should return all', () => {
    const data = [] as Asset[];
    const action = assetActionTypes.getAllLoaded({ data });
    const newState = reducer(initialState, action);
    const expected = adapter.setAll(action.data, { ...initialState });
    expect(newState).toEqual(expected);
  });

  it('should return one', () => {
    const data = {} as Asset;
    const action = assetActionTypes.getOneLoaded({ data });
    const newState = reducer(initialState, action);
    expect(newState.asset).toEqual(data);
  });

  it('should remove one', () => {
    const action = assetActionTypes.removeOne();
    const newState = reducer(initialState, action);
    const expected = { ...state };
    expect(newState.asset).toBeNull();
  });

});
