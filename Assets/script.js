
var questions = [
    {
        question: "Question 1 : String values must be enclosed within _____ when being assigned to variables.",
        choices: ["quotes", "curly brackets", "commas", "parenthesis"],
        correct: "a",
    },

    {
        question: "Question 2 : Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "numbers", "alerts"],
        correct: "d",
    },

    {
        question: "Question 3 : How do you create a function in JavaScript",
        choices: ["function = myFunction()", "function myFunction()", "function:myFunction()", "create(function)"],
        correct: "b",
    },

    {
        question: "Question 4 : How do you call a function named myFunction?",
        choices: ["myFunction()", "function = myFunction()", "call function myFunction", "call myFunction()"],
        correct: "a",
    },

    {
        question: "Question 5 : The first index of an array is _____.",
        choices: ["0", "1", "10", "any"],
        correct: "a",
    },

    {
        question: "Question 6 : To see if two variables are equal in an if / else statement you would use ____.",
        choices: ["equals", "=", "==", "!="],
        correct: "c",
    },

    {
        question: "Question 7 : How do you write an IF statement in JavaScript?",
        choices: ["if i == 5 then", "if i = 5 then", "if (i == 5)", "if i = 5"],
        correct: "c",
    },

    {
        question:"Questions 8 : Which event occurs when the user clicks on an HTML element?",
        choices: ["onClick", "onChange", "onMouseOver", "onMouseClick"],
        correct: "a",
    },
]

var timeLeft = document.getElementById('timer')
var secondsLeft = 60
var questionNumber = 0
var totalScore = 0
var questionCount = 1

function countdown() {
    var timeInterval = setInterval(function() {
        secondsLeft--;
        timeLeft.textContent = "Time left: " + secondsLeft + 's'
        
        if (secondsLeft <= 0) {
            clearInterval(timeInterval)
            timeLeft.textContent = "Time is up!"
            finish.textContent = "Time is up!"
            gameOver()
        } else if (questionCount >= questions.length +1) {
            clearInterval(timeInterval)
            gameOver()
        }
    }, 1000)
}

var intro = document.getElementById('intro')
var questionPage = document.getElementById('question_page')
var questionNumber = [0]
//start the quiz
function startQuiz() {
    intro.style.display = 'none'
    questionPage.style.display = 'block'
    countdown()
    showQuestion(questionNumber)
}

var askQuestion = document.getElementById('ask_question')
var answerA = document.getElementById('answerA')
var answerB = document.getElementById('answerB')
var answerC = document.getElementById('answerC')
var answerD = document.getElementById('answerD')
//show the questions
function showQuestion(n) {
    askQuestion.textContent = questions[n].question
    answerA.textContent = questions[n].choices[0]
    answerB.textContent = questions[n].choices[1]
    answerC.textContent = questions[n].choices[2]
    answerD.textContent = questions[n].choices[3]
    questionNumber = n
}

var checkLine = document.getElementById("check_line")
//choose an answer
function selectAnswer(event) {
    event.preventDefault()

    checkLine.style.display = 'block'
    setTimeout(function() {
        checkLine.style.display = 'none'
    }, 1000)

    if (questions[questionNumber].correct == event.target.value) {
        checkLine.textContent = "Correct!"
        totalScore = totalScore + 1
    } else {
        secondsLeft = secondsLeft -10
        checkLine.textContent = "Wrong! The correct answer is " + questions[questionNumber].correct + ' .'
    }

    if (questionNumber < questions.length -1) {
        showQuestion(questionNumber +1)
    }else {
        gameOver()
    }
    questionCount++
}

var submit = document.getElementById('submit_page')
//end the game and display the final score
function gameOver() {
    questionPage.style.display = 'none'
    submit.style.display = 'block'
    finalScore.textContent = "Your final score is " + totalScore
    timeLeft.style.display = 'none'
}

function getScore() {
    var currentList = localStorage.getItem("ScoreList")
    if (currentList !== null) {
        freshList = Json.parse(currentList)
        return freshList
    } else {
        freshList = []
    }
    return freshList
}

var highScorePage = document.getElementById('highscore_page')
var highScore = document.getElementById('high_score')
function renderScore() {
    highScore.innerHTML = ""
    highScore.style.display = 'block'
    var highScores = sort()

    var topFive = highScores.slice(0,5)
    for (var i =0; i< topFive.length; i++) {
        var item = topFive[i]
    
        var li = document.createElement("li")
        li.textContent = item.user + " - " + item.score
        li.setAttribute("data-index", i)
        highScore.appendChild(li)
    }
}

function addItem (n) {
    var addedList = getScore()
    addedList.push(n)
    localStorage.setItem("ScoreList", JSON.stringify(addedList))
}

function saveScore () {
    var scoreItem = {
        user: initials.value,
        score: totalScore
    }
    addItem(scoreItem)
    renderScore()
}

var startBtn = document.getElementById('startBtn')
var choiceBtn = document.querySelector('.choices')
var submitBtn = document.getElementById('submit_btn')
var scoreCheck = document.getElementById('score')
var backBtn = document.getElementById('back_btn')
var clearBtn = document.getElementById('clear_btn')

startBtn.addEventListener('click', startQuiz)

choiceBtn.addEventListener('click', selectAnswer)

submitBtn.addEventListener("click", function (event) {
    event.preventDefault()
    submit.style.display = 'none'
    intro.style.display = 'none'
    highScorePage.style.display = 'block'
    questionPage.style.display = 'none'
    saveScore()
})

scoreCheck.addEventListener('click', function (event) {
    event.preventDefault()
    submit.style.display = 'none'
    intro.style.display = 'none'
    highScorePage.style.display = 'block'
    questionPage.style.display = 'none'
    renderScore()
})

backBtn.addEventListener('click', function (event) {
    event.preventDefault()
    submit.style.display = 'none'
    intro.style.display = 'none'
    highScorePage.style.display = 'block'
    questionPage.style.display = 'none'
    location.reload()
})

clearBtn.addEventListener('click', function (event) {
    event.preventDefault()
    localStorage.clear()
    renderScore()
})