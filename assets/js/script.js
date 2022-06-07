// grab elements from DOM
var main = document.querySelector("#main");
var startQuizButton = document.querySelector("#start-quiz");
var displayTimer = document.querySelector("#display-timer");
var welcome = document.querySelector("#welcome")
var viewHighscoresButton = document.querySelector("#highscores")

// create variables
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
    question: "String values must be enclosed within ____ when being assigned to variables.",
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

  // Join two arrays
  var list = [];
  for (var j = 0; j < storedInitials.length; j++) {
    list.push({ 'initials': storedInitials[j], 'scores': storedScores[j] });
  }

  // Sort two arrays based on score
  list.sort(function (a, b) {
    return ((b.scores < a.scores) ? -1 : ((b.scores == a.scores) ? 0 : 1));
  });

  // Separate objects back to two arrays 
  for (var k = 0; k < list.length; k++) {
    storedInitials[k] = list[k].initials;
    storedScores[k] = list[k].scores;
  }

  // add text to buttons
  goBack.textContent = "Go Back";
  clearHighsocres.textContent = "Clear Highscores";

  // add classes to buttons
  scoresLabel.setAttribute("class", "scores-label")
  buttonsDiv.setAttribute("class", "button-div")
  // append to parent div
  buttonsDiv.append(goBack, clearHighsocres)

  // add event listener to a button on click to navigate to main page
  goBack.addEventListener("click", function () {
    location.reload()
  })

  // add event listener to a button on click to navigate to clear high scores
  clearHighsocres.addEventListener("click", function () {
    localStorage.clear();
  })

  // run following lines of code if store has scores
  if (storedInitials) {
    // loop through array and create list items
    for (i = 0; i < storedInitials.length; i++) {
      var tableItem = document.createElement("li");
      var initialsDiv = document.createElement("div");
      var scoresDiv = document.createElement("div");

      // add classes
      tableItem.setAttribute("class", "table-row")

      // get scores from array and set it to list items
      initialsDiv.textContent = storedInitials[i]
      scoresDiv.textContent = storedScores[i]

      //append scores to table 
      tableItem.append(initialsDiv, scoresDiv)
      table.append(tableItem)
    }
  }
  // append table to main to DOM
  scoresLabel.textContent = "High Scores"
  highScores.setAttribute("class", "highscores-label")
  highScores.append(scoresLabel, table, buttonsDiv)
  main.append(highScores)
}

// function when user submits initials and scores
function submitScores(initials, score) {

  // grab arrays from local storage or create an empty string
  var storedInitials = JSON.parse(localStorage.getItem("initials")) || [];
  var storedScores = JSON.parse(localStorage.getItem("scores")) || [];

  // and push new scores to grabbed arrays
  storedInitials.push(initials)
  storedScores.push(score)

  // save updated arrays back to local storage
  localStorage.setItem("initials", JSON.stringify(storedInitials));
  localStorage.setItem("scores", JSON.stringify(storedScores));
  viewHighscores()
}

function endQuiz() {
  // create elements
  var highScores = document.createElement("form");
  var h2Element = document.createElement("h2");
  var finalScore = document.createElement("span")
  var initialsInput = document.createElement("input");
  var submitButton = document.createElement("button");
  var score = timerCount;
  // set timer back to 100
  timerCount = 101;
  // update variable 
  clearTimerCount = true;
  // display final score
  finalScore.innerHTML = `Your final score is: ${score}`

  // add text and styles to elements
  h2Element.setAttribute("class", "all-done")
  h2Element.textContent = "All done!"
  submitButton.setAttribute("type", "submit");
  submitButton.textContent = "SUBMIT";
  initialsInput.setAttribute("class", "form__field")
  initialsInput.setAttribute("placeholder", "Enter initials")

  // add event listenenr that calls submit scores function
  submitButton.addEventListener("click", function (event) {
    event.preventDefault()
    submitScores(initialsInput.value, score)
  })

  // add styles and append elements to DOM
  highScores.setAttribute("class", "fina-score")
  initialsInput.setAttribute("type", "text")
  highScores.append(h2Element, finalScore, initialsInput, submitButton)
  main.append(highScores)
}

// create function that displays questionarie
function displayQuestions() {
  // create elements
  var questionDisplayed = document.createElement("section");
  var questionHeader = document.createElement("h2");
  var orderedList = document.createElement("ol");

  // add class to question
  questionDisplayed.setAttribute("class", "question")

  // exit function if no questions left
  if (questionNumber === questions.length) {
    isWin = true;
    return endQuiz()
  }
  // loop through questions array of objects and display them on screen
  for (i = 0; i < questions[questionNumber].variants.length; i++) {
    // create elements and set their attributes
    questionHeader.innerHTML = questions[questionNumber].question
    newVariant = document.createElement("li");
    newVariant.innerHTML = questions[questionNumber].variants[i];
    newVariant.setAttribute("id", "variant")
    newVariant.setAttribute("value", questions[questionNumber].variants[i])
    newVariant.setAttribute("class", "items-body-content")

    // add event listener when any of the variant clicked
    newVariant.addEventListener("click", function (event) {
      var allLi = document.getElementsByTagName("li");

      // if clicked variant is correct run following lines of code
      if (event.target.getAttribute("value") === questions[questionNumber].answer) {
        // increment question number to displat next question
        questionNumber++;
        // add style to indicate that answer was correct
        event.target.style.backgroundColor = "#3bedb7"
        // disable other variant so user can't click on it
        for (i = 0; i < allLi.length; i++) {
          allLi[i].style.pointerEvents = "none";
        }
        // create a timeout to hold the question for another second
        setTimeout(() => {
          // remove currentyle displayed question
          questionDisplayed.remove();
          // call this function again with updated question number
          displayQuestions();
        }, 1000)
        // if clicked variant is incorrect run following lines of code
      } else {
        // disable other variant so user can't click on it
        for (i = 0; i < allLi.length; i++) {
          allLi[i].style.pointerEvents = "none";
        }
        // subtract 10 seconds from timer
        timerCount -= 10;
        // increment question number to displat next question
        questionNumber++;
        // add style to indicate that answer was incorrect
        event.target.style.backgroundColor = "#f5625d";
        // create a timeout to hold the question for another second
        setTimeout(() => {
          // remove currentyle displayed question
          questionDisplayed.remove();
          // call this function again with updated question number
          displayQuestions();
        }, 1000)
      }
    })
    // add variants to ordered list
    orderedList.append(newVariant)
  }

  // add question header and ordered list to DOM
  questionDisplayed.append(questionHeader, orderedList)
  main.append(questionDisplayed)
};

// if time runs out display game over message
function gameOver() {
  // remove all elements from main
  main.innerHTML = "";
  // create new elements 
  var gameOverText = document.createElement("h1")
  var goBack = document.createElement("button");

  // add text
  gameOverText.textContent = "Sorry, time's up!"
  goBack.textContent = "Go Back";

  // add event listener that navigates back to home page
  goBack.addEventListener("click", function () {
    location.reload()
  })

  // add text and button to DOM
  main.append(gameOverText, goBack)
}
// Start quiz function
function startQuiz() {
  // Hids welcome section
  welcome.remove();
  viewHighscoresButton.disabled = true;
  // Call display questions function
  displayQuestions();

  // Timer function
  var timerInterval = setInterval(function () {
    timerCount--;
    displayTimer.innerHTML = timerCount;
    if (timerCount === 0 || clearTimerCount) {
      clearInterval(timerInterval);
      if (isWin === false) {
        // call this function if user hasn't answered to all question
        gameOver()
      }
    }
  }, 1000);

};

// add event listeners to start and view high scores
startQuizButton.addEventListener("click", startQuiz)
viewHighscoresButton.addEventListener("click", viewHighscores)