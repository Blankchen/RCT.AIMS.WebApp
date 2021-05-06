import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CategoryEffects } from './effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducer';
import { categoryFeatureKey } from './selectors';

@NgModule({
  imports: [
    StoreModule.forFeature(categoryFeatureKey, reducer),
    EffectsModule.forFeature([CategoryEffects])
  ]
})
export class CategoryStoreModule { }
