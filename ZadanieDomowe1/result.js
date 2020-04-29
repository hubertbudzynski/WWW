if (localStorage.getItem("finishedQuiz") !== 'true')
    window.location.href = "quiz.html";
var stats = document.getElementById("stats");
var quizLength = +localStorage.getItem("quizLength");
console.log(quizLength);
for (var questionId = 0; questionId < quizLength; questionId++) {
    console.log("XD");
    var questionResult = document.createElement("p");
    questionResult.innerHTML = "Pytanie " + questionId;
    questionResult.style.fontWeight = "bold";
    if (localStorage.getItem("result" + questionId.toString()) === "0")
        questionResult.style.color = "green";
    else
        questionResult.style.color = "red";
    stats.appendChild(questionResult);
}
localStorage.clear();
//# sourceMappingURL=result.js.map