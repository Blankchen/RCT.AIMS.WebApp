import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/shared/interfaces/category';

const getAll = createAction(
  '[Category] Get Categories',
);

const getAllLoaded = createAction(
  '[Category] Get Categories Loaded',
  props<{ data: Category[] }>()
);

const save = createAction(
  '[Category] Save Category',
  props<{ data: Category }>()
);

const remove = createAction(
  '[Category] Remove Category',
  props<{ id: string }>()
);

export const categoryActionTypes = {
  getAll,
  getAllLoaded,
  save,
  remove,
};
