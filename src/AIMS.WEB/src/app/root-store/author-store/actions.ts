import { createAction, props } from '@ngrx/store';
import { Author } from 'src/app/shared/interfaces/author';

const getAll = createAction(
  '[Author] Get Authors',
);

const getAllLoaded = createAction(
  '[Author] Get Authors Loaded',
  props<{ data: Author[] }>()
);

const save = createAction(
  '[Author] Save Author',
  props<{ data: Author }>()
);

const remove = createAction(
  '[Author] Remove Author',
  props<{ id: string }>()
);

export const authorActionTypes = {
  getAll,
  getAllLoaded,
  save,
  remove,
};
