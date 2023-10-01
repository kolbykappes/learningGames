import { Injectable } from '@angular/core';
import alphaQuestions from './alpha_questions.json';
import betaQuestions from './beta_questions.json';
import gammaQuestions from './gamma_questions.json';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  questions: any = {
    1: alphaQuestions,
    2: betaQuestions,
    3: gammaQuestions
  };

  constructor() { }

  getQuestions(level: number) {
    return this.questions[level] || [];
  }
}
