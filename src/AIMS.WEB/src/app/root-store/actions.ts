import { createAction, props } from '@ngrx/store';

const message = createAction(
  '[Root] Root Message',
  props<{ msg: string }>()
);

const messageReset = createAction(
  '[Root] Root Message Reset',
);

export const rootActionTypes = {
  message,
  messageReset,
};
