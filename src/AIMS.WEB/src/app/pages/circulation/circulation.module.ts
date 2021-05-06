import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { IssueComponent } from './issue/issue.component';
import { ReturnComponent } from './return/return.component';

const routes: Routes = [
  {
    path: 'issue',
    component: IssueComponent,
    data: {
      breadcrumb: '(Circulation) Issue'
    },
  },
  {
    path: 'return',
    component: ReturnComponent,
    data: {
      breadcrumb: '(Circulation) Return'
    },
  },
];

@NgModule({
  declarations: [
    IssueComponent,
    ReturnComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class CirculationModule { }
