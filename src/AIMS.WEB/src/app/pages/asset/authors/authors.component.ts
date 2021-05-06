import { authorSelectorTypes } from './../../../root-store/author-store/selectors';
import { Author } from './../../../shared/interfaces/author';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../../shared/service';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root-store/state';
import { Observable } from 'rxjs';
import { authorActionTypes } from 'src/app/root-store/author-store/actions';
import { rootSelectorTypes } from 'src/app/root-store/selectors';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  message$: Observable<string>;
  authors$: Observable<Author[]>;
  metaList = [
    {
      title: 'Author Name',
      key: 'authorname'
    }
  ];

  constructor(
    private store$: Store<RootState>,
    private titleService: Title,
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('Inventory System | Authors');
    this.getAll();
    this.message$ = this.store$.select(rootSelectorTypes.message);
    this.authors$ = this.store$.select(authorSelectorTypes.getAll);
  }

  // Get All
  getAll() {
    this.store$.dispatch(authorActionTypes.getAll());
  }

  // Create
  save(data: Author) {
    this.store$.dispatch(authorActionTypes.save({ data }));
  }


  // Delete
  delete(id) {
    this.store$.dispatch(authorActionTypes.remove({ id }));
  }

}
