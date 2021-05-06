import { MemberChart } from './../../shared/interfaces/member-chart';
import { AssetChart } from './../../shared/interfaces/asset-chart';
import { map, tap } from 'rxjs/operators';
import { Summary } from './../../shared/interfaces/summary';
import { Observable } from 'rxjs';
import { reportSelectorTypes } from './../../root-store/report-store/selectors';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Chart } from 'angular-highcharts';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root-store/state';
import { reportActionTypes } from 'src/app/root-store/report-store/actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  summary$: Observable<Summary>;
  assetsChart$: Observable<Chart>;
  assetsChartData: AssetChart[];
  memberChart$: Observable<Chart>;
  memberChartData: MemberChart[];
  cardList = [
    {
      key: 'totalAsset',
      title: 'Total Assets',
      class: 'text-info',
      color: { '0%': '#17ead9', '100%': '#6078ea' }
    },
    {
      key: 'totalIssued',
      title: 'Total Issued',
      class: 'text-danger',
      color: { '0%': '#f54ea2', '100%': '#ff7676' }
    },
    {
      key: 'totalReturned',
      title: 'Total Return',
      class: 'text-success',
      color: { '0%': '#42e695', '100%': '#3bb2b8' }
    },
    {
      key: 'totalMember',
      title: 'Total Member',
      class: 'text-warning',
      color: { '0%': '#ffdf40', '100%': '#ff8359' }
    },
  ];

  constructor(
    private store$: Store<RootState>,
    private titleService: Title,
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('Inventory System | Dashboard');
    this.summary$ = this.store$.select(reportSelectorTypes.getSummary);
    this.getSummary();
    this.getAssetChart();
    this.getMemberChart();

    this.assetsChart$ = this.store$.select(reportSelectorTypes.getAssetChart).pipe(
      map(data => {
        if (data.length === 0) {
          return null;
        }
        this.assetsChartData = data;
        const charData = data.reduce((prev, curr) => {
          prev.push({
            name: curr.bname,
            y: curr.nissue,
            sliced: true,
            selected: true
          });
          return prev;
        }, []);
        return this.toChart(
          charData,
          'Asset Issued',
          'Issued Pie-Chart!',
          'Total Issued',
        );
      })
    );

    this.memberChart$ = this.store$.select(reportSelectorTypes.getMemberChart).pipe(
      map(data => {
        if (data.length === 0) {
          return null;
        }
        this.memberChartData = data;
        const charData = data.reduce((prev, curr) => {
          prev.push({
            name: curr.mname,
            y: curr.ntrans,
            sliced: true,
            selected: true
          });
          return prev;
        }, []);
        return this.toChart(
          charData,
          'Member Performance',
          'Reading Pie-Chart!',
          'Total Reading',
        );
      })
    );
  }

  private toChart(chartData: Array<any>, title: string, subTitle: string, seriesName: string) {
    return new Chart({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        backgroundColor: null,
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0
        }
      },
      title: {
        text: title,
      },
      subtitle: {
        text: subTitle
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 35,
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: seriesName,
        data: chartData,
        type: undefined,
      }]
    });
  }

  // Get Summary
  getSummary() {
    this.store$.dispatch(reportActionTypes.getAllSummary());
  }

  // Get AssetChart
  getAssetChart() {
    this.store$.dispatch(reportActionTypes.getAssetChart());
  }

  // Get MemberChart
  getMemberChart() {
    this.store$.dispatch(reportActionTypes.getMemberChart());
  }

}
