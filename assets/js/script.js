var main = document.querySelector("#main");
var startQuizButton = document.querySelector("#start-quiz");
var displayTimer = document.querySelector("#display-timer");
var welcome = document.querySelector("#welcome")

var timerCount = 2;
var questionNumber = 0;

// Qestions data in variable
var questions = [
  {
    question: "Arrays in JavaScript can be used to store ______.",
    variants: [
      "Numbers and Strings",
      "Other Arrays",
      "Booleans",
      "All of the above"
    ],
    answer: "All of the above"
  },
  {
    question: "Arrays in JavaScript can be used to store ______.",
    variants: [
      "Numbers and Strings",
      "Other Arrays",
      "Booleans",
      "All of the above"
    ],
    answer: "All of the above"
  },
]

displayTimer.innerHTML = timerCount;

function displayQuestions() {
  var questionDisplayed = document.createElement("section");
  var questionHeader = document.createElement("h2");
  var orderedList = document.createElement("ol");

  questionHeader.innerHTML = questions[questionNumber].question
  for (i = 0; i < questions[questionNumber].variants.length; i++) {
    newVariant = document.createElement("li");
    newVariant.innerHTML = questions[questionNumber].variants[i];

    orderedList.append(newVariant)
  }

  questionDisplayed.append(questionHeader, orderedList)
  main.append(questionDisplayed)
};

// Start quiz function
function startQuiz() {
  console.log("started");
  // Hids welcome section
  welcome.style.display = "none";
  // Call display questions function
  displayQuestions();

  // Timer function
  var timerInterval = setInterval(function () {
    timerCount--;
    displayTimer.innerHTML = timerCount;
    if (timerCount === 0) {
      clearInterval(timerInterval);
      console.log("ended")
    }
  }, 1000);

};

startQuizButton.addEventListener("click", startQuiz)