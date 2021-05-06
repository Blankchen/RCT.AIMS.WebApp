import { Asset } from './../../shared/interfaces/asset';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AssetEffects } from './effects';
import { TestScheduler } from 'rxjs/testing';
import { RootState } from '../state';
import { assetActionTypes } from './actions';
import { rootActionTypes } from '../actions';

describe('Asset-store effects', () => {
  const dataServiceSpy: any = { getall: null, getbyid: null, save: null, saveForm: null, delete: null };
  const store = { dispatch: null } as Store<RootState>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('getAssets', () => {
    testScheduler.run(({ cold, hot, expectObservable }) => {
      const actions = new Actions(hot('-a--', {
        a: assetActionTypes.getAll,
      }));
      const data: Asset[] = [];
      spyOn(dataServiceSpy, 'getall').and.returnValue(
        cold('--a|', { a: data })
      );
      const effects = new AssetEffects(actions, dataServiceSpy, store);

      expectObservable(effects.getAssets$).toBe('---a', {
        a: assetActionTypes.getAllLoaded({ data }),
      });
    });
  });

  it('getAsset', () => {
    testScheduler.run(({ cold, hot, expectObservable }) => {
      const actions = new Actions(hot('-a--', {
        a: assetActionTypes.getOne,
      }));
      const data: Asset = {} as Asset;
      spyOn(dataServiceSpy, 'getbyid').and.returnValue(
        cold('--a|', { a: data })
      );
      const effects = new AssetEffects(actions, dataServiceSpy, store);

      expectObservable(effects.getAsset$).toBe('---a', {
        a: assetActionTypes.getOneLoaded({ data }),
      });
    });
  });

  it('saveAsset', () => {
    testScheduler.run(({ cold, hot, expectObservable, }) => {
      const actions = new Actions(hot('-a--', {
        a: assetActionTypes.save,
      }));
      const msg = 'message';
      spyOn(dataServiceSpy, 'saveForm').and.returnValue(
        cold('--a|', { a: msg })
      );
      spyOn(store, 'dispatch').and.returnValue(
        cold('--a|', { a: null })
      );
      const effects = new AssetEffects(actions, dataServiceSpy, store);
      effects.saveAsset$.subscribe(data => {
        expect(data).toBe(rootActionTypes.message({ msg }));
        expect(store.dispatch).toBeCalledWith(assetActionTypes.getAll());
      });
    });
  });

  it('removeAsset', () => {
    testScheduler.run(({ cold, hot, expectObservable, }) => {
      const actions = new Actions(hot('-a--', {
        a: assetActionTypes.remove,
      }));
      const msg = 'message';
      spyOn(dataServiceSpy, 'delete').and.returnValue(
        cold('--a|', { a: msg })
      );
      spyOn(store, 'dispatch').and.returnValue(
        cold('--a|', { a: null })
      );
      const effects = new AssetEffects(actions, dataServiceSpy, store);
      effects.removeAsset$.subscribe(data => {
        expect(data).toBe(rootActionTypes.message({ msg }));
        expect(store.dispatch).toBeCalledWith(assetActionTypes.getAll());
      });
    });
  });


});

