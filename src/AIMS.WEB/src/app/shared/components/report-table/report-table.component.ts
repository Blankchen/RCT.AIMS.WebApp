import { Component, Input, OnInit } from '@angular/core';
import { Circulation } from '../../interfaces/circulation';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']
})
export class ReportTableComponent implements OnInit {
  @Input() report: Circulation[];
  @Input() isIssue: boolean;

  constructor() { }

  ngOnInit() {
  }

}
