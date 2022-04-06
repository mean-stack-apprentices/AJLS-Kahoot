import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-quiz-question',
  templateUrl: './create-quiz-question.component.html',
  styleUrls: ['./create-quiz-question.component.scss']
})
export class CreateQuizQuestionComponent implements OnInit {
  createQuestionForm: FormGroup;
  queryQuizId : String | null = null;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
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
    this.activatedRoute.paramMap.subscribe(params =>{
      this.queryQuizId = params.get('quizId');
    });
  }

}
