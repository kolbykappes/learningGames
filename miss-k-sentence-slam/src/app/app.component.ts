import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';

interface Question {
  level: number;
  sentence: string;
  options: (string | null)[];
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
  selectedAnswerIndex: number | null = null;
  helpClicks = 0;
  helpButtonDisabled = false;

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.startGame(this.currentLevel);
  }

  startGame(level: number) {
    this.currentLevel = level;
    this.questions = this.questionService.getQuestions(level);
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.showCorrectAnswer = false;
    this.startTimer();
    this.helpClicks = 0;
    this.helpButtonDisabled = false;
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
    this.selectedAnswerIndex = selectedIndex;
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

  helpMeMissK() {
    if (this.helpClicks < 3) {
      this.helpClicks++;
      const currentQuestion = this.questions[this.currentQuestionIndex];
      const wrongAnswers = currentQuestion.options
        .map((option, index) => index)
        .filter(index => !currentQuestion.correctAnswers.includes(index));
      const randomWrongIndex = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
      currentQuestion.options[randomWrongIndex] = null;
      if (this.helpClicks === 3 || wrongAnswers.length === 1) {
        this.helpButtonDisabled = true;
      }
    }
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    this.showCorrectAnswer = false;
    this.buttonsDisabled = false;
    this.feedbackIcons = [];
    this.selectedAnswerIndex = null;
    this.startTimer();
    this.helpClicks = 0;
    this.helpButtonDisabled = false;
  }
}