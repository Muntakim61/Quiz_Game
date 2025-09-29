const startBtn = document.getElementById("start-btn");
const start_screen = document.getElementById("start-screen");
const quiz_screen = document.getElementById("quiz-screen");

startBtn.addEventListener("click", goToQuizScreen());

function goToQuizScreen() {
    start_screen.classList.add("inactive");
    start_screen.classList.remove("active");
    quiz_screen.classList.remove("inactive");
    quiz_screen.classList.add("active");
}