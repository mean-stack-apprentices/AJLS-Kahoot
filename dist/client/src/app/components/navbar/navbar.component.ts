import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { loginUser, loginUserSuccess, logoutUser } from 'src/app/store/actions/user/user.actions';
import { loggedUserSelector } from 'src/app/store/selectors/user/user.selectors';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loggedInUser$: Observable<User | null>
  constructor(private store:Store<AppState>) {
    this.loggedInUser$ = this.store.select(loggedUserSelector)
   }

  ngOnInit(): void {
    const loggedInUserToken = localStorage.getItem('Token')
    if(loggedInUserToken){
      this.store.dispatch(loginUserSuccess({data: JSON.parse(loggedInUserToken)}))
    }
  }

  logout() {
    this.store.dispatch(logoutUser());
  }

}


