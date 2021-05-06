import { Actions } from '@ngrx/effects';
import { CirculationEffects } from './effects';
import { TestScheduler } from 'rxjs/testing';
import { circulationActionTypes } from './actions';
import { rootActionTypes } from '../actions';
import { Circulation } from 'src/app/shared/interfaces/circulation';
import { NzNotificationService } from 'ng-zorro-antd';

describe('Circulation-store effects', () => {
  const dataServiceSpy: any = { getall: null, getbyid: null, save: null, saveForm: null, delete: null };
  const notification = { blank: null } as NzNotificationService;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('getIssueAll', () => {
    testScheduler.run(({ cold, hot, expectObservable }) => {
      const actions = new Actions(hot('-a--', {
        a: circulationActionTypes.getIssueAll,
      }));
      const data: Circulation[] = [];
      spyOn(dataServiceSpy, 'getall').and.returnValue(
        cold('--a|', { a: data })
      );
      const effects = new CirculationEffects(actions, dataServiceSpy, notification);

      expectObservable(effects.getIssueAll$).toBe('---a', {
        a: circulationActionTypes.getIssueAllLoaded({ data }),
      });
    });
  });

  it('getIssueInfo', () => {
    testScheduler.run(({ cold, hot, expectObservable }) => {
      const actions = new Actions(hot('-a--', {
        a: circulationActionTypes.getIssueInfo,
      }));
      const data: Circulation[] = [];
      spyOn(dataServiceSpy, 'getbyid').and.returnValue(
        cold('--a|', { a: data })
      );
      spyOn(notification, 'blank');
      const effects = new CirculationEffects(actions, dataServiceSpy, notification);
      effects.getIssueInfo$.subscribe(_ => {
        expect(notification.blank).toBeCalledWith(`Assets`, data);
      });
    });
  });

  it('getReturnAll', () => {
    testScheduler.run(({ cold, hot, expectObservable }) => {
      const actions = new Actions(hot('-a--', {
        a: circulationActionTypes.getReturnAll,
      }));
      const data: Circulation[] = [];
      spyOn(dataServiceSpy, 'getall').and.returnValue(
        cold('--a|', { a: data })
      );
      const effects = new CirculationEffects(actions, dataServiceSpy, notification);

      expectObservable(effects.getReturnAll$).toBe('---a', {
        a: circulationActionTypes.getReturnAllLoaded({ data }),
      });
    });
  });

  it('issueAsset', () => {
    testScheduler.run(({ cold, hot, expectObservable }) => {
      const actions = new Actions(hot('-a--', {
        a: circulationActionTypes.issueAsset,
      }));
      const msg = 'message';
      spyOn(dataServiceSpy, 'save').and.returnValue(
        cold('--a|', { a: msg })
      );
      const effects = new CirculationEffects(actions, dataServiceSpy, notification);
      effects.issueAsset$.subscribe(data => {
        expect(data).toBe(rootActionTypes.message({ msg }));
      });
    });
  });

  it('returnAsset', () => {
    testScheduler.run(({ cold, hot, expectObservable }) => {
      const actions = new Actions(hot('-a--', {
        a: circulationActionTypes.returnAsset,
      }));
      const msg = 'message';
      spyOn(dataServiceSpy, 'save').and.returnValue(
        cold('--a|', { a: msg })
      );
      const effects = new CirculationEffects(actions, dataServiceSpy, notification);
      effects.returnAsset$.subscribe(data => {
        expect(data).toBe(rootActionTypes.message({ msg }));
      });
    });
  });


});

