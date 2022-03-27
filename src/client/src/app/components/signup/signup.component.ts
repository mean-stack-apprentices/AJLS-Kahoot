import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { createUser } from 'src/app/store/actions/user/user.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  addUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store:Store<AppState>
  )
  {
    this.addUserForm = this.fb.group({
      username: ['', Validators.required],
      age: [ '',Validators.compose([Validators.required, Validators.minLength(3)]),],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)]),],
    });
  }

  ngOnInit(): void {}

  signUpUser(){
    this.store.dispatch(createUser({data:this.addUserForm.value}))
    this.addUserForm.reset();
  }
}
