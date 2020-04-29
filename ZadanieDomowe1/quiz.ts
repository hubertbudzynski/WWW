const quiz =
{
    "questions" :
    [
        {
            "question" : "Ile wynosi 10 : 5 + 8?",
            "solution" : 10,
            "penalty" : 10
        },
        {
            "question" : "Ile wynosi 2 + 2 * 2?",
            "solution" : 6,
            "penalty"  : 15
        },
        {
            "question" : "Ile wynosi 1 + 2 + 3 + 4 + 5?",
            "solution" : 15,
            "penalty"  : 20
        },
        {
            "question" : "Ile wynosi 2^(2^2)?",
            "solution" : 16,
            "penalty"  : 20
        }
    ]
}
localStorage.clear();
// Initaite timers
const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
const questionTimers = new Array<number>(Object.keys(quiz.questions).length);
for (let i = 0; i < questionTimers.length; i++)
    questionTimers[i] = 0;
let totalSeconds = 0;
if (localStorage.getItem("totalSeconds") !== null)
    totalSeconds = +localStorage.getItem("totalSeconds");
setClock();

// Bolds question in question bar.
function markQuestion(questionId : number) {
    const reqQuestion : HTMLParagraphElement = document.querySelector("p[data-questionId='" + questionId.toString() + "']");
    reqQuestion.style.fontWeight = 'bold';
}

// Unbolds question in question bar.
function unmarkQuestion(questionId : number) {
    const reqQuestion : HTMLParagraphElement = document.querySelector("p[data-questionId='" + questionId.toString() + "']");
    reqQuestion.style.fontWeight = 'normal';
}

const answerBox = document.getElementById("answer_box") as HTMLInputElement;
console.log("AnswerBox: ", answerBox);
// Saves current input.
function saveInput(questionId : number) {
    if (answerBox.value === null || answerBox.value === "")
        localStorage.removeItem(questionId.toString() + "answer");
    else
        localStorage.setItem(questionId.toString() + "answer", answerBox.value);
}
// Displays in the input field saved input of question questionId.
function displaySavedInput(questionId : number) {
    answerBox.value = localStorage.getItem(questionId.toString() + "answer");
}

const endButton = document.getElementById("end_button");

function disableButton(button : HTMLElement) {
    button.style.backgroundColor = "grey";
    button.style.cursor = "default";
}
function enableButton(button : HTMLElement) {
    button.style.backgroundColor = "rgb(31, 133, 218)";
    button.style.cursor = "pointer";
}

function setEndButtonStatus() {
    for (const question of Object.keys(quiz.questions)) {
        if (localStorage.getItem(question + "answer") === null) {
            disableButton(endButton);
            return;
        }
    }

    enableButton(endButton);
}

function setQuestionAnswerd(questionId : number) {
    const reqQuestion : HTMLParagraphElement = document.querySelector("p[data-questionId='" + questionId.toString() + "']");
    reqQuestion.style.color = "green";
}

function setQuestionUnanswerd(questionId : number) {
    const reqQuestion : HTMLParagraphElement = document.querySelector("p[data-questionId='" + questionId.toString() + "']");
    reqQuestion.style.color = "red";
}

function setStatusBarColors() {
    for (let i = 0; i < quiz.questions.length; i++) {
        if (localStorage.getItem((i.toString() + "answer")) === null)
            setQuestionUnanswerd(i);
        else
            setQuestionAnswerd(i);
    }
}

answerBox.addEventListener("input", () => {
    saveInput(+localStorage.getItem("questionId"));
    setEndButtonStatus();
    setStatusBarColors();
});

const navigationArea = document.getElementById("navigation_buttons");
const nextButton = document.createElement("p");
nextButton.classList.add("button");
const prevButton = document.createElement("p");
prevButton.classList.add("button");
navigationArea.appendChild(prevButton);
navigationArea.appendChild(nextButton);

prevButton.addEventListener("click", () => {
    const questionId = localStorage.getItem("questionId");
    if (questionId !== "0")
        displayQuestion(+questionId - 1);
});
nextButton.addEventListener("click", () => {
    const questionId = localStorage.getItem("questionId");
    if (questionId !== (quiz.questions.length - 1).toString())
        displayQuestion(+questionId + 1);
});

prevButton.innerHTML = "< Poprzednie";
nextButton.innerHTML = "Następne >"
const questionBox = document.getElementById("question");
// Displays question of the given number.
function displayQuestion(questionId : number) {
    stopTimer(+localStorage.getItem("questionId"));
    startTimer(questionId);
    // Enable next and prev buttons
    enableButton(nextButton);
    enableButton(prevButton);
    // Disable button if necessary;
    if (questionId === 0)
        disableButton(prevButton);
    if (questionId === quiz.questions.length - 1)
        disableButton(nextButton);
    // If the site reloads, we want the previous input to be displayed.
    displaySavedInput(+localStorage.getItem("questionId"));
    // Save current input and unmark it in the question bar.
    saveInput(+localStorage.getItem("questionId"));
    unmarkQuestion(+localStorage.getItem("questionId"));
    console.log("Displaying question", questionId);
    // Dispaly the question and mark it in the question bar..
    questionBox.innerHTML = "Pytanie: " + quiz.questions[questionId].question;
    localStorage.setItem("questionId", questionId.toString());
    markQuestion(+localStorage.getItem("questionId"));
    // Display saved input, if question was answerd earlier.
    displaySavedInput(questionId);
}

let currentQuestion = localStorage.getItem("questionId");
if (currentQuestion === null) {
    currentQuestion = "0";
    localStorage.setItem("questionId", "0");
}

console.log(quiz);

const questionBarStart = document.getElementById("question_bar_start");

// Display questions in question bar
for (let i = 0; i < quiz.questions.length; i++) {
    const questionBarEl = document.createElement("p");
    questionBarEl.innerHTML = "Pytanie " + (i + 1).toString();
    questionBarEl.setAttribute("data-questionId", i.toString());
    questionBarEl.classList.add("question_bar_elem");

    questionBarEl.addEventListener("click", ()=>displayQuestion(i));
    questionBarStart.appendChild(questionBarEl);

}

// Display current question, 1 at first
displayQuestion(+localStorage.getItem("questionId"));

// Set current status.
setEndButtonStatus();
setStatusBarColors();

///////////////////////////////
//      Timer functions      //
///////////////////////////////


function setClock() {
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(Math.floor(totalSeconds / 60));
}
function setTime() {
    ++totalSeconds;
    localStorage.setItem("totalSeconds", totalSeconds.toString());
    setClock();
}

function pad(val : number) {
    const valString = val + "";
    if (valString.length < 2)
        return "0" + valString;
    else
        return valString;

}
setInterval(setTime, 1000);

function timeCounter(questionId : number) {
    ++questionTimers[questionId - 1];
    localStorage.setItem(questionId.toString() + "Timer", questionTimers[questionId - 1].toString());
}

// Initialize timers
function startTimer(questionId : number) {
    // Set elapsed time in case of refreshing
    if (localStorage.getItem(questionId.toString() + "Timer") !== null)
        questionTimers[questionId - 1] = +localStorage.getItem(questionId.toString() + "Timer");


    const timerId = setInterval(() => timeCounter(questionId), 1000);
    localStorage.setItem(questionId.toString() + "TimerId", timerId.toString());
}

function stopTimer(questionId : number) {
    if (localStorage.getItem(questionId.toString() + "TimerId") === null)
        return;

    clearInterval(+localStorage.getItem(questionId.toString() + "TimerId"));
}
// for debug only
questionBox.addEventListener('click', () => {
    console.log(questionTimers);
});

function displayStats() {

}

endButton.addEventListener("click", () => {
    for (let i = 0; i < quiz.questions.length; i++) {
        if (localStorage.getItem(i.toString() + "answer") === null) {
            return;
        }
    }

    localStorage.setItem("quizLength", quiz.questions.length.toString());
    for (let i = 0; i < quiz.questions.length; i++) {
        if (+localStorage.getItem(i.toString() + "answer") === quiz.questions[i].solution)
            localStorage.setItem("result" + i.toString(), "0");
        else
            localStorage.setItem("result" + i.toString(), quiz.questions[i].penalty.toString());
    }
    localStorage.setItem("finishedQuiz", "true");
    window.location.href = "result.html";
});