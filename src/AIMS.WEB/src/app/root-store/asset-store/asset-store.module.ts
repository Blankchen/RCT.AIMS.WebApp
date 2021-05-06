import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AssetEffects } from './effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducer';
import { assetFeatureKey } from './selectors';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature(assetFeatureKey, reducer),
    EffectsModule.forFeature([AssetEffects])
  ]
})
export class AssetStoreModule { }
