import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/store';
import { loginUser } from 'src/app/store/actions/user/user.actions';
import { loginFailureSelector } from 'src/app/store/selectors/user/user.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFailMsg$: Observable<string>;
    constructor( private fb: FormBuilder,private store: Store<AppState>) {

      this.loginFailMsg$ = this.store.select(loginFailureSelector );
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });


    }
    ngOnInit(): void {
    }

    login() {
      this.store.dispatch(loginUser({ data: this.loginForm.value }))
    }

  }
