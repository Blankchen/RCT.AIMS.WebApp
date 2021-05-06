import { reducer } from './reducer';
import { UserStoreModule } from './user-store/user-store.module';
import { CategoryStoreModule } from './category-store/category-store.module';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { AssetStoreModule } from './asset-store/asset-store.module';
import { AuthorStoreModule } from './author-store/author-store.module';
import { CirculationStoreModule } from './circulation-store/user-store.module';
import { ReportStoreModule } from './report-store/report-store.module';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({ root: reducer }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }) : [],

    AssetStoreModule,
    AuthorStoreModule,
    CategoryStoreModule,
    UserStoreModule,
    CirculationStoreModule,
    ReportStoreModule,
  ]
})
export class RootStoreModule { }
