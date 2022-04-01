import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { createQuiz } from 'src/app/store/actions/quiz/quiz.actions';

@Component({
  selector: 'app-create-quiz1',
  templateUrl: './create-quiz1.component.html',
  styleUrls: ['./create-quiz1.component.scss']
})
export class CreateQuiz1Component implements OnInit {
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
    this.store.dispatch(createQuiz({ data: this.createQuizForm.value }));
    this.createQuizForm.reset();
  }


}
