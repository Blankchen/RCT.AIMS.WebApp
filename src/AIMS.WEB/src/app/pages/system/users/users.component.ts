import { userSelectorTypes } from './../../../root-store/user-store/selectors';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from 'src/app/shared/interfaces/user';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootState } from 'src/app/root-store/state';
import { userActionTypes } from 'src/app/root-store/user-store/actions';
import { circulationActionTypes } from 'src/app/root-store/circulation-store/actions';
import { rootSelectorTypes } from 'src/app/root-store/selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  message$: Observable<string>;
  users$: Observable<User[]>;

  metaList = [
    {
      title: 'Id',
      key: 'id',
      type: 'readonly'
    },
    {
      title: 'First',
      key: 'firstname'
    },
    {
      title: 'Last',
      key: 'lastname'
    },
    {
      title: 'Email',
      key: 'email'
    },
    {
      title: 'Rfid Code',
      key: 'rfidCode'
    },
    {
      title: 'Contact',
      key: 'contact'
    },
    {
      title: 'Issued Assets',
      key: 'issueCount',
      type: 'link'
    }
  ];

  constructor(
    private store$: Store<RootState>,
    private titleService: Title,
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('Inventory System | Users');
    this.getAll();
    this.message$ = this.store$.select(rootSelectorTypes.message);
    this.users$ = this.store$.select(userSelectorTypes.getAll);
  }

  // Get All User
  getAll() {
    this.store$.dispatch(userActionTypes.getAll());
  }

  save(data: User) {
    this.store$.dispatch(userActionTypes.save({ data }));
  }

  // Delete
  delete(id) {
    this.store$.dispatch(userActionTypes.remove({ id }));
  }

  onclickLink(data: any) {
    this.store$.dispatch(circulationActionTypes.getIssueInfo({ rfid: data.rfidCode }));
  }
}
