import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { User } from '../../../../shared/models/user.model.js';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  routeString = 'users/';

  constructor(
    private api:ApiService,
    private router: Router
  ) { }


  login(user:Partial<User>) {
    return this.api.post<{ data: User},Partial<User>>
    (`${this.routeString}login`,user)
  }

  navigateOnLogin() {
    return of(this.router.navigate(['']));
  }

}
