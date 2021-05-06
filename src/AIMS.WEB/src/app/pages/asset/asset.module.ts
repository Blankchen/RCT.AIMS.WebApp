import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssetsComponent } from './assets/assets.component';
import { AuthorsComponent } from './authors/authors.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  {
    path: 'assets',
    component: AssetsComponent,
    data: {
      breadcrumb: '(Asset) Assets'
    },
  },
  {
    path: 'authors',
    component: AuthorsComponent,
    data: {
      breadcrumb: '(Asset) Authors'
    },
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    data: {
      breadcrumb: '(Asset) Categories'
    },
  },
];

@NgModule({
  declarations: [
    AssetsComponent,
    AuthorsComponent,
    CategoriesComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class AssetModule { }
