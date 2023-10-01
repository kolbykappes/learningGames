import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';

interface Question {
  level: number;
  sentence: string;
  options: string[];
  correctAnswers: number[];
  timeLimit: number | null;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  questions: Question[] = [];
  currentQuestionIndex = 0;
  score = 0;
  currentLevel = 1;
  showCorrectAnswer = false;
  remainingTime: number | null = null;
  overlayMessage: string | null = null;
  buttonsDisabled = false;
  feedbackIcons: string[] = [];

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.startGame(this.currentLevel);
  }

  startGame(level: number) {
    this.currentLevel = level;
    this.questions = this.questionService.getQuestions().filter(q => q.level === level);
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.showCorrectAnswer = false;
    this.startTimer();
  }

  startTimer() {
    if (this.questions[this.currentQuestionIndex].timeLimit) {
      this.remainingTime = this.questions[this.currentQuestionIndex].timeLimit;
      const timer = setInterval(() => {
        if (this.remainingTime! > 0) {
          this.remainingTime!--;
        } else {
          clearInterval(timer);
          this.nextQuestion();
        }
      }, 1000);
    }
  }

  checkAnswer(selectedIndex: number, correctAnswers: number[]) {
    this.buttonsDisabled = true;
    if (correctAnswers.includes(selectedIndex)) {
      this.score++;
      this.overlayMessage = "You're right!";
      this.feedbackIcons[selectedIndex] = 'check';
    } else {
      this.overlayMessage = "Sorry, that's not it";
      this.feedbackIcons[selectedIndex] = 'close';
      this.showCorrectAnswer = true;
    }
    setTimeout(() => {
      this.overlayMessage = null;
      this.nextQuestion();
    }, 2000);
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    this.showCorrectAnswer = false;
    this.buttonsDisabled = false;
    this.feedbackIcons = [];
    this.startTimer();
  }
}
