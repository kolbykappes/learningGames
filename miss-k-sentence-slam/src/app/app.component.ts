import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentLevel = 1;
  currentQuestionIndex = 0;
  questions: any[] = [];
  remainingTime: number | null = null;
  timer: any;
  overlayMessage: string | null = null;
  showCorrectAnswer = false;
  buttonsDisabled = false;
  helpButtonDisabled = false;
  feedbackIcons: string[] = [];
  helpClicks = 0;

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.startGame(1);
  }

  startGame(level: number) {
    clearInterval(this.timer);
    this.currentLevel = level;
    this.currentQuestionIndex = 0;
    this.questions = this.questionService.getQuestions(level);
    this.nextQuestion();
  }

  nextQuestion() {
    clearInterval(this.timer);
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.overlayMessage = null;
      this.showCorrectAnswer = false;
      this.buttonsDisabled = false;
      this.helpButtonDisabled = false;
      this.feedbackIcons = [];
      this.helpClicks = 0;
      this.startTimer(this.questions[this.currentQuestionIndex].timeLimit);
    } else {
      this.overlayMessage = 'Game Over';
    }
  }

  checkAnswer(selectedIndex: number, correctAnswers: number[]) {
    this.buttonsDisabled = true;
    clearInterval(this.timer);  // Stop the timer
    if (correctAnswers.includes(selectedIndex)) {
      this.overlayMessage = "You're right!";
      this.feedbackIcons[selectedIndex] = 'check';
    } else {
      this.overlayMessage = "Sorry, that's not it";
      this.feedbackIcons[selectedIndex] = 'cancel';
    }
    this.showCorrectAnswer = true;
  }

  startTimer(timeLimit: number | null) {
    clearInterval(this.timer);
    if (timeLimit) {
      this.remainingTime = timeLimit;
      this.timer = setInterval(() => {
        if (this.remainingTime !== null) { // Add this null check
          this.remainingTime--;
          if (this.remainingTime <= 0) {
            clearInterval(this.timer);
            this.overlayMessage = 'Out of Time';
            this.showCorrectAnswer = true;
          }
          if (this.remainingTime <= 5) {
            // Change timer to red
          }
        }
      }, 1000);
    }
  }

  helpMeMissK() {
    if (this.helpClicks < 3) {
      this.helpClicks++;
      const currentQuestion = this.questions[this.currentQuestionIndex];
      const wrongAnswers = currentQuestion.options
        .map((option: string, index: number) => ({ option, index }))
        .filter(({ index }: { index: number }) => !currentQuestion.correctAnswers.includes(index) && currentQuestion.options[index] !== null);
  
      const randomWrongIndex = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)].index;
      currentQuestion.options[randomWrongIndex] = null;
  
      if (this.helpClicks === 3 || wrongAnswers.length === 1) {
        this.helpButtonDisabled = true;
      }
    }
  }
}
