let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;

// DOM Elements
const quizContainer = document.getElementById("quiz-container");
const scoreContainer = document.getElementById("score-container");
const leaderboard = document.getElementById("leaderboard");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");
const timeLeftElement = document.getElementById("time-left");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const retryBtn = document.getElementById("retry-btn");
const finalScoreElement = document.getElementById("final-score");
const leaderboardList = document.getElementById("leaderboard-list");
const progressBar = document.getElementById("progress-bar");
const progressBarContainer = document.getElementById("progress-bar-container");
const themeToggle = document.getElementById("theme-toggle");
const darkModeStyle = document.getElementById("dark-mode-style");
const startQuizBtn = document.getElementById("start-quiz-btn");

// Fetch Questions from API
async function fetchQuestions() {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=10&type=multiple"
  );
  const data = await response.json();
  questions = data.results.map((q) => ({
    question: q.question,
    options: [...q.incorrect_answers, q.correct_answer].sort(
      () => Math.random() - 0.5
    ),
    answer: q.correct_answer,
  }));
}

// Start Quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 30;
  quizContainer.classList.remove("d-none");
  scoreContainer.classList.add("d-none");
  leaderboard.classList.add("d-none");
  progressBarContainer.classList.remove("d-none");
  showQuestion();
  startTimer();
  updateProgressBar();
}

// Show Question
function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = "";
  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("btn", "btn-outline-primary", "fade-in");
    button.addEventListener("click", () => selectAnswer(option));
    optionsElement.appendChild(button);
  });
  updateNavigation();
}

// Select Answer
function selectAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedOption === currentQuestion.answer) {
    feedbackElement.textContent = "Correct!";
    feedbackElement.className = "correct";
    score++;
  } else {
    feedbackElement.textContent = `Wrong! Correct answer: ${currentQuestion.answer}`;
    feedbackElement.className = "wrong";
  }
  disableOptions();
}

// Disable Options After Selection
function disableOptions() {
  const buttons = optionsElement.querySelectorAll("button");
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

// Update Navigation Buttons
function updateNavigation() {
  prevBtn.disabled = currentQuestionIndex === 0;
  nextBtn.disabled = currentQuestionIndex === questions.length - 1;
}

// Next Question
nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
    feedbackElement.textContent = "";
    updateProgressBar();
  } else {
    endQuiz();
  }
});

// Previous Question
prevBtn.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
    feedbackElement.textContent = "";
    updateProgressBar();
  }
});

// Start Timer
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeLeftElement.textContent = timeLeft;
    if (timeLeft === 0) {
      endQuiz();
    }
  }, 1000);
}

// Update Progress Bar
function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

// End Quiz
function endQuiz() {
  clearInterval(timer);
  quizContainer.classList.add("d-none");
  scoreContainer.classList.remove("d-none");
  finalScoreElement.textContent = `${score} / ${questions.length}`;
  updateLeaderboard();
  leaderboard.classList.remove("d-none");
}

// Update Leaderboard
function updateLeaderboard() {
  const leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboardData.push(score);
  leaderboardData.sort((a, b) => b - a);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboardData));
  leaderboardList.innerHTML = "";
  leaderboardData.slice(0, 5).forEach((score, index) => {
    const li = document.createElement("li");
    li.textContent = `#${index + 1}: ${score}`;
    li.classList.add("list-group-item");
    leaderboardList.appendChild(li);
  });
}

// Retry Quiz
retryBtn.addEventListener("click", () => {
  fetchQuestions().then(startQuiz);
});

// Dark Mode Toggle
themeToggle.addEventListener("click", () => {
  const isDarkMode = darkModeStyle.disabled;
  darkModeStyle.disabled = !isDarkMode;
  themeToggle.textContent = isDarkMode ? "☀️" : "🌙";
  localStorage.setItem("darkMode", !isDarkMode);
});

// Check Dark Mode Preference
if (localStorage.getItem("darkMode") === "true") {
  darkModeStyle.disabled = false;
  themeToggle.textContent = "☀️";
} else {
  themeToggle.textContent = "🌙";
}

// Start Quiz Button
startQuizBtn.addEventListener("click", () => {
  fetchQuestions().then(startQuiz);
  startQuizBtn.classList.add("d-none");
});
