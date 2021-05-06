import { createAction, props } from '@ngrx/store';
import { Asset } from 'src/app/shared/interfaces/asset';
import { AssetForm } from 'src/app/shared/interfaces/asset-form';

const getAll = createAction(
  '[Asset] Get Assets',
);

const getAllLoaded = createAction(
  '[Asset] Get Assets Loaded',
  props<{ data: Asset[] }>()
);

const getOne = createAction(
  '[Asset] Get One Assets',
  props<{ rfid: string }>()
);

const getOneLoaded = createAction(
  '[Asset] Get One Assets Loaded',
  props<{ data: Asset }>()
);

const removeOne = createAction(
  '[Asset] Remove One Assets',
);

const save = createAction(
  '[Asset] Save Asset',
  props<{ data: AssetForm }>()
);

const remove = createAction(
  '[Asset] Remove Asset',
  props<{ id: string }>()
);

export const assetActionTypes = {
  getAll,
  getAllLoaded,
  getOne,
  getOneLoaded,
  removeOne,
  save,
  remove,
};
