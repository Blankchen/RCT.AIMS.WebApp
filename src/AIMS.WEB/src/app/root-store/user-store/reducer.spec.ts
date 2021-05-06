import { User } from './../../shared/interfaces/user';
import { createAction } from '@ngrx/store';
import { userActionTypes } from './actions';
import { adapter, initialState, reducer } from './reducer';

describe('User-store reducer', () => {
  it('should return init state', () => {
    const action = createAction('noop');
    const newState = reducer(undefined, action);

    expect(newState).toEqual(initialState);
  });

  it('should return all', () => {
    const data = [] as User[];
    const action = userActionTypes.getAllLoaded({ data });
    const newState = reducer(initialState, action);
    const expected = adapter.setAll(
      action.data,
      { ...initialState}
    );
    expect(newState).toEqual(expected);
  });

  it('should return one', () => {
    const data = {} as User;
    const action = userActionTypes.getOneByRfidLoaded({ data });
    const newState = reducer(initialState, action);
    const expected = { ...initialState, rfidUser: action.data };
    expect(newState).toEqual(expected);
  });

  it('should remove one', () => {
    const action = userActionTypes.removeOneByRfid();
    const newState = reducer(initialState, action);
    expect(newState.rfidUser).toBeNull();
  });

});
