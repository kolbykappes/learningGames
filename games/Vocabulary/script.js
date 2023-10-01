let vocabulary = [];
let currentQuestion = {};
let score = 0;
let turns = 0;

function setLevel(level) {
  vocabulary = words[`Level ${level}`];
  document.getElementById('end-of-game').classList.add('hidden');
  document.getElementById('question-area').classList.remove('hidden');
  document.getElementById('options-box').classList.remove('hidden'); // Show the options-box
  turns = 0;
  score = 0;
  nextQuestion();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function nextQuestion() {
    document.getElementById('help-button').classList.remove('hidden'); // Show the help button
  
    if (turns >= 10) {
      let message = "Your score: " + score + "/10. ";
      message += score >= 9 ? "Great job!" : score >= 7 ? "Good job!" : "You'll do better next time";
      document.getElementById('end-of-game-message').innerText = message;
      document.getElementById('end-of-game').classList.remove('hidden');
      document.getElementById('question-area').classList.add('hidden');
      document.getElementById('options-box').classList.add('hidden'); // Hide the options-box
      document.getElementById('help-button').classList.add('hidden'); // Hide the help button
      return;
    }
  
    let flipMode = Math.random() < 0.5;
    let questionIndex = flipMode ? 0 : 1;
    let optionIndex = flipMode ? 1 : 0;
  
    document.getElementById('score').innerText = score + "/" + turns;
    document.getElementById('question-label').innerText = "Question #" + (turns + 1);
  
    currentQuestion = vocabulary[Math.floor(Math.random() * vocabulary.length)];
    let options = vocabulary.slice();
    shuffleArray(options);
    options = options.filter(opt => opt[questionIndex] !== currentQuestion[questionIndex]).slice(0, 3);
    options.push(currentQuestion);
    shuffleArray(options);
  
    let questionElement = document.getElementById('question');
    let optionsElement = document.getElementById('options');
    questionElement.innerText = currentQuestion[questionIndex];
    optionsElement.innerHTML = '';
  
    options.forEach(option => {
      const button = document.createElement('button');
      button.className = 'option';
      button.innerText = option[optionIndex];
      if (option[questionIndex] === currentQuestion[questionIndex]) {
        button.className += ' correct';
      }
      button.addEventListener('click', () => {
        checkAnswer(option[questionIndex] === currentQuestion[questionIndex]);
      });
      optionsElement.appendChild(button);
    });
  
    turns++; // Increment the turn count after a question is generated
  }

function checkAnswer(correct) {
  if (correct) {
    score++;
    nextQuestion();
  } else {
    nextQuestion();
  }
}

function helpMe() {
  let incorrectOptions = Array.from(document.querySelectorAll('.option')).filter(button => !button.classList.contains('correct'));
  shuffleArray(incorrectOptions);
  let toRemove = incorrectOptions.slice(0, 2);
  toRemove.forEach(button => button.remove());
}

window.onload = () => setLevel(1);
