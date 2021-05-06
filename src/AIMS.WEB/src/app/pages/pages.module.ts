import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'asset',
        loadChildren: () => import('./asset/asset.module').then(m => m.AssetModule),
      },
      {
        path: 'circulation',
        loadChildren: () => import('./circulation/circulation.module').then(m => m.CirculationModule),
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'reports',
        loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule),
      },
      {
        path: 'system',
        loadChildren: () => import('./system/system.module').then(m => m.SystemModule),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      { path: '**', component: DashboardComponent }
    ]
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    PagesComponent,
    DashboardComponent,
  ],
})
export class PagesModule { }
