import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  questions = [
    {
      level: 1,
      sentence: 'The cat are big',
      options: ['The cat is big', 'The cats are big', 'The cat are big', 'The cat big is'],
      correctAnswers: [0, 1],
      timeLimit: null
    },
    {
      level: 1,
      sentence: 'She play soccer',
      options: ['She plays soccer', 'She play soccer', 'She playing soccer', 'She is play soccer'],
      correctAnswers: [0],
      timeLimit: null
    },
    {
      level: 2,
      sentence: 'They runs fast',
      options: ['They run fast', 'They runs fast', 'They ran fast', 'They is running fast'],
      correctAnswers: [0],
      timeLimit: 30
    },
    {
      level: 2,
      sentence: 'He have a car',
      options: ['He has a car', 'He have a car', 'He having a car', 'He is have a car'],
      correctAnswers: [0],
      timeLimit: 30
    },
    {
      level: 3,
      sentence: 'She dont likes apples',
      options: ['She doesn\'t like apples', 'She dont likes apples', 'She doesn\'t likes apples', 'She dont like apples'],
      correctAnswers: [0],
      timeLimit: 15
    },
    {
      level: 3,
      sentence: 'They was here',
      options: ['They were here', 'They was here', 'They are here', 'They is here'],
      correctAnswers: [0],
      timeLimit: 15
    }
  ];

  constructor() { }

  getQuestions() {
    return this.questions;
  }
}
