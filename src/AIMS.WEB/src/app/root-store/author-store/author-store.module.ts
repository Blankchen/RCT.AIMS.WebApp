import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AuthorEffects } from './effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducer';
import { authorFeatureKey } from './selectors';

@NgModule({
  imports: [
    StoreModule.forFeature(authorFeatureKey, reducer),
    EffectsModule.forFeature([AuthorEffects])
  ]
})
export class AuthorStoreModule { }
