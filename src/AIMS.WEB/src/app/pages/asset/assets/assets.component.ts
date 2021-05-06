import { rootSelectorTypes } from './../../../root-store/selectors';
import { categorySelectorTypes } from './../../../root-store/category-store/selectors';
import { authorSelectorTypes } from './../../../root-store/author-store/selectors';
import { Asset } from '../../../shared/interfaces/asset';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root-store/state';
import { Observable, Subscription } from 'rxjs';
import { assetActionTypes } from 'src/app/root-store/asset-store/actions';
import { assetSelectorTypes } from 'src/app/root-store/asset-store/selectors';
import { AssetForm } from 'src/app/shared/interfaces/asset-form';
import { Dropdown } from 'src/app/shared/interfaces/dropdonw';
import { categoryActionTypes } from 'src/app/root-store/category-store/actions';
import { authorActionTypes } from 'src/app/root-store/author-store/actions';
import { userActionTypes } from 'src/app/root-store/user-store/actions';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit, OnDestroy {
  message$: Observable<string>;
  assets$: Observable<Asset[]>;

  metaList = [
    {
      title: 'Id',
      key: 'id',
      type: 'readonly'
    },
    {
      title: 'Asset Name',
      key: 'assetname'
    },
    {
      title: 'Cover Image',
      key: 'coverimage',
      type: 'img'
    },
    {
      title: 'Author Name',
      key: 'authorname',
      type: 'select',
      optionList: []
    },
    {
      title: 'Category Name',
      key: 'categoryname',
      type: 'select',
      optionList: []
    },
    {
      title: 'Rfid Code',
      key: 'rfidCode'
    },
    {
      title: 'Issued User',
      key: 'issuedBy',
      type: 'link'
    },
  ];
  authornameList: Dropdown[] = [];
  categorynameList: Dropdown[] = [];
  subscription = new Subscription();

  @ViewChild('fileInput', { static: true }) fileInput: ElementRef;

  constructor(
    private store$: Store<RootState>,
    private titleService: Title,
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('Inventory System | Assets');

    this.getAuthor();
    this.getCategory();
    this.getAll();
    this.message$ = this.store$.select(rootSelectorTypes.message);
    this.assets$ = this.store$.select(assetSelectorTypes.getAll);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // Get Asset
  getAll() {
    this.store$.dispatch(assetActionTypes.getAll());
  }

  // Create
  save(data: any) {
    const assetForm: AssetForm = {
      ...data,
      authorId: this.authornameList.find(item => item.label === data.authorname).id,
      category: this.categorynameList.find(item => item.label === data.categoryname).id
    };
    this.store$.dispatch(assetActionTypes.save({ data: assetForm }));
  }

  // Delete
  delete(id) {
    this.store$.dispatch(assetActionTypes.remove({ id }));
  }

  // Get Author
  getAuthor() {
    this.store$.dispatch(authorActionTypes.getAll());
    this.store$.select(authorSelectorTypes.getAll).subscribe(data => {
      const index = this.metaList.findIndex(item => item.key === 'authorname');
      this.authornameList = data.map(x => {
        return {
          id: x.id,
          label: x.authorname
        } as Dropdown;
      });
      this.metaList[index].optionList = this.authornameList;
    });
  }

  // Get Category
  getCategory() {
    this.store$.dispatch(categoryActionTypes.getAll());
    this.store$.select(categorySelectorTypes.getAll).subscribe(data => {
      const index = this.metaList.findIndex(item => item.key === 'categoryname');
      this.categorynameList = data.map(x => {
        return {
          id: x.id,
          label: x.categoryname
        } as Dropdown;
      });
      this.metaList[index].optionList = this.categorynameList;
    });
  }

  onclickLink(data: any) {
    const id = data.issuedBy;
    this.store$.dispatch(userActionTypes.getUserInfo({ id }));
  }
}
