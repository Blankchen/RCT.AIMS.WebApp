import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducer';
import { userFeatureKey } from './selectors';

@NgModule({
  imports: [
    StoreModule.forFeature(userFeatureKey, reducer),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class UserStoreModule { }
