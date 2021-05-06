import { Author } from './../../shared/interfaces/author';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuthorEffects } from './effects';
import { TestScheduler } from 'rxjs/testing';
import { RootState } from '../state';
import { authorActionTypes } from './actions';
import { rootActionTypes } from '../actions';

describe('Author-store effects', () => {
  const dataServiceSpy: any = { getall: null, getbyid: null, save: null, saveForm: null, delete: null };
  const store = { dispatch: null } as Store<RootState>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('getAuthors', () => {
    testScheduler.run(({ cold, hot, expectObservable }) => {
      const actions = new Actions(hot('-a--', {
        a: authorActionTypes.getAll,
      }));
      const data: Author[] = [];
      spyOn(dataServiceSpy, 'getall').and.returnValue(
        cold('--a|', { a: data })
      );
      const effects = new AuthorEffects(actions, dataServiceSpy, store);

      expectObservable(effects.getAuthors$).toBe('---a', {
        a: authorActionTypes.getAllLoaded({ data }),
      });
    });
  });

  it('saveAuthor', () => {
    testScheduler.run(({ cold, hot, expectObservable, }) => {
      const actions = new Actions(hot('-a--', {
        a: authorActionTypes.save,
      }));
      const msg = 'message';
      spyOn(dataServiceSpy, 'saveForm').and.returnValue(
        cold('--a|', { a: msg })
      );
      spyOn(store, 'dispatch').and.returnValue(
        cold('--a|', { a: null })
      );
      const effects = new AuthorEffects(actions, dataServiceSpy, store);
      effects.saveAuthor$.subscribe(data => {
        expect(data).toBe(rootActionTypes.message({ msg }));
        expect(store.dispatch).toBeCalledWith(authorActionTypes.getAll());
      });
    });
  });

  it('deleteAuthor', () => {
    testScheduler.run(({ cold, hot, expectObservable, }) => {
      const actions = new Actions(hot('-a--', {
        a: authorActionTypes.remove,
      }));
      const msg = 'message';
      spyOn(dataServiceSpy, 'delete').and.returnValue(
        cold('--a|', { a: msg })
      );
      spyOn(store, 'dispatch').and.returnValue(
        cold('--a|', { a: null })
      );
      const effects = new AuthorEffects(actions, dataServiceSpy, store);
      effects.deleteAuthor$.subscribe(data => {
        expect(data).toBe(rootActionTypes.message({ msg }));
        expect(store.dispatch).toBeCalledWith(authorActionTypes.getAll());
      });
    });
  });


});

