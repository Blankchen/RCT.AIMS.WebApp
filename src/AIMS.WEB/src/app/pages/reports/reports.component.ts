import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RootState } from 'src/app/root-store/state';
import { Store } from '@ngrx/store';
import { circulationActionTypes } from 'src/app/root-store/circulation-store/actions';
import { circulationSelectorTypes } from 'src/app/root-store/circulation-store/selectors';
import { Observable } from 'rxjs';
import { Report } from 'src/app/shared/interfaces/report';
import { Circulation } from 'src/app/shared/interfaces/circulation';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  issueData$: Observable<Report>;
  returnData$: Observable<Report>;

  constructor(
    private store$: Store<RootState>,
    private titleService: Title
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('Inventory System | Asset Reports');
    this.returnedList();
    this.issueData$ = this.store$.select(circulationSelectorTypes.getIssueAll).pipe(
      map(data => this.filterByCategory(data))
    );
    this.returnData$ = this.store$.select(circulationSelectorTypes.getReturnAll).pipe(
      map(data => this.filterByCategory(data))
    );
  }

  // Issue/Return
  returnedList() {
    this.store$.dispatch(circulationActionTypes.getIssueAll());
    this.store$.dispatch(circulationActionTypes.getReturnAll());
  }

  private filterByCategory(response: Circulation[]): Report {
    // hard code Game Mobile id
    const categoryId = 3;
    const mobile = response.filter(x => x.assets.length && x.assets[0].category === categoryId);
    const asset = response.filter(x => x.assets.length && x.assets[0].category !== categoryId);
    return {
      mobile,
      asset
    };
  }

}
