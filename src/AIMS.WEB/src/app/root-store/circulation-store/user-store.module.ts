import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CirculationEffects } from './effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducer';
import { circulationFeatureKey } from './selectors';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature(circulationFeatureKey, reducer),
    EffectsModule.forFeature([CirculationEffects])
  ]
})
export class CirculationStoreModule { }
