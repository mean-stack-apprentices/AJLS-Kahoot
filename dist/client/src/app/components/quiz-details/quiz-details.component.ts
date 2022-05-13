import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectedQuizSelector } from 'src/app/store/selectors/quiz/quiz.selectors';
import { SocketService } from 'src/app/services/socket.service';
import { Quiz } from '../../../../../shared/models/quiz.model';
import { deleteQuiz } from 'src/app/store/actions/quiz/quiz.actions';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss'],
})
export class QuizDetailsComponent implements OnInit {
  QuizId: String | null = null;
  selectedQuiz$: Observable<Quiz | null>;
  quesLength: Number | undefined;
  isShown: boolean = false;
  buttonText: string = 'Show Answers';

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private socketService: SocketService
  ) {
    this.selectedQuiz$ = this.store.select(selectedQuizSelector);
    this.selectedQuiz$.subscribe((quiz) => {
      this.quesLength = quiz?.questions?.length;
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.QuizId = params.get('quizId');
    });
  }

  startQuiz(quiz: Quiz) {
    this.socketService.startQuiz(quiz);
  }

  toggleDiv() {
    this.isShown = !this.isShown;
    if (this.isShown) this.buttonText = 'Hide Answers';
    else this.buttonText = 'Show Answers';
  }

  deleteQuiz(quiz: Quiz) {
    let result = confirm('Are you sure you want to delete this quiz?');
    if (result) {
      this.store.dispatch(deleteQuiz({ data: quiz }));
      console.log(`quiz '${quiz._id}' deleted successfully`);
    }
  }
}
