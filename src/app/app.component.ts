import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  firstNum = 0;
  secondNum = 0;
  result = 0;
  correctAnswer = true;
  startAnswer!: number;
  finshAnswer!: number;

  questionAnswerDuration: number[] = [];
  solutionAVG = 0;
  
  ngOnInit(): void {
   this.generateRandomNums();
  }
  
  generateRandomNums() {
    this.firstNum =  Math.floor(Math.random()*10);
    this.secondNum =  Math.floor(Math.random()*10);
    this.result = this.firstNum + this.secondNum;
    this.startAnswer = new Date().getTime();
  }

  onUserAnswer(answerForm: NgForm) {
    if(answerForm.valid) {
      if(answerForm.value.answer === this.result) {
        this.correctAnswer = true;
        this.finshAnswer = new Date().getTime();
        this.questionAnswerDuration.push((this.finshAnswer - this.startAnswer)/1000)
        this.onUpdateSolutionAverage();
        answerForm.reset();
        this.generateRandomNums();
        
      }else {
        this.correctAnswer = false;
      }


    }
  }

  onUpdateSolutionAverage() {
    this.solutionAVG = 0;
    let allQuesDuration = 0;
    this.questionAnswerDuration.forEach(item => {
      allQuesDuration += item
    })
    this.solutionAVG= +(allQuesDuration / this.questionAnswerDuration.length).toFixed(2);
  }
}
