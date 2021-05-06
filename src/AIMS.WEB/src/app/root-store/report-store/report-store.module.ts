import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ReportEffects } from './effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducer';
import { reportFeatureKey } from './selectors';

@NgModule({
  imports: [
    StoreModule.forFeature(reportFeatureKey, reducer),
    EffectsModule.forFeature([ReportEffects])
  ]
})
export class ReportStoreModule { }
