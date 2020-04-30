if (localStorage.getItem("finishedQuiz") !== 'true')
    window.location.href = "quiz.html";
var stats = document.getElementById("stats");
var quizLength = +localStorage.getItem("quizLength");
var totalTime = +localStorage.getItem("totalSeconds");
stats.innerHTML = "Twoje wyniki to: ";
for (var questionId = 0; questionId < quizLength; questionId++) {
    var questionResult = document.createElement("p");
    questionResult.innerHTML = "Pytanie " + questionId;
    questionResult.style.fontWeight = "bold";
    if (localStorage.getItem("result" + questionId.toString()) === "0") {
        questionResult.style.color = "green";
        questionResult.innerHTML += " &#9989";
    }
    else {
        questionResult.style.color = "red";
        questionResult.innerHTML += " &#10060 +" + localStorage.getItem("result" + questionId.toString()) + " s";
        totalTime += +localStorage.getItem("result" + questionId.toString());
    }
    stats.appendChild(questionResult);
}
var score = document.getElementById("score");
score.innerHTML = "Łączny czas: " + totalTime.toString() + "s";
var saveButton = document.createElement("p");
saveButton.classList.add("button");
saveButton.innerHTML = "Zapisz";
var rejectButton = document.createElement("p");
rejectButton.classList.add("button");
rejectButton.innerHTML = "Nie zapisuj";
var statusButtonsArea = document.getElementById("save_buttons");
statusButtonsArea.appendChild(saveButton);
statusButtonsArea.appendChild(rejectButton);
saveButton.addEventListener('click', function () {
    localStorage.setItem("newScore", totalTime.toString());
    var quizStats = { results: new Array(), time: totalTime };
    for (var id = 0; id < quizLength; id++) {
        var result = {
            questionId: id,
            penalty: +localStorage.getItem("result" + id.toString()),
            timeSpent: +localStorage.getItem(id.toString() + "Timer")
        };
        quizStats.results.push(result);
    }
    if (localStorage.getItem("stats") === null) {
        var stats_1 = { stats: new Array() };
        stats_1.stats.push(quizStats);
        localStorage.setItem("stats", JSON.stringify(stats_1));
    }
    else {
        var stats_2 = JSON.parse(localStorage.getItem("stats"));
        stats_2.stats.push(quizStats);
        localStorage.setItem("stats", JSON.stringify(stats_2));
    }
    window.location.href = "index.html";
});
rejectButton.addEventListener('click', function () {
    localStorage.setItem("newScore", totalTime.toString());
    window.location.href = "index.html";
});
//# sourceMappingURL=result.js.map