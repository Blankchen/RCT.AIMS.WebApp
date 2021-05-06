import { createAction, props } from '@ngrx/store';
import { Circulation } from 'src/app/shared/interfaces/circulation';

const getIssueAll = createAction(
  '[Circulation] Get Issue Circulations',
);

const getIssueAllLoaded = createAction(
  '[Circulation] Get Issue Circulations Loaded',
  props<{ data: Circulation[] }>()
);

const getIssueInfo = createAction(
  '[Circulation] Get Issue One',
  props<{ rfid: string }>()
);

const getReturnAll = createAction(
  '[Circulation] Get Return Circulations',
);

const getReturnAllLoaded = createAction(
  '[Circulation] Get Return Circulations Loaded',
  props<{ data: Circulation[] }>()
);

const issueAsset = createAction(
  '[Circulation] Issue Asset',
  props<{ data: Circulation }>()
);

const returnAsset = createAction(
  '[Circulation] Return Asset',
  props<{ data: Circulation }>()
);

export const circulationActionTypes = {
  getIssueAll,
  getIssueAllLoaded,
  getIssueInfo,
  getReturnAll,
  getReturnAllLoaded,
  issueAsset,
  returnAsset,
};
