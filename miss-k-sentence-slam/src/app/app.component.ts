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
  currentLevel = 1;  // Add this line for the current level

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.startGame(this.currentLevel);
  }

  startGame(level: number) {  // Add this method to start the game
    this.currentLevel = level;
    this.questions = this.questionService.getQuestions().filter(q => q.level === level);
    this.currentQuestionIndex = 0;
    this.score = 0;
  }

  checkAnswer(selectedIndex: number, correctAnswers: number[]) {
    if (correctAnswers.includes(selectedIndex)) {
      this.score++;
    }
  }

  nextQuestion() {
    this.currentQuestionIndex++;
  }
}
