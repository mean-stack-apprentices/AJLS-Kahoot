import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-quiz-question',
  templateUrl: './create-quiz-question.component.html',
  styleUrls: ['./create-quiz-question.component.scss']
})
export class CreateQuizQuestionComponent implements OnInit {
  createQuestionForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) 
  { 
    this.createQuestionForm = this.fb.group({
      question_title: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])],

      option1: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],

      option2: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],

      option3: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],

      option4: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],


    })
  }

  ngOnInit(): void {
  }

}
