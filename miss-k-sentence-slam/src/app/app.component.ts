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
  showCorrectAnswer = false;  // New property to control the display of the correct answer

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.startGame(this.currentLevel);
  }

  startGame(level: number) {
    this.currentLevel = level;
    this.questions = this.questionService.getQuestions().filter(q => q.level === level);
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.showCorrectAnswer = false;  // Reset for a new game
  }

  checkAnswer(selectedIndex: number, correctAnswers: number[]) {
    if (correctAnswers.includes(selectedIndex)) {
      this.score++;
      this.showCorrectAnswer = false;  // Hide the correct answer
      this.nextQuestion();
    } else {
      this.showCorrectAnswer = true;  // Show the correct answer
    }
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    this.showCorrectAnswer = false;  // Hide the correct answer for the next question
  }
}
