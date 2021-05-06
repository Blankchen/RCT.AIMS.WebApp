import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  {
    path: 'history',
    component: ReportsComponent,
    data: {
      breadcrumb: '(Reports) History'
    },
  },
];


@NgModule({
  declarations: [
    ReportsComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class ReportsModule { }
