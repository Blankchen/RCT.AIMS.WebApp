import { User } from './../../shared/interfaces/user';
import { Actions } from '@ngrx/effects';
import { UserEffects } from './effects';
import { TestScheduler } from 'rxjs/testing';
import { userActionTypes } from './actions';
import { rootActionTypes } from '../actions';
import { NzNotificationService } from 'ng-zorro-antd';
import { Store } from '@ngrx/store';
import { RootState } from '../state';

describe('User-store effects', () => {
  const dataServiceSpy: any = { getall: null, getbyid: null, save: null, saveForm: null, delete: null };
  const store = { dispatch: null } as Store<RootState>;
  const notification = { blank: null } as NzNotificationService;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('getUsers', () => {
    testScheduler.run(({ cold, hot, expectObservable }) => {
      const actions = new Actions(hot('-a--', {
        a: userActionTypes.getAll,
      }));
      const data: User[] = [];
      spyOn(dataServiceSpy, 'getall').and.returnValue(
        cold('--a|', { a: data })
      );
      const effects = new UserEffects(actions, dataServiceSpy, store, notification);

      expectObservable(effects.getUsers$).toBe('---a', {
        a: userActionTypes.getAllLoaded({ data }),
      });
    });
  });

  it('getUserInfo', () => {
    testScheduler.run(({ cold, hot, expectObservable }) => {
      const actions = new Actions(hot('-a--', {
        a: userActionTypes.getUserInfo,
      }));
      const data = {
        firstname: 'firstname',
        lastname: 'lastname',
        email: 'email'
      } as User;
      spyOn(dataServiceSpy, 'getbyid').and.returnValue(
        cold('--a|', { a: data })
      );
      spyOn(notification, 'blank');
      const effects = new UserEffects(actions, dataServiceSpy, store, notification);
      effects.getUserInfo$.subscribe(_ => {
        expect(notification.blank).toBeCalledWith(
          `User Name: ${data.firstname} ${data.lastname}`,
        `Email: ${data.email}`
        );
      });
    });
  });

  it('getUserByRfid', () => {
    testScheduler.run(({ cold, hot, expectObservable }) => {
      const actions = new Actions(hot('-a--', {
        a: userActionTypes.getOneByRfid,
      }));
      const data = {} as User;
      spyOn(dataServiceSpy, 'getbyid').and.returnValue(
        cold('--a|', { a: data })
      );
      const effects = new UserEffects(actions, dataServiceSpy, store, notification);

      expectObservable(effects.getUserByRfid$).toBe('---a', {
        a: userActionTypes.getOneByRfidLoaded({ data }),
      });
    });
  });

  it('saveUser', () => {
    testScheduler.run(({ cold, hot, expectObservable }) => {
      const actions = new Actions(hot('-a--', {
        a: userActionTypes.save,
      }));
      const msg = 'message';
      spyOn(dataServiceSpy, 'save').and.returnValue(
        cold('--a|', { a: msg })
      );
      spyOn(store, 'dispatch');
      const effects = new UserEffects(actions, dataServiceSpy, store, notification);
      effects.saveUser$.subscribe(data => {
        expect(data).toBe(rootActionTypes.message({ msg }));
        expect(store.dispatch).toBeCalledWith(userActionTypes.getAll());
      });
    });
  });

  it('removeUser', () => {
    testScheduler.run(({ cold, hot, expectObservable }) => {
      const actions = new Actions(hot('-a--', {
        a: userActionTypes.remove,
      }));
      const msg = 'message';
      spyOn(dataServiceSpy, 'delete').and.returnValue(
        cold('--a|', { a: msg })
      );
      spyOn(store, 'dispatch');
      const effects = new UserEffects(actions, dataServiceSpy, store, notification);
      effects.removeUser$.subscribe(data => {
        expect(data).toBe(rootActionTypes.message({ msg }));
        expect(store.dispatch).toBeCalledWith(userActionTypes.getAll());
      });
    });
  });


});

