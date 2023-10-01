import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';
import Ajv from 'ajv';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  score: number = 0;
  title = 'Miss K Sentence Slam';
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
    // Validate JSON files against schema
    const ajv = new Ajv();
    const schema = {/* your JSON schema here */};
    if (!ajv.validate(schema, this.questionService.getQuestions(1)) ||
        !ajv.validate(schema, this.questionService.getQuestions(2)) ||
        !ajv.validate(schema, this.questionService.getQuestions(3))) {
      console.error("Invalid JSON files");
      return;
    }

    this.startGame(1);
  }

  startGame(level: number) {
    clearInterval(this.timer);  // Clear any existing timer
    this.currentLevel = level;
    this.currentQuestionIndex = 0;
    this.score = 0;  // Reset the score
    this.questions = this.shuffleArray(this.questionService.getQuestions(level));
    this.nextQuestion();
    this.startTimer(level);  // Start the timer based on the level
  }

  // Shuffle function to randomize questions
  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
      this.overlayMessage = "You're right! Good job!";
      this.feedbackIcons[selectedIndex] = 'check';
    } else {
      this.overlayMessage = "Sorry, that's not it";
      this.feedbackIcons[selectedIndex] = 'cancel';
    }
    this.showCorrectAnswer = true;
  }

  startTimer(level: number) {
    let timeLimit: number | null = null;
    let warningTime: number | null = null;

    if (level === 2) {
      timeLimit = 30;
      warningTime = 10;
    } else if (level === 3) {
      timeLimit = 15;
      warningTime = 5;
    }

    if (timeLimit !== null) {
      this.remainingTime = timeLimit;
      this.timer = setInterval(() => {
        this.remainingTime!--;
        if (this.remainingTime === warningTime) {
          // Trigger warning (this will activate the 'low-time' class in HTML)
        }
        if (this.remainingTime !== null && this.remainingTime <= 0) {
          clearInterval(this.timer);
          // Handle time-up scenario
        }
      }, 1000);
    } else {
      this.remainingTime = null;  // No timer for Level 1
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
