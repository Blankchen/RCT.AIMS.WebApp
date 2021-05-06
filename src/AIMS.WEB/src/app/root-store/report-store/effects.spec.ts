import { Summary } from './../../shared/interfaces/summary';
import { MemberChart } from './../../shared/interfaces/member-chart';
import { AssetChart } from './../../shared/interfaces/asset-chart';
import { Actions } from '@ngrx/effects';
import { ReportEffects } from './effects';
import { TestScheduler } from 'rxjs/testing';
import { reportActionTypes } from './actions';
import { rootActionTypes } from '../actions';
import { Circulation } from 'src/app/shared/interfaces/circulation';

describe('Report-store effects', () => {
  const dataServiceSpy: any = { getall: null, getbyid: null, save: null, saveForm: null, delete: null };
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('getAssetChart', () => {
    testScheduler.run(({ cold, hot, expectObservable }) => {
      const actions = new Actions(hot('-a--', {
        a: reportActionTypes.getAssetChart,
      }));
      const data: AssetChart[] = [];
      spyOn(dataServiceSpy, 'getall').and.returnValue(
        cold('--a|', { a: data })
      );
      const effects = new ReportEffects(actions, dataServiceSpy);

      expectObservable(effects.getAssetChart$).toBe('---a', {
        a: reportActionTypes.getAssetChartLoaded({ data }),
      });
    });
  });

  it('getMemberChart', () => {
    testScheduler.run(({ cold, hot, expectObservable }) => {
      const actions = new Actions(hot('-a--', {
        a: reportActionTypes.getMemberChart,
      }));
      const data: MemberChart[] = [];
      spyOn(dataServiceSpy, 'getall').and.returnValue(
        cold('--a|', { a: data })
      );
      const effects = new ReportEffects(actions, dataServiceSpy);

      expectObservable(effects.getMemberChart$).toBe('---a', {
        a: reportActionTypes.getMemberChartLoaded({ data }),
      });
    });
  });

  it('getAllSummary', () => {
    testScheduler.run(({ cold, hot, expectObservable }) => {
      const actions = new Actions(hot('-a--', {
        a: reportActionTypes.getAllSummary,
      }));
      const data = {} as Summary;
      spyOn(dataServiceSpy, 'getall').and.returnValue(
        cold('--a|', { a: data })
      );
      const effects = new ReportEffects(actions, dataServiceSpy);

      expectObservable(effects.getAllSummary$).toBe('---a', {
        a: reportActionTypes.getAllSummaryLoaded({ data }),
      });
    });
  });


});

