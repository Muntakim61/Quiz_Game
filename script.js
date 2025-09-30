const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const resultsScore = document.getElementById("results-score");
const totalQuestionScore = document.getElementById("total-questions-score");
const resultComment = document.getElementById("results-comment");
const questionContainer = document.getElementById("question-container");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestions = document.getElementById("total-questions");
const score = document.getElementById("score");
const answerBtn = document.getElementsByClassName("answer-btn");
const progressBar = document.getElementById("progress");
/// Questions array
const quizQuestions = [
  {
    question: "Who developed the theory of relativity?",
    answers: [
      { text: "Isaac Newton", correct: false },
      { text: "Albert Einstein", correct: true },
      { text: "Nikola Tesla", correct: false },
      { text: "Galileo Galilei", correct: false },
    ],
  },
  {
    question: "What is the smallest prime number?",
    answers: [
      { text: "0", correct: false },
      { text: "1", correct: false },
      { text: "2", correct: true },
      { text: "3", correct: false },
    ],
  },
  {
    question: "Which gas do plants primarily absorb during photosynthesis?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Carbon Dioxide", correct: true },
      { text: "Nitrogen", correct: false },
      { text: "Hydrogen", correct: false },
    ],
  },
  {
    question: "In which year did humans first land on the Moon?",
    answers: [
      { text: "1965", correct: false },
      { text: "1969", correct: true },
      { text: "1972", correct: false },
      { text: "1959", correct: false },
    ],
  },
  {
    question: "Which data structure uses FIFO (First In, First Out)?",
    answers: [
      { text: "Stack", correct: false },
      { text: "Queue", correct: true },
      { text: "Tree", correct: false },
      { text: "Graph", correct: false },
    ],
  },
  {
    question: "What is the hardest natural substance on Earth?",
    answers: [
      { text: "Iron", correct: false },
      { text: "Diamond", correct: true },
      { text: "Gold", correct: false },
      { text: "Quartz", correct: false },
    ],
  },
  {
    question: "Which continent is known as the 'Dark Continent'?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Africa", correct: true },
      { text: "South America", correct: false },
      { text: "Australia", correct: false },
    ],
  },
  {
    question: "Which language is primarily used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "Java", correct: false },
      { text: "C++", correct: false },
    ],
  },
  {
    question: "What is the boiling point of water at sea level?",
    answers: [
      { text: "50°C", correct: false },
      { text: "100°C", correct: true },
      { text: "150°C", correct: false },
      { text: "212°C", correct: false },
    ],
  },
  {
    question: "Which country is home to the Great Barrier Reef?",
    answers: [
      { text: "Australia", correct: true },
      { text: "USA", correct: false },
      { text: "Brazil", correct: false },
      { text: "South Africa", correct: false },
    ],
  },
];
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click",restartQuiz);
var currentQuestionIndex=0;
var scoreCount=10;
var totalQuestionCount=quizQuestions.length;
totalQuestions.innerHTML=totalQuestionCount;

function startQuiz(){
    currentQuestionIndex=0;
    scoreCount=0;
    currentQuestionSpan.innerHTML=currentQuestionIndex+1;
    score.innerHTML=scoreCount;
    shuffleArray(quizQuestions);
    startScreen.classList.add("inactive");
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    quizScreen.classList.remove("inactive");
    showQuestion();
}
function showQuestion(){
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionContainer.innerText = currentQuestion.question;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    answersContainer.innerHTML = "";

    const shuffledAnswers = [...currentQuestion.answers];
    shuffleArray(shuffledAnswers);
    shuffledAnswers.forEach((answer)=>{
            const button=document.createElement("button");
            button.textContent = answer.text;
            button.classList.add("answer-btn");
            button.dataset.correct = answer.correct;
            button.addEventListener("click", selectAnswer);
            answersContainer.appendChild(button);
        })
}
function selectAnswer(event){
    const selectedBtn=event.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    
    Array.from(answersContainer.children).forEach((button)=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }else if(button==selectedBtn && !isCorrect){
            button.classList.add("incorrect");
        }
    });

    if(isCorrect){
        scoreCount++;
        score.textContent=scoreCount;
    }

    setTimeout(()=>{
        currentQuestionIndex++;
        if(currentQuestionIndex<totalQuestionCount){
            showQuestion();
            currentQuestionSpan.innerHTML=currentQuestionIndex+1;
        }else{
            showResult();
        }
    },1000);
}
function showResult(){
    quizScreen.classList.add("inactive");
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    resultScreen.classList.remove("inactive");

    resultsScore.textContent=scoreCount;
    totalQuestionScore.textContent=quizQuestions.length;
    var percentage=(scoreCount/totalQuestionCount)*100;
    if(percentage>=100){
        resultComment.innerHTML="Outstanding! Perfect score!";
    }else if(percentage>=80){
        resultComment.innerHTML="Great job! You have a strong understanding of the material.";
    }else if(percentage>=60){
        resultComment.innerHTML="Good effort! You have a decent grasp of the content.";
    }else if(percentage>=40){
        resultComment.innerHTML="Keep trying! You might want to review the material.";
    }else{
        resultComment.innerHTML="Don't be discouraged! Practice makes perfect.";
    }
    
}
function restartQuiz(){
    resultScreen.classList.add("inactive");
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
    startScreen.classList.remove("inactive");
}
///Fisher–Yates shuffle algorithm to shuffle questions(Yay!!New Algorithm learnt)
function shuffleArray(quizQuestions){
    for(let i=quizQuestions.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [quizQuestions[i],quizQuestions[j]]=[quizQuestions[j],quizQuestions[i]];
    }
}
