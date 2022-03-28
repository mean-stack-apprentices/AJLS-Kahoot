import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from '../../../../shared/models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  routeString = 'users/';

  constructor(private api:ApiService,) { }


  login(user:Partial<User>) {
    return this.api.post<{ data: User},Partial<User>>
    (`${this.routeString}login`,user)

  }

}
