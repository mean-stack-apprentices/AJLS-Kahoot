import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { HomeComponent } from './components/home/home.component';

import { SignupComponent } from './components/signup/signup.component';
import { CreateQuiz1Component } from './components/create-quiz1/create-quiz1.component';
import { CreateQuizQuestionComponent } from './components/create-quiz-question/create-quiz-question.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'quiz-list', component: QuizListComponent},
  {path: 'create-quiz1', component: CreateQuiz1Component},
  {path: 'create-question', component: CreateQuizQuestionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
