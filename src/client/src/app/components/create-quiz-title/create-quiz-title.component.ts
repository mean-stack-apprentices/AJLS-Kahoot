import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { createQuizTitle } from 'src/app/store/actions/quiz/quiz.actions';

@Component({
  selector: 'app-create-quiz-title',
  templateUrl: './create-quiz-title.component.html',
  styleUrls: ['./create-quiz-title.component.scss']
})
export class CreateQuizTitleComponent implements OnInit {
  createQuizForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  )
  { 
    this.createQuizForm = this.fb.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    })
  }

  ngOnInit(): void {
  }

  createQuiz() {
    this.store.dispatch(createQuizTitle({ data: this.createQuizForm.value }));
    this.createQuizForm.reset();
  }


}
