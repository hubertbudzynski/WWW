if (localStorage.getItem("finishedQuiz") === null && localStorage.getItem("name") !== null)
    window.location.href = "quiz.html";
var startButton = document.getElementById("start_button");
disableStartButton();
function disableStartButton() {
    startButton.style.backgroundColor = "grey";
    startButton.style.cursor = "default";
}
function enableStartButton() {
    startButton.style.backgroundColor = "rgb(31, 133, 218)";
    startButton.style.cursor = "pointer";
}
var nameInput = document.getElementById("name");
nameInput.addEventListener('input', function () {
    if (nameInput.value !== "" && nameInput.value !== null)
        enableStartButton();
    else
        disableStartButton();
});
startButton.addEventListener("click", function () {
    if (nameInput.value !== "") {
        localStorage.setItem("name", nameInput.value);
        window.location.href = "quiz.html";
    }
});
var leaderboard = new Array();
var index = 0;
while (localStorage.getItem("score" + index.toString()) !== null) {
    leaderboard.push([localStorage.getItem("name" + index.toString()), +localStorage.getItem("score" + index.toString())]);
    index++;
}
if (localStorage.getItem("newScore") !== null)
    leaderboard.push([localStorage.getItem("name"), +localStorage.getItem("newScore")]);
leaderboard.sort(function (_a, _b) {
    var scoreA = _a[1];
    var scoreB = _b[1];
    return scoreA - scoreB;
});
var leaderboardBox = document.getElementById("scores");
for (var i = 0; i < Math.min(leaderboard.length, 5); i++) {
    var leaderboardScore = document.createElement("p");
    leaderboardScore.innerHTML = (i + 1).toString() + ". " + leaderboard[i][0] + " " + leaderboard[i][1].toString() + "s";
    leaderboardBox.appendChild(leaderboardScore);
}
if (localStorage.getItem("finishedQuiz") === "true") {
    var stats_1 = localStorage.getItem("stats");
    localStorage.clear();
    localStorage.setItem("stats", stats_1);
    console.log(stats_1);
    console.log(JSON.parse(stats_1));
    for (var i = 0; i < Math.min(leaderboard.length, 5); i++) {
        localStorage.setItem("score" + i.toString(), leaderboard[i][1].toString());
        localStorage.setItem("name" + i.toString(), leaderboard[i][0]);
    }
}
//# sourceMappingURL=main.js.map