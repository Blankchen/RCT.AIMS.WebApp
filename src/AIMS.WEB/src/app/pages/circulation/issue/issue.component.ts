import { Asset } from './../../../shared/interfaces/asset';
import { circulationSelectorTypes } from './../../../root-store/circulation-store/selectors';
import { assetSelectorTypes } from './../../../root-store/asset-store/selectors';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root-store/state';
import { userActionTypes } from 'src/app/root-store/user-store/actions';
import { userSelectorTypes } from 'src/app/root-store/user-store/selectors';
import { assetActionTypes } from 'src/app/root-store/asset-store/actions';
import { circulationActionTypes } from 'src/app/root-store/circulation-store/actions';
import { rootSelectorTypes } from 'src/app/root-store/selectors';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit, AfterViewInit {
  message$: Observable<string>;
  public issueForm: FormGroup;
  memberSearch: string;
  assetSearch: string;
  public assetIssue: any;
  public assetChoose: Asset[] = [];

  constructor(
    private store$: Store<RootState>,
    private router: Router,
    private titleService: Title,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('Inventory System | issue');
    this.createForm();
    this.selectMember();
    this.selectAsset();
    this.message$ = this.store$.select(rootSelectorTypes.message);
  }

  ngAfterViewInit() {
    const searchUtil = (id) => fromEvent(document.getElementById(id), 'input').pipe(
      debounceTime(500),
      distinctUntilChanged()
    );

    searchUtil('memberName').subscribe(_ => {
      this.onMemberSearch();
    });

    searchUtil('assetSearch').subscribe(_ => {
      this.onAssetSearch();
    });
  }

  selectMember() {
    this.store$.select(userSelectorTypes.getOneRfid).subscribe(data => {
      if (!data) {
        return;
      }
      const today = new Date();
      const nextMonth = new Date(today.setMonth(today.getMonth() + 1));
      this.assetIssue = {
        memberid: data.id,
        membername: `${data.firstname} ${data.lastname}`,
        email: data.email
      };
      this.issueForm.patchValue({
        id: data.id || 0,
        memberId: this.assetIssue.memberid,
        memberName: this.assetIssue.membername,
        email: this.assetIssue.email,
        dueDate: nextMonth,
        assets: []
      });
      this.store$.dispatch(userActionTypes.removeOneByRfid());
    });
  }

  selectAsset() {
    this.store$.select(assetSelectorTypes.getOne).subscribe(data => {
      const isInclude = !!this.assetChoose.find(x => data && x.id === data.id);
      if (!data || isInclude) {
        return;
      }
      this.assetChoose.push(data);
      this.store$.dispatch(assetActionTypes.removeOne());
    });
  }

  // autoFillRfid(rfidCode: string) {
  //   if (!this.memberSearch) {
  //     this.memberSearch = rfidCode;
  //     this.onMemberSearch();
  //   } else {
  //     this.assetSearch = rfidCode;
  //     this.onAssetSearch();
  //   }
  // }

  createForm() {

    this.issueForm = this.formBuilder.group({
      id: 0,
      memberId: 0,
      memberName: new FormControl(''),
      email: new FormControl(''),
      dueDate: new FormControl(''),
      assets: []
    });
    // this.focus();
  }

  // Search Member
  onMemberSearch() {
    if (!this.memberSearch) {
      return;
    }
    this.store$.dispatch(userActionTypes.getOneByRfid({ rfid: this.memberSearch }));
  }

  onMemberClear() {
    const today = new Date();
    const nextMonth = new Date(today.setMonth(today.getMonth() + 1));

    this.memberSearch = null;
    this.assetIssue = null;
    this.issueForm.setValue({
      id: 0,
      memberId: 0,
      memberName: null,
      email: null,
      dueDate: nextMonth,
      assets: []
    });
  }

  // Asset Search
  onAssetSearch(): void {
    if (!this.assetSearch) {
      return;
    }
    this.store$.dispatch(assetActionTypes.getOne({ rfid: this.assetSearch }));
  }

  onAssetClear() {
    this.assetSearch = null;
  }

  // Create
  onSubmit() {
    this.issueForm.patchValue({
      assets: this.assetChoose
    });
    const memberRequired = this.issueForm.value.memberId > 0;
    const assetsRequired = this.issueForm.value.assets.length > 0;
    if (this.issueForm.invalid || !memberRequired || !assetsRequired) {
      return;
    }
    this.store$.dispatch(circulationActionTypes.issueAsset({ data: this.issueForm.value }));
    this.reset();
  }


  // Reset Form
  reset() {
    this.onMemberClear();
    this.onAssetClear();
    this.assetChoose = [];
  }

  removeAssetChoose(index: number) {
    this.assetChoose = this.assetChoose.filter((_, idx) => idx !== index);
  }
}
