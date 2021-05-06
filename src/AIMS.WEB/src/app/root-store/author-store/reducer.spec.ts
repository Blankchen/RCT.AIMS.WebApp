import { Author } from './../../shared/interfaces/author';
import { createAction } from '@ngrx/store';
import { authorActionTypes } from './actions';
import { adapter, initialState, reducer } from './reducer';

describe('Author-store reducer', () => {
  it('should return init state', () => {
    const action = createAction('noop');
    const newState = reducer(undefined, action);

    expect(newState).toEqual(initialState);
  });

  it('should return all', () => {
    const data = [] as Author[];
    const action = authorActionTypes.getAllLoaded({ data });
    const newState = reducer(initialState, action);
    const expected = adapter.setAll(action.data, { ...initialState });
    expect(newState).toEqual(expected);
  });

});
