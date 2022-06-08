import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { User } from '../../../../shared/models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  routeString = 'users/';

  constructor(private api:ApiService,private router: Router) { }

  createUser(user: User){
    return this.api.post<{data: User}, User>(`${this.routeString}create-user`,user).pipe(map((res)=>res.data))
  }
}
