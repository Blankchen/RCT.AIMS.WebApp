import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableComponent } from './components/table/table.component';
import { ImageModalComponent } from './components/image-modal/image-modal.component';

import { ChartModule } from 'angular-highcharts';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { KeyMapperComponent } from './components/key-mapper/key-mapper.component';
import { ReportTableComponent } from './components/report-table/report-table.component';

const components = [
  TableComponent,
  ImageModalComponent,
  KeyMapperComponent,
  ReportTableComponent,
];

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  // third party
  ChartModule,
  NgZorroAntdModule,
];



@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    ...modules
  ],
  exports: [
    ...components,
    ...modules
  ]
})
export class SharedModule { }
