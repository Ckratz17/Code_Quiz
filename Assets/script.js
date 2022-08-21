var welcome = document.getElementById('welcome')
var highScorePage = document.getElementById('high_score_page')
var startBtn = document.getElementById('startBtn')
var intro = document.getElementById('intro')
var questionPage = document.getElementById('question_page')
var askQuestion = document.getElementById('ask-question')
var choiceBtn = document.getElementById('choices')
var answerA = document.getElementById('answer_btn1')
var answerB = document.getElementById('answer_btn2')
var answerC = document.getElementById('answer_btn3')
var answerD = document.getElementById('answer_btn4')
var checkLine = document.getElementById('check_line')
var submit = document.getElementById('submit_page')
var finalScore = document.getElementById('final_score')
var intials = document.getElementById('initials')
var submitBtn = document.getElementById('submit_btn')
var highScore = document.getElementById('high_score')
var scoreCheck = document.getElementById('score')
var finish = document.getElementById('finish')
var backBtn = document.getElementById('back_btn')
var clearBtn = document.getElementById('clear_btn')

var questions = [
    {
        question:"",
        choices: [],
        correct: "",
    },

    {
        question:"",
        choices: [],
        correct: "",
    },

    {
        question:"",
        choices: [],
        correct: "",
    },

    {
        question:"",
        choices: [],
        correct: "",
    },

    {
        question:"",
        choices: [],
        correct: "",
    },

    {
        question:"",
        choices: [],
        correct: "",
    },

    {
        question:"",
        choices: [],
        correct: "",
    },

    {
        question:"",
        choices: [],
        correct: "",
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
//start the quiz
function startQuiz() {
    intro.style.display = 'none'
    questionPage.style.display = 'block'
    questionNumber = 0
    countdown()
}

startBtn.addEventListener('click', startQuiz)

//show the questions
function showQuestion() {
    askQuestion.textContent = questions[n].question
    answerA.textContent = questions[n].choices[0]
    answerB.textContent = questions[n].choices[1]
    answerC.textContent = questions[n].choices[2]
    answerD.textContent = questions[n].choices[3]
    questionNumber = n
}

//choose an answer
function selectAnswer(event) {
    event.preventDefault()

    checkLine.style.display = 'block'
    setTimeout(function() {
        checkLine.style.display = 'none'
    }, 1000)

    if (questions[questionNumber].answer == event.target.value) {
        checkLine.textContent = "Correct!"
        totalScore = totalScore + 1
    } else {
        checkLine.textContent = "Wrong! The correct answer is " + questions[questionNumber].correct + ' .'
    }

    if (questionNumber < questions.length -1) {
        showQuestion(questionNumber +1)
    }else {
        gameOver()
    }
    questionCount++
}

choiceBtn.forEach(function(click) {
    click.addEventListener('click', selectAnswer)
})

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

