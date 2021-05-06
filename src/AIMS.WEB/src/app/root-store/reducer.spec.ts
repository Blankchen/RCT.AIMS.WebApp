import { createAction } from '@ngrx/store';
import { rootActionTypes } from './actions';
import { initialState, reducer } from './reducer';

describe('Root-store reducer', () => {
  it('should return init state', () => {
    const action = createAction('noop');
    const newState = reducer(undefined, action);

    expect(newState).toEqual(initialState);
  });

  it('should return message', () => {
    const msg = 'message';
    const action = rootActionTypes.message({msg});
    const newState = reducer(initialState, action);

    expect(newState.msg).toEqual(msg);
  });

  it('should reset message', () => {
    const action = rootActionTypes.messageReset();
    const newState = reducer(initialState, action);

    expect(newState.msg).toEqual('');
  });
});
