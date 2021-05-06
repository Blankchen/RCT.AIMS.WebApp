import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/interfaces/user';

const getAll = createAction(
  '[User] Get Users',
);

const getAllLoaded = createAction(
  '[User] Get Users Loaded',
  props<{ data: User[] }>()
);

const getUserInfo = createAction(
  '[User] Get One User Info by Id',
  props<{ id: string }>()
);

const getOneByRfid = createAction(
  '[User] Get One User by Rfid',
  props<{ rfid: string }>()
);

const getOneByRfidLoaded = createAction(
  '[User] Get One User by Rfid Loaded',
  props<{ data: User }>()
);

const removeOneByRfid = createAction(
  '[User] Remove One User by Rfid',
);

const save = createAction(
  '[User] Save User',
  props<{ data: User }>()
);

const remove = createAction(
  '[User] Remove User',
  props<{ id: string }>()
);

export const userActionTypes = {
  getAll,
  getAllLoaded,
  getUserInfo,
  getOneByRfid,
  getOneByRfidLoaded,
  removeOneByRfid,
  save,
  remove,
};
