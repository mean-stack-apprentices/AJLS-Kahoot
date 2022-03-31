import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { HomeComponent } from './components/home/home.component';

import { SignupComponent } from './components/signup/signup.component';
import { CreateQuiz1Component } from './components/create-quiz1/create-quiz1.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'create-quiz1', component: CreateQuiz1Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
