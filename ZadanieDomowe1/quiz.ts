// Reprezentacja quizu.
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
            "penalty"  : 25
        }
    ]
}


///////////////////////////////
//      Timer functions      //
///////////////////////////////

// Initaite time counters
const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
const questionTimers = new Array<number>(Object.keys(quiz.questions).length);
for (let i = 0; i < questionTimers.length; i++)
    questionTimers[i] = 0;
let totalSeconds = 0;

// Restore seconds counter in case of refresh.
if (localStorage.getItem("totalSeconds") !== null)
    totalSeconds = +localStorage.getItem("totalSeconds");

// Sets counter displayed on the page.
function setClock() {
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(Math.floor(totalSeconds / 60));
}
// Set counter after loading the page.
setClock();

// Adds 1 to the second counter, saves the value in localstorage and displays elapsed time.
function setTime() {
    ++totalSeconds;
    localStorage.setItem("totalSeconds", totalSeconds.toString());
    setClock();
}

// Returns string representing the number, for one-digit numbers a leading 0 is added.
function pad(val : number) {
    const valString = val.toString();
    if (valString.length < 2)
        return "0" + valString;
    else
        return valString;

}
// Time elapsed updates every second.
setInterval(setTime, 1000);

// Updates time elapsed on question of given number and saves it in local storage.
function timeCounter(questionId : number) {
    ++questionTimers[questionId];
    localStorage.setItem(questionId.toString() + "Timer", questionTimers[questionId].toString());
}

// Starts timer for question of given number.
function startTimer(questionId : number) {
    // Set saved elapsed time in case of refreshing.
    if (localStorage.getItem(questionId.toString() + "Timer") !== null)
        questionTimers[questionId] = +localStorage.getItem(questionId.toString() + "Timer");

    // Start the timer and save setInterval id in localstorage.
    const timerId = setInterval(() => timeCounter(questionId), 1000);
    localStorage.setItem(questionId.toString() + "TimerId", timerId.toString());
}

// Stops timer for question of given number.
function stopTimer(questionId : number) {
    if (localStorage.getItem(questionId.toString() + "TimerId") === null)
        return;

    clearInterval(+localStorage.getItem(questionId.toString() + "TimerId"));
}

//////////////////////////////
//       Question Bar       //
//////////////////////////////
// Bolds question of given number in question bar.
function markQuestion(questionId : number) {
    const reqQuestion : HTMLParagraphElement = document.querySelector("p[data-questionId='" + questionId.toString() + "']");
    reqQuestion.style.fontWeight = 'bold';
}

// Unbolds question of given number in question bar.
function unmarkQuestion(questionId : number) {
    const reqQuestion : HTMLParagraphElement = document.querySelector("p[data-questionId='" + questionId.toString() + "']");
    reqQuestion.style.fontWeight = 'normal';
}

// Colors question of given number green on the question bar.
function setQuestionAnswerd(questionId : number) {
    const reqQuestion : HTMLParagraphElement = document.querySelector("p[data-questionId='" + questionId.toString() + "']");
    reqQuestion.style.color = "green";
}
// Colors question of given number red on the question bar.
function setQuestionUnanswerd(questionId : number) {
    const reqQuestion : HTMLParagraphElement = document.querySelector("p[data-questionId='" + questionId.toString() + "']");
    reqQuestion.style.color = "red";
}

// Sets question bar colors. Green and red represend answerd and unaswerd questions accordingly.
function setStatusBarColors() {
    for (let i = 0; i < quiz.questions.length; i++) {
        if (localStorage.getItem((i.toString() + "answer")) === null)
            setQuestionUnanswerd(i);
        else
            setQuestionAnswerd(i);
    }
}

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
///////////////////////////////
//           Input           //
///////////////////////////////
// Solution input box.
const answerBox = document.getElementById("answer_box") as HTMLInputElement;

// Saves current input for question of given number.
function saveInput(questionId : number) {
    if (answerBox.value === null || answerBox.value === "")
        localStorage.removeItem(questionId.toString() + "answer");
    else
        localStorage.setItem(questionId.toString() + "answer", answerBox.value);
}

// Displays in the input field saved input for question of given number.
function displaySavedInput(questionId : number) {
    answerBox.value = localStorage.getItem(questionId.toString() + "answer");
}

// Updates question bar status, end button status and saves input.
answerBox.addEventListener("input", () => {
    saveInput(+localStorage.getItem("questionId"));
    setEndButtonStatus();
    setStatusBarColors();
});

///////////////////////////////
//          Buttons          //
///////////////////////////////
const endButton = document.getElementById("end_button");

// Changes buttons appearance to a "disabled" one.
function disableButton(button : HTMLElement) {
    button.style.backgroundColor = "grey";
    button.style.cursor = "default";
}
// Changes buttons appearance to an "enabled" one.
function enableButton(button : HTMLElement) {
    button.style.backgroundColor = "rgb(31, 133, 218)";
    button.style.cursor = "pointer";
}
// Sets end button aviability.
function setEndButtonStatus() {
    // If a question is unnswerd, end button is disabled.
    for (const question of Object.keys(quiz.questions)) {
        if (localStorage.getItem(question + "answer") === null) {
            disableButton(endButton);
            return;
        }
    }

    enableButton(endButton);
}
// Box containing buttons for navigating questions
const navigationArea = document.getElementById("navigation_buttons");
// Button for navigating to the next question.
const nextButton = document.createElement("p");
nextButton.classList.add("button");
// Button for navigating to the previous question.
const prevButton = document.createElement("p");
prevButton.classList.add("button");

prevButton.innerHTML = "< Poprzednie";
nextButton.innerHTML = "Następne >"
// Display buttons.
navigationArea.appendChild(prevButton);
navigationArea.appendChild(nextButton);

// If a next or previous question is present, navigate to it on click.
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

// If every question is answerd, checks the answers correctness and saves it in localStorage.
endButton.addEventListener("click", () => {
    for (let i = 0; i < quiz.questions.length; i++) {
        if (localStorage.getItem(i.toString() + "answer") === null) {
            return;
        }
    }

    // Save number of questions in localStorage.
    localStorage.setItem("quizLength", quiz.questions.length.toString());
    for (let i = 0; i < quiz.questions.length; i++) {
        // If question is answerd correctly, no penalty is given.
        if (+localStorage.getItem(i.toString() + "answer") === quiz.questions[i].solution)
            localStorage.setItem("result" + i.toString(), "0");
        else
            localStorage.setItem("result" + i.toString(), quiz.questions[i].penalty.toString());
    }

    // Mark the quiz as finished and redirect to the result page.
    localStorage.setItem("finishedQuiz", "true");
    window.location.href = "result.html";
});

// Cancel quiz button.
let cancelButton = document.getElementById("cancel");

// Redirect to main page if cancel button is clicked and mark quiz as finished.
cancelButton.addEventListener('click', () => {
    localStorage.setItem("finishedQuiz", "true");
    window.location.href = "index.html";
})

///////////////////////////////
//     Display questions     //
///////////////////////////////
// Box in which questions are displayed.
const questionBox = document.getElementById("question");

// Displays question of the given number.
function displayQuestion(questionId : number) {
    // Stop timer for previous question and start timer for the new question.
    stopTimer(+localStorage.getItem("questionId"));
    startTimer(questionId);

    // Enable next and prev buttons
    enableButton(nextButton);
    enableButton(prevButton);
    // Disable nextButton or prevButton if necessary.
    if (questionId === 0)
        disableButton(prevButton);
    if (questionId === quiz.questions.length - 1)
        disableButton(nextButton);

    // If the site reloads, we want the previous input to be displayed.
    displaySavedInput(+localStorage.getItem("questionId"));
    // Save previous question input and unmark it in the question bar.
    saveInput(+localStorage.getItem("questionId"));
    unmarkQuestion(+localStorage.getItem("questionId"));

    // Dispaly the question, save current question number in localstorage and mark it in the question bar.
    questionBox.innerHTML = "Pytanie: " + quiz.questions[questionId].question;
    localStorage.setItem("questionId", questionId.toString());
    markQuestion(+localStorage.getItem("questionId"));

    // Display saved input, if question was answerd earlier.
    displaySavedInput(questionId);
}

// The first question displayed is the first one in JSON.
if (localStorage.getItem("questionId") === null)
    localStorage.setItem("questionId", "0");


// Display current question, 1 at first
displayQuestion(+localStorage.getItem("questionId"));

// Set current status.
setEndButtonStatus();
setStatusBarColors();



