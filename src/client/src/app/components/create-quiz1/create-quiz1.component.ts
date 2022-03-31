import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-quiz1',
  templateUrl: './create-quiz1.component.html',
  styleUrls: ['./create-quiz1.component.scss']
})
export class CreateQuiz1Component implements OnInit {
  createQuizForm: FormGroup;
  
  constructor(
    private fb: FormBuilder
  ) 
  { 
    this.createQuizForm = this.fb.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    })
  }

  ngOnInit(): void {
  }

}
