import { categorySelectorTypes } from './../../../root-store/category-store/selectors';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../../shared/service';
import { Category } from 'src/app/shared/interfaces/category';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootState } from 'src/app/root-store/state';
import { categoryActionTypes } from 'src/app/root-store/category-store/actions';
import { rootSelectorTypes } from 'src/app/root-store/selectors';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  message$: Observable<string>;
  categories$: Observable<Category[]>;
  metaList = [
    {
      title: 'Category Name',
      key: 'categoryname'
    }
  ];

  constructor(
    private store$: Store<RootState>,
    private titleService: Title,
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('Inventory System | Categories');
    this.getAll();
    this.message$ = this.store$.select(rootSelectorTypes.message);
    this.categories$ = this.store$.select(categorySelectorTypes.getAll);
  }

  // Get All
  getAll() {
    this.store$.dispatch(categoryActionTypes.getAll());
  }

  // Create
  save(data: Category) {
    this.store$.dispatch(categoryActionTypes.save({ data }));
  }

  // Delete
  delete(id) {
    this.store$.dispatch(categoryActionTypes.remove({ id }));
  }

}
