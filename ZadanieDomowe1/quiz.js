var quiz = {
    "questions": [
        {
            "question": "Ile wynosi 10 : 5 + 8?",
            "solution": 10,
            "penalty": 10
        },
        {
            "question": "Ile wynosi 2 + 2 * 2?",
            "solution": 6,
            "penalty": 15
        },
        {
            "question": "Ile wynosi 1 + 2 + 3 + 4 + 5?",
            "solution": 15,
            "penalty": 20
        },
        {
            "question": "Ile wynosi 2^(2^2)?",
            "solution": 16,
            "penalty": 25
        }
    ]
};
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var questionTimers = new Array(Object.keys(quiz.questions).length);
for (var i = 0; i < questionTimers.length; i++)
    questionTimers[i] = 0;
var totalSeconds = 0;
if (localStorage.getItem("totalSeconds") !== null)
    totalSeconds = +localStorage.getItem("totalSeconds");
function setClock() {
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(Math.floor(totalSeconds / 60));
}
setClock();
function setTime() {
    ++totalSeconds;
    localStorage.setItem("totalSeconds", totalSeconds.toString());
    setClock();
}
function pad(val) {
    var valString = val.toString();
    if (valString.length < 2)
        return "0" + valString;
    else
        return valString;
}
setInterval(setTime, 1000);
function timeCounter(questionId) {
    ++questionTimers[questionId];
    localStorage.setItem(questionId.toString() + "Timer", questionTimers[questionId].toString());
}
function startTimer(questionId) {
    if (localStorage.getItem(questionId.toString() + "Timer") !== null)
        questionTimers[questionId] = +localStorage.getItem(questionId.toString() + "Timer");
    var timerId = setInterval(function () { return timeCounter(questionId); }, 1000);
    localStorage.setItem(questionId.toString() + "TimerId", timerId.toString());
}
function stopTimer(questionId) {
    if (localStorage.getItem(questionId.toString() + "TimerId") === null)
        return;
    clearInterval(+localStorage.getItem(questionId.toString() + "TimerId"));
}
function markQuestion(questionId) {
    var reqQuestion = document.querySelector("p[data-questionId='" + questionId.toString() + "']");
    reqQuestion.style.fontWeight = 'bold';
}
function unmarkQuestion(questionId) {
    var reqQuestion = document.querySelector("p[data-questionId='" + questionId.toString() + "']");
    reqQuestion.style.fontWeight = 'normal';
}
function setQuestionAnswerd(questionId) {
    var reqQuestion = document.querySelector("p[data-questionId='" + questionId.toString() + "']");
    reqQuestion.style.color = "green";
}
function setQuestionUnanswerd(questionId) {
    var reqQuestion = document.querySelector("p[data-questionId='" + questionId.toString() + "']");
    reqQuestion.style.color = "red";
}
function setStatusBarColors() {
    for (var i = 0; i < quiz.questions.length; i++) {
        if (localStorage.getItem((i.toString() + "answer")) === null)
            setQuestionUnanswerd(i);
        else
            setQuestionAnswerd(i);
    }
}
var questionBarStart = document.getElementById("question_bar_start");
var _loop_1 = function (i) {
    var questionBarEl = document.createElement("p");
    questionBarEl.innerHTML = "Pytanie " + (i + 1).toString();
    questionBarEl.setAttribute("data-questionId", i.toString());
    questionBarEl.classList.add("question_bar_elem");
    questionBarEl.addEventListener("click", function () { return displayQuestion(i); });
    questionBarStart.appendChild(questionBarEl);
};
for (var i = 0; i < quiz.questions.length; i++) {
    _loop_1(i);
}
var answerBox = document.getElementById("answer_box");
function saveInput(questionId) {
    if (answerBox.value === null || answerBox.value === "")
        localStorage.removeItem(questionId.toString() + "answer");
    else
        localStorage.setItem(questionId.toString() + "answer", answerBox.value);
}
function displaySavedInput(questionId) {
    answerBox.value = localStorage.getItem(questionId.toString() + "answer");
}
answerBox.addEventListener("input", function () {
    saveInput(+localStorage.getItem("questionId"));
    setEndButtonStatus();
    setStatusBarColors();
});
var endButton = document.getElementById("end_button");
function disableButton(button) {
    button.style.backgroundColor = "grey";
    button.style.cursor = "default";
}
function enableButton(button) {
    button.style.backgroundColor = "rgb(31, 133, 218)";
    button.style.cursor = "pointer";
}
function setEndButtonStatus() {
    for (var _i = 0, _a = Object.keys(quiz.questions); _i < _a.length; _i++) {
        var question = _a[_i];
        if (localStorage.getItem(question + "answer") === null) {
            disableButton(endButton);
            return;
        }
    }
    enableButton(endButton);
}
var navigationArea = document.getElementById("navigation_buttons");
var nextButton = document.createElement("p");
nextButton.classList.add("button");
var prevButton = document.createElement("p");
prevButton.classList.add("button");
prevButton.innerHTML = "< Poprzednie";
nextButton.innerHTML = "Następne >";
navigationArea.appendChild(prevButton);
navigationArea.appendChild(nextButton);
prevButton.addEventListener("click", function () {
    var questionId = localStorage.getItem("questionId");
    if (questionId !== "0")
        displayQuestion(+questionId - 1);
});
nextButton.addEventListener("click", function () {
    var questionId = localStorage.getItem("questionId");
    if (questionId !== (quiz.questions.length - 1).toString())
        displayQuestion(+questionId + 1);
});
endButton.addEventListener("click", function () {
    for (var i = 0; i < quiz.questions.length; i++) {
        if (localStorage.getItem(i.toString() + "answer") === null) {
            return;
        }
    }
    localStorage.setItem("quizLength", quiz.questions.length.toString());
    for (var i = 0; i < quiz.questions.length; i++) {
        if (+localStorage.getItem(i.toString() + "answer") === quiz.questions[i].solution)
            localStorage.setItem("result" + i.toString(), "0");
        else
            localStorage.setItem("result" + i.toString(), quiz.questions[i].penalty.toString());
    }
    localStorage.setItem("finishedQuiz", "true");
    window.location.href = "result.html";
});
var cancelButton = document.getElementById("cancel");
cancelButton.addEventListener('click', function () {
    localStorage.setItem("finishedQuiz", "true");
    window.location.href = "index.html";
});
var questionBox = document.getElementById("question");
function displayQuestion(questionId) {
    stopTimer(+localStorage.getItem("questionId"));
    startTimer(questionId);
    enableButton(nextButton);
    enableButton(prevButton);
    if (questionId === 0)
        disableButton(prevButton);
    if (questionId === quiz.questions.length - 1)
        disableButton(nextButton);
    displaySavedInput(+localStorage.getItem("questionId"));
    saveInput(+localStorage.getItem("questionId"));
    unmarkQuestion(+localStorage.getItem("questionId"));
    questionBox.innerHTML = "Pytanie: " + quiz.questions[questionId].question;
    localStorage.setItem("questionId", questionId.toString());
    markQuestion(+localStorage.getItem("questionId"));
    displaySavedInput(questionId);
}
if (localStorage.getItem("questionId") === null)
    localStorage.setItem("questionId", "0");
displayQuestion(+localStorage.getItem("questionId"));
setEndButtonStatus();
setStatusBarColors();
//# sourceMappingURL=quiz.js.map