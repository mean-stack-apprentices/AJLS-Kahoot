import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';


@Component({
  selector: 'app-create-quiz-question',
  templateUrl: './create-quiz-question.component.html',
  styleUrls: ['./create-quiz-question.component.scss']
})
export class CreateQuizQuestionComponent implements OnInit {
  createQuestionForm: FormGroup;
  queryQuizId : String | null = null;
  question: any

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService,
    private route: Router
  ) 
  { 
    this.createQuestionForm = this.fb.group({
      question_title: ['', Validators.compose([Validators.required, Validators.minLength(5)])],

      option1: ['', Validators.required],

      option2: ['', Validators.required],

      option3: ['', Validators.required],

      option4: ['', Validators.required],

      correct: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // get quizid from url
    this.activatedRoute.paramMap.subscribe(params =>{
      this.queryQuizId = params.get('quizId');
    });

  }

  saveAndNext() {
    this.question = this.reshapeQuestion(this.createQuestionForm.value);
    console.log(this.question);
    this.quizService.createQuestion(this.question, this.queryQuizId);
    this.createQuestionForm.reset();
  }

  saveAndFinish() {
    this.quizService.createQuestion(this.question, this.queryQuizId);
    this.route.navigate(['quiz-list']);
  }

  reshapeQuestion(ques: any) {
    let answers = [];
    for(let i =0; i<4; i++) {
        let opt = `option${i+1}`;
        answers.push({
            option : ques[opt],
            correct : (ques.correct == i) ? true : false 
        });    
    }
    let question = {
        question_title: ques.question_title,
        answers: answers
    }
    return question;
  }

}
