let questions = [
    {
        question:"",
        choiceA:"",
        choiceB:"",
        choiceC:"",
        correct: "",
    },

    {
        question:"",
        choiceA:"",
        choiceB:"",
        choiceC:"",
        correct: "",
    },

    {
        question:"",
        choiceA:"",
        choiceB:"",
        choiceC:"",
        correct: "",
    },

    {
        question:"",
        choiceA:"",
        choiceB:"",
        choiceC:"",
        correct: "",
    },

    {
        question:"",
        choiceA:"",
        choiceB:"",
        choiceC:"",
        correct: "",
    },

    {
        question:"",
        choiceA:"",
        choiceB:"",
        choiceC:"",
        correct: "",
    }
]

let lastQuestionIndex = question.length-1;
let runningQuestionIndex = 0;

function renderQuestions(){
    let q = question[runningQuestionIndex];
    question.innerHTML = "<p>" +q.question
}