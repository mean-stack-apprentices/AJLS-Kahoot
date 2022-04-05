import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { JoinGameComponent } from './components/join-game/join-game.component';

import { HomeComponent } from './components/home/home.component';

import { SignupComponent } from './components/signup/signup.component';
import { CreateQuizQuestionComponent } from './components/create-quiz-question/create-quiz-question.component';

import { QuizListComponent } from './components/quiz-list/quiz-list.component'
import { CreateQuizTitleComponent } from './components/create-quiz-title/create-quiz-title.component'


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'join-game', component: JoinGameComponent},
  {path: 'quiz-list', component: QuizListComponent},
  {path: 'create-quiz-title', component: CreateQuizTitleComponent},
  {path: 'create-question', component: CreateQuizQuestionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
