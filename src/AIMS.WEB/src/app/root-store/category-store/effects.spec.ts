import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CategoryEffects } from './effects';
import { TestScheduler } from 'rxjs/testing';
import { RootState } from '../state';
import { categoryActionTypes } from './actions';
import { rootActionTypes } from '../actions';
import { Category } from 'src/app/shared/interfaces/category';

describe('Category-store effects', () => {
  const dataServiceSpy: any = { getall: null, getbyid: null, save: null, saveForm: null, delete: null };
  const store = { dispatch: null } as Store<RootState>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('getCategories', () => {
    testScheduler.run(({ cold, hot, expectObservable }) => {
      const actions = new Actions(hot('-a--', {
        a: categoryActionTypes.getAll,
      }));
      const data: Category[] = [];
      spyOn(dataServiceSpy, 'getall').and.returnValue(
        cold('--a|', { a: data })
      );
      const effects = new CategoryEffects(actions, dataServiceSpy, store);

      expectObservable(effects.getCategories$).toBe('---a', {
        a: categoryActionTypes.getAllLoaded({ data }),
      });
    });
  });

  it('saveCategory', () => {
    testScheduler.run(({ cold, hot, expectObservable, }) => {
      const actions = new Actions(hot('-a--', {
        a: categoryActionTypes.save,
      }));
      const msg = 'message';
      spyOn(dataServiceSpy, 'saveForm').and.returnValue(
        cold('--a|', { a: msg })
      );
      spyOn(store, 'dispatch').and.returnValue(
        cold('--a|', { a: null })
      );
      const effects = new CategoryEffects(actions, dataServiceSpy, store);
      effects.saveCategory$.subscribe(data => {
        expect(data).toBe(rootActionTypes.message({ msg }));
        expect(store.dispatch).toBeCalledWith(categoryActionTypes.getAll());
      });
    });
  });

  it('deleteCategory', () => {
    testScheduler.run(({ cold, hot, expectObservable, }) => {
      const actions = new Actions(hot('-a--', {
        a: categoryActionTypes.remove,
      }));
      const msg = 'message';
      spyOn(dataServiceSpy, 'delete').and.returnValue(
        cold('--a|', { a: msg })
      );
      spyOn(store, 'dispatch').and.returnValue(
        cold('--a|', { a: null })
      );
      const effects = new CategoryEffects(actions, dataServiceSpy, store);
      effects.deleteCategory$.subscribe(data => {
        expect(data).toBe(rootActionTypes.message({ msg }));
        expect(store.dispatch).toBeCalledWith(categoryActionTypes.getAll());
      });
    });
  });


});

