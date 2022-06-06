var main = document.querySelector("#main");
var startQuizButton = document.querySelector("#start-quiz");
var displayTimer = document.querySelector("#display-timer");
var welcome = document.querySelector("#welcome")
var viewHighscoresButton = document.querySelector("#highscores")

var timerCount = 100;
var questionNumber = 0;
var clearTimerCount = false;
var isWin = false;

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
    question: "Commonly used data types DO NOT inlude:",
    variants: [
      "string",
      "boolean",
      "alerts",
      "number"
    ],
    answer: "alerts"
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    variants: [
      "JavaScript",
      "terminal/bash",
      "for loops",
      "console.log"
    ],
    answer: "console.log"
  },
  {
    question: "Strig values must be enclosed within ____ when beuing assigned to variables.",
    variants: [
      "commas",
      "curly brackets",
      "quotes",
      "parantheses"
    ],
    answer: "quotes"
  },
  {
    question: "The condition in an if / else statement is enclosed within ____.",
    variants: [
      "quotes",
      "curly brackets",
      "square brackets",
      "parantheses"
    ],
    answer: "parantheses"
  },
]

displayTimer.innerHTML = timerCount;

function viewHighscores() {
  // clear dom
  main.innerHTML = "";
  // create elements
  var highScores = document.createElement("section");
  var scoresLabel = document.createElement("label");
  var table = document.createElement("ul");
  var buttonsDiv = document.createElement("div")
  var clearHighsocres = document.createElement("button");
  var goBack = document.createElement("button");
  // get items from store
  var storedInitials = JSON.parse(localStorage.getItem("initials"));
  var storedScores = JSON.parse(localStorage.getItem("scores"));


  goBack.textContent = "Go Back";
  clearHighsocres.textContent = "Clear Highscores";

  scoresLabel.setAttribute("class", "scores-label")
  buttonsDiv.setAttribute("class", "button-div")
  buttonsDiv.append(goBack, clearHighsocres)

  goBack.addEventListener("click", function () {
    location.reload()
  })

  clearHighsocres.addEventListener("click", function () {
    localStorage.clear();
  })

  if (storedInitials) {
    for (i = 0; i < storedInitials.length; i++) {
      var tableItem = document.createElement("li");
      var initialsDiv = document.createElement("div");
      var scoresDiv = document.createElement("div");

      // add classes
      tableItem.setAttribute("class", "table-row")

      initialsDiv.textContent = storedInitials[i]
      scoresDiv.textContent = storedScores[i]


      tableItem.append(initialsDiv, scoresDiv)
      table.append(tableItem)
    }
  }
  scoresLabel.textContent = "Highscores"
  highScores.setAttribute("class", "highscores-label")
  highScores.append(scoresLabel, table, buttonsDiv)
  main.append(highScores)
}

function submitScores(initials, score) {
  if (localStorage.getItem("initials")) {
    var storedInitials = JSON.parse(localStorage.getItem("initials"))
    var storedScores = JSON.parse(localStorage.getItem("scores"))

    storedInitials.push(initials)
    storedScores.push(score)

    localStorage.setItem("initials", JSON.stringify(storedInitials));
    localStorage.setItem("scores", JSON.stringify(storedScores));
  } else {
    var storedInitials = [];
    var storedScores = [];

    storedInitials.push(initials)
    storedScores.push(score)

    localStorage.setItem("initials", JSON.stringify(storedInitials));
    localStorage.setItem("scores", JSON.stringify(storedScores));
  }
  viewHighscores()
}

function endQuiz() {
  var highScores = document.createElement("form");
  var h2Element = document.createElement("h2");
  var finalScore = document.createElement("span")
  var initialsInput = document.createElement("input");
  var submitButton = document.createElement("button");
  var score = timerCount;
  timerCount = 101;
  clearTimerCount = true;
  finalScore.innerHTML = `Your final score is: ${score}`

  h2Element.setAttribute("class", "all-done")
  h2Element.textContent = "All done!"
  submitButton.setAttribute("type", "submit");
  submitButton.textContent = "SUBMIT";
  initialsInput.setAttribute("class", "form__field")
  initialsInput.setAttribute("placeholder", "Enter initials")

  submitButton.addEventListener("click", function (event) {
    event.preventDefault()
    submitScores(initialsInput.value, score)
  })

  highScores.setAttribute("class", "fina-score")


  initialsInput.setAttribute("type", "text")
  highScores.append(h2Element, finalScore, initialsInput, submitButton)
  main.append(highScores)
}


function displayQuestions() {
  var questionDisplayed = document.createElement("section");
  var questionHeader = document.createElement("h2");
  var orderedList = document.createElement("ol");

  questionDisplayed.setAttribute("class", "question")
  if (questionNumber === questions.length) {
    isWin = true;
    return endQuiz()
  }
  for (i = 0; i < questions[questionNumber].variants.length; i++) {
    questionHeader.innerHTML = questions[questionNumber].question
    newVariant = document.createElement("li");
    newVariant.innerHTML = questions[questionNumber].variants[i];
    newVariant.setAttribute("id", "variant")
    newVariant.setAttribute("value", questions[questionNumber].variants[i])
    newVariant.setAttribute("class", "items-body-content")

    newVariant.addEventListener("click", function (event) {
      var allLi = document.getElementsByTagName("li");

      if (event.target.getAttribute("value") === questions[questionNumber].answer) {
        questionNumber++;
        event.target.style.backgroundColor = "#3bedb7"
        for (i = 0; i < allLi.length; i++) {
          allLi[i].style.pointerEvents = "none";
        }
        setTimeout(() => {
          questionDisplayed.remove();

          displayQuestions();
        }, 1000)

      } else {
        for (i = 0; i < allLi.length; i++) {
          allLi[i].style.pointerEvents = "none";
        }
        timerCount -= 10;
        questionNumber++;
        event.target.style.backgroundColor = "#f5625d";

        setTimeout(() => {
          questionDisplayed.remove();
          displayQuestions();
        }, 1000)
      }
    })
    orderedList.append(newVariant)
  }

  questionDisplayed.append(questionHeader, orderedList)
  main.append(questionDisplayed)
};

function gameOver() {
  main.innerHTML = "";
  var gameOverText = document.createElement("h1")
  var goBack = document.createElement("button");

  gameOverText.textContent = "Sorry, time's up!"
  goBack.textContent = "Go Back";

  goBack.addEventListener("click", function () {
    location.reload()
  })

  main.append(gameOverText, goBack)
}
// Start quiz function
function startQuiz() {
  // Hids welcome section
  welcome.remove();
  // Call display questions function
  displayQuestions();

  // Timer function
  var timerInterval = setInterval(function () {
    timerCount--;
    displayTimer.innerHTML = timerCount;
    if (timerCount === 0 || clearTimerCount) {
      clearInterval(timerInterval);
      if (isWin === false) {
        gameOver()
      }
    }
  }, 1000);

};

startQuizButton.addEventListener("click", startQuiz)
viewHighscoresButton.addEventListener("click", viewHighscores)