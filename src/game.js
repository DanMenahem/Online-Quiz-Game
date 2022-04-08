const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
const timerText = document.getElementById("timer");
const lifeText = document.getElementById("life");
const difficulty = localStorage.getItem("difficulty");


const MAX_QUESTIONS = 10;

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let questions = [];
let timer;
let timeLeft;
let timePast;
let timeChoice;
let life;
let audio = new Audio('/sounds/beep.wav');

checkDifficulty()
loadQuestion();

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        clearInterval(timer);
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = choices[currentQuestion.answer - 1];

        classToApply = "incorrect";
        if (selectedChoice == selectedAnswer) {
            classToApply = "correct";
            selectedChoice.parentElement.classList.add(classToApply);
            incrementScore();
        }

        else {
            life = life - 1;
            selectedChoice.parentElement.classList.add(classToApply);
            selectedAnswer.parentElement.classList.add("correct");
        }

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            selectedAnswer.parentElement.classList.remove("correct");
            getNewQuestion();
        }, 1000);
    });
});


function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    loader.classList.add("hidden");
    game.classList.remove("hidden");
};

function getNewQuestion() {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS || life == 0) {
        localStorage.setItem("lastScore", score);
        clearInterval(timer);
        return window.location.assign('/src/end.html');
    }
    questionCounter++;
    progressText.innerText = "Question " + questionCounter + "/" + MAX_QUESTIONS;
    progressBarFull.style.width = (questionCounter / MAX_QUESTIONS) * 100 + "%";

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = decodeEntity(currentQuestion.question);

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
    updateLife();
    resetTimer();
}


function incrementScore() {
    score += 100 - 2 * timePast;
    scoreText.innerText = score;
}

async function loadQuestion() {
    const response = await fetch("https://opentdb.com/api.php?amount=100&type=multiple");
    const loadedQuestions = await response.json();

    questions = loadedQuestions.results.map(loadedQuestion => {
        const formatQustion = {
            question: loadedQuestion.question
        };

        const answerChoices = [...loadedQuestion.incorrect_answers];
        formatQustion.answer = Math.floor(Math.random() * 4 + 1);
        answerChoices.splice(formatQustion.answer - 1, 0, loadedQuestion.correct_answer);
        answerChoices.forEach((choice, index) => {
            formatQustion['choice' + (index + 1)] = choice;
        });
        return formatQustion;
    });
    startGame();
}

function updateTimer() {
    timeLeft = timeLeft - 1;
    timePast = timePast + 1;
    if (timeLeft <= 10) {
        timerText.style.color = "orange";
    }
    if (timeLeft <= 5 && timeLeft > 0) {
        timerText.style.color = "red";
        audio.play();
    }
    if (timeLeft >= 1)
        timerText.innerText = timeLeft;
    else {
        life = life - 1;
        getNewQuestion();
    }
}

function resetTimer() {
    timeLeft = timeChoice;
    timePast = 0;
    timerText.innerText = timeLeft;
    timerText.style.color = "white";
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function updateLife() {
    lifeText.innerHTML = life;

}

function checkDifficulty() {
    if (difficulty == "easy") {
        timeChoice = 30;
        life = 5;
    } else if (difficulty == "normal") {
        timeChoice = 20;
        life = 3;
    } else {
        timeChoice = 12;
        life = 3;
    }
}

function decodeEntity(inputStr) {
    var textarea = document.createElement("textarea");
    textarea.innerHTML = inputStr;
    return textarea.value;
}
