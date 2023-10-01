let currentQuestionIndex = 0;
let score = 0;

// Load questions from questions.json
const questions = [
  // Copy the content from questions.json here
];

// Initialize variables
const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  showQuestion(questions[currentQuestionIndex]);
});

// Show first question
showQuestion(questions[currentQuestionIndex]);

// Function to show a question
function showQuestion(question) {
  questionContainer.innerText = question.sentence;
  answerButtons.innerHTML = '';
  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.innerText = option;
    button.classList.add('btn');
    button.addEventListener('click', () => checkAnswer(index, question.correctAnswers));
    answerButtons.appendChild(button);
  });
}

// Function to check the answer
function checkAnswer(selectedIndex, correctAnswers) {
  if (correctAnswers.includes(selectedIndex)) {
    score++;
    document.querySelectorAll('.btn')[selectedIndex].classList.add('correct');
  }
}

// Function to end the game
function endGame() {
  alert(`Game over! Your score is ${score}`);
}
