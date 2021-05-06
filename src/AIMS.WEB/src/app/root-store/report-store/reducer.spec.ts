import { Summary } from './../../shared/interfaces/summary';
import { createAction } from '@ngrx/store';
import { reportActionTypes } from './actions';
import { initialState, reducer } from './reducer';
import { AssetChart } from 'src/app/shared/interfaces/asset-chart';
import { MemberChart } from 'src/app/shared/interfaces/member-chart';

describe('Report-store reducer', () => {
  it('should return init state', () => {
    const action = createAction('noop');
    const newState = reducer(undefined, action);

    expect(newState).toEqual(initialState);
  });

  it('should return asset all', () => {
    const data = [] as AssetChart[];
    const action = reportActionTypes.getAssetChartLoaded({ data });
    const newState = reducer(initialState, action);
    const expected = { ...initialState, asset: action.data };
    expect(newState).toEqual(expected);
  });

  it('should return member all', () => {
    const data = [] as MemberChart[];
    const action = reportActionTypes.getMemberChartLoaded({ data });
    const newState = reducer(initialState, action);
    const expected = { ...initialState, member: action.data };
    expect(newState).toEqual(expected);
  });

  it('should return summary all', () => {
    const data = {} as Summary;
    const action = reportActionTypes.getAllSummaryLoaded({ data });
    const newState = reducer(initialState, action);
    const expected = { ...initialState, summary: action.data };
    expect(newState).toEqual(expected);
  });

});
