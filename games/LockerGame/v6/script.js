// Initialize game variables
let currentLevel = 1;
let currentQuestion = "";
let timerStarted = false;
let timer = 0;
let timerInterval;
let wrongAnswers = 0;
let currentColor = "red";
let levelQuestions = {
    1: ["odd", "even"],
    2: ["third", "fifth", "fourth"],
    3: ["seventh", "prime", "ninth", "sixth", "eighth"], // Added "sixth" and "eighth" options
  };
  

// Function to get query parameters from the URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Get teacher and school name from query parameters or set to default
const teacherName = getQueryParam("teacher") || "Miss K";
const schoolName = getQueryParam("school") || "PS 279";

// Function to check if a number is prime
function isPrime(num) {
  for (let i = 2; i < num; i++) if (num % i === 0) return false;
  return num !== 1;
}

// Function to generate locker elements
function generateLockers(num) {
  document.getElementById("lockers").innerHTML = "";
  let row = document.createElement("div");
  row.className = "row";
  for (let i = 1; i <= num; i++) {
    if (i % 10 === 1 && i !== 1) {
      document.getElementById("lockers").appendChild(row);
      row = document.createElement("div");
      row.className = "row";
    }
    let locker = document.createElement("div");
    locker.className = `locker ${
      currentColor === "random" ? getRandomColor() : currentColor
    }`;
    locker.id = "locker" + i;
    locker.innerHTML = i;
    locker.onclick = function () {
      toggleLocker(i);
    };
    row.appendChild(locker);
  }
  document.getElementById("lockers").appendChild(row);
  document.getElementById("lockers").style.display = "block"; // Show the lockers
  document.getElementById("checkButton").style.display = "block"; // Show the check button
}

// Function to start a new game
function newGame() {
  document.getElementById("gameHistoryOverlay").style.display = "none";
  timer = 0;
  timerStarted = false;
  wrongAnswers = 0;
  document.getElementById("time").innerText = "0";
  document.getElementById("lockers").style.display = "none";
  document.getElementById("checkButton").style.display = "none";
  document.getElementById("currentLevel").innerText = "";
  document.getElementById("overlay").style.display = "none";
}

// Function to set the game level
function setLevel(level) {
  timer = 0;
  document.getElementById("time").innerText = "0";
  document.getElementById("currentLevel").innerText = level;
  currentLevel = level;
  let numLockers = level === 1 ? 20 : level * 10;
  generateLockers(numLockers);
  pickQuestion(level);
}

// Function to get a random color
function getRandomColor() {
  let colors = ["red", "green", "blue"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Function to toggle locker open or closed
function toggleLocker(i) {
  if (!timerStarted) {
    startTimer();
  }
  let locker = document.getElementById("locker" + i);
  locker.classList.toggle("open");
  locker.classList.toggle(currentColor);
}

// Function to start the timer
function startTimer() {
  timerStarted = true;
  timerInterval = setInterval(function () {
    timer++;
    document.getElementById("time").innerText = timer;
  }, 1000);
}

// Function to pick a random question based on level
function pickQuestion(level) {
  let questions = levelQuestions[level];
  let randomIndex = Math.floor(Math.random() * questions.length);
  currentQuestion = questions[randomIndex];
  document.getElementById(
    "question"
  ).innerText = `Open all the ${currentQuestion} lockers.`;
}

// Function to check if the answer is correct
function checkAnswer() {
    let correct = true;
    let numLockers = document.querySelectorAll(".locker").length;
    for (let i = 1; i <= numLockers; i++) {
      let locker = document.getElementById("locker" + i);
      let isOpen = locker.classList.contains("open");
      if (currentQuestion === "odd" && i % 2 !== 0 && !isOpen) correct = false;
      if (currentQuestion === "even" && i % 2 === 0 && !isOpen) correct = false;
      if (currentQuestion === "third" && i % 3 === 0 && !isOpen) correct = false;
      if (currentQuestion === "fourth" && i % 4 === 0 && !isOpen) correct = false;
      if (currentQuestion === "fifth" && i % 5 === 0 && !isOpen) correct = false;
      if (currentQuestion === "sixth" && i % 6 === 0 && !isOpen) correct = false; // Add support for every 6th number
      if (currentQuestion === "seventh" && i % 7 === 0 && !isOpen) correct = false;
      if (currentQuestion === "eighth" && i % 8 === 0 && !isOpen) correct = false; // Add support for every 8th number
      if (currentQuestion === "ninth" && i % 9 === 0 && !isOpen) correct = false;
      if (currentQuestion === "prime" && isPrime(i) && !isOpen) correct = false;
    }
    if (correct) {
      // Placeholder for storing game data in local storage
      // This function will be defined in the separate reporting.js file
      storeGameData(currentLevel, currentQuestion, wrongAnswers, timer);
      document.getElementById("message").classList.remove("wrong");
      document.getElementById("overlay").style.display = "block";
    } else {
      wrongAnswers++; // Increment the error count
      document.getElementById("message").classList.add("wrong");
      document.getElementById("message").innerText = "Try again.";
    }
  }
  
// Set teacher and school name when the document is ready
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("gameHistoryOverlay").style.display = "none";
  console.log("Overlay closed.");
  document.getElementById("teacherName").innerText =
    teacherName + "'s Locker Game";
  document.getElementById("schoolName").innerText = schoolName;
  document.getElementById(
    "checkButton"
  ).innerText = `Check my work ${teacherName}!`;
});

// Start a new game initially
newGame();
