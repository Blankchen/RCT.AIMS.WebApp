import { createAction } from '@ngrx/store';
import { categoryActionTypes } from './actions';
import { adapter, initialState, reducer } from './reducer';
import { Category } from 'src/app/shared/interfaces/category';

describe('Category-store reducer', () => {
  it('should return init state', () => {
    const action = createAction('noop');
    const newState = reducer(undefined, action);

    expect(newState).toEqual(initialState);
  });

  it('should return all', () => {
    const data = [] as Category[];
    const action = categoryActionTypes.getAllLoaded({ data });
    const newState = reducer(initialState, action);
    const expected = adapter.setAll(action.data, { ...initialState });
    expect(newState).toEqual(expected);
  });

});
