import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { CreateQuizQuestionComponent } from './components/create-quiz-question/create-quiz-question.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { CreateQuizTitleComponent } from './components/create-quiz-title/create-quiz-title.component';
import { QuizDetailsComponent } from './components/quiz-details/quiz-details.component';
import { GamePinComponent } from './components/game-pin/game-pin.component';
import { JoinGameComponent } from './components/join-game/join-game.component';
import { PhaseLobbyComponent } from './components/phase-lobby/phase-lobby.component';
import { PhaseWaitingComponent } from './components/phase-waiting/phase-waiting.component';
import { PhaseQuestionComponent } from './components/phase-question/phase-question.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'game-pin', component: GamePinComponent },
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      { path: 'quiz-list', component: QuizListComponent },
      { path: 'quiz-details/:quizId', component: QuizDetailsComponent },
      { path: 'create-quiz-title', component: CreateQuizTitleComponent },
      {
        path: 'create-question/:quizId',
        component: CreateQuizQuestionComponent,
      },
    ],
  },
  { path: 'phase-lobby', component: PhaseLobbyComponent },
  { path: 'Join-game', component: JoinGameComponent },
  { path: 'phase-waiting', component: PhaseWaitingComponent },
  {path: 'phase-question', component:PhaseQuestionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
