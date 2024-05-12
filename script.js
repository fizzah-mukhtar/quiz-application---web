const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false},
        ]        
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antarctica", correct: true},
        ]        
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            {text: "Vetican City", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Shri Lanka", correct: false},
        ]        
    },
    {
        question: "Which is the largest planet in our solar system?",
        answers: [
            {text: "Earth", correct: false},
            {text: "Jupiter", correct: true},
            {text: "Mars", correct: false},
            {text: "Saturn", correct: false},
        ]        
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const instructionsElement = document.getElementById("instructions");
const startButton = document.getElementById("start-btn");
const quizElement = document.getElementById("quiz");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const timeLeftElement = document.getElementById("time-left");
const quizTitleElement = document.getElementById("quiz-title");

let currentQuestionIndex;
let score;
let timer;

// Hide quiz initially
quizElement.classList.add("hide");
quizTitleElement.classList.add("hide");

// Show instructions initially
instructionsElement.classList.remove("hide");

startButton.addEventListener("click", startQuiz);

function startQuiz(){
    // Shuffle the questions array
    questions.sort(() => Math.random() - 0.5);
    
    // Start the timer
    startTimer();

    // Hide instructions and show the quiz
    instructionsElement.classList.add("hide");
    quizElement.classList.remove("hide");
    quizTitleElement.classList.remove("hide");
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function startTimer() {
    let timeLeft = 30; // 5 minutes in seconds

    timerElement.classList.remove("hide"); // Show timer
    updateTimerDisplay(timeLeft);

    timer = setInterval(function() {
        timeLeft--;
        updateTimerDisplay(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuizDueToTimeout();
        }
    }, 1000); // Update every second
}

function updateTimerDisplay(timeLeft) {
    timeLeftElement.textContent = timeLeft;
}

function endQuizDueToTimeout() {
    alert("Times up, Better luck next time!");
    clearInterval(timer);
    showScore();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct"); 
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    let userScore = `You scored ${score} out of ${questions.length}.`;
    questionElement.innerHTML = userScore;
    questionElement.style.textAlign = "center"; // Align the text at the center
    nextButton.innerHTML = "Play Again?";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
        clearInterval(timer); // Stop timer when quiz ends
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
