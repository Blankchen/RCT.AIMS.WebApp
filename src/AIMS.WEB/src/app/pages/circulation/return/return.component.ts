import { Asset } from './../../../shared/interfaces/asset';
import { Component, OnInit, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from 'src/app/shared/service';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root-store/state';
import { circulationSelectorTypes } from 'src/app/root-store/circulation-store/selectors';
import { assetSelectorTypes } from 'src/app/root-store/asset-store/selectors';
import { assetActionTypes } from 'src/app/root-store/asset-store/actions';
import { circulationActionTypes } from 'src/app/root-store/circulation-store/actions';
import { rootSelectorTypes } from 'src/app/root-store/selectors';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnComponent implements OnInit, AfterViewInit {
  message$: Observable<string>;
  returnForm: FormGroup;
  assetSearch: string;
  assetChoose: Asset[] = [];

  constructor(
    private store$: Store<RootState>,
    private titleService: Title,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('Inventory System | issue');
    this.createForm();
    this.selectAsset();
    this.message$ = this.store$.select(rootSelectorTypes.message);
  }

  ngAfterViewInit() {
    const searchUtil = (id) => fromEvent(document.getElementById(id), 'keypress').pipe(
      debounceTime(500),
      distinctUntilChanged()
    );

    searchUtil('assetSearch').subscribe(_ => {
      this.onAssetSearch();
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
  //   this.assetSearch = rfidCode;
  //   this.onAssetSearch();
  // }

  createForm() {
    this.returnForm = this.formBuilder.group({
      assets: []
    });
    // this.focus();
  }

  onMemberClear() {
    this.returnForm.setValue({
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
    this.returnForm.patchValue({
      assets: this.assetChoose
    });
    const assetsRequired = this.returnForm.value.assets.length > 0;
    if (this.returnForm.invalid || !assetsRequired) {
      return;
    }
    this.store$.dispatch(circulationActionTypes.returnAsset({ data: this.returnForm.value }));
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
