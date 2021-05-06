import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from './root-store/state';
import { filter } from 'rxjs/operators';
import { rootActionTypes } from './root-store/actions';
import { NzMessageService } from 'ng-zorro-antd/message';
import { rootSelectorTypes } from './root-store/selectors';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  constructor(
    private store$: Store<RootState>,
    private router: Router,
    private message: NzMessageService,
  ) {
    this.store$.select(rootSelectorTypes.message).pipe(
      filter(data => !!data)
    ).subscribe(data => {
      this.message.info(data);
    });
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: NavigationStart) => {
      this.store$.dispatch(rootActionTypes.messageReset());
    });
  }
}
