import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { UserEffects } from './store/effects/user/user.effects';
import * as fromUser from './store/reducers/user/user.reducer';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateQuizTitleComponent } from './components/create-quiz-title/create-quiz-title.component';
import { CreateQuizQuestionComponent } from './components/create-quiz-question/create-quiz-question.component';
import { QuizEffects } from './store/effects/quiz/quiz.effects';
import * as fromQuiz from './store/reducers/quiz/quiz.reducer';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
<<<<<<< HEAD
import { JoinGameComponent } from './components/join-game/join-game.component';
=======
import { QuizDetailsComponent } from './components/quiz-details/quiz-details.component';
>>>>>>> development

const config: SocketIoConfig = { url: !environment.production ? 'http://localhost:3501/' : '', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    CreateQuizTitleComponent,
    CreateQuizQuestionComponent,
    QuizListComponent,
<<<<<<< HEAD
    JoinGameComponent,
=======
    QuizDetailsComponent,
>>>>>>> development
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([UserEffects, QuizEffects]),
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
    StoreModule.forFeature(fromQuiz.quizFeatureKey, fromQuiz.reducer),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
