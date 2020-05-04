// If a quiz is active, redirect to it.
if (localStorage.getItem("finishedQuiz") === null && localStorage.getItem("name") !== null)
    window.location.href = "quiz.html"

let startButton = document.getElementById("start_button");

disableStartButton();

function disableStartButton() {
    startButton.style.backgroundColor = "grey";
    startButton.style.cursor = "default";
}
function enableStartButton() {
    startButton.style.backgroundColor = "rgb(31, 133, 218)";
    startButton.style.cursor = "pointer";
}

let nameInput = document.getElementById("name") as HTMLInputElement;
nameInput.addEventListener('input', () => {
    if (nameInput.value !== "" && nameInput.value !== null)
        enableStartButton();
    else
        disableStartButton();
})

startButton.addEventListener("click", ()=>{
    if (nameInput.value !== "") {
        localStorage.setItem("name", nameInput.value);
        window.location.href ="quiz.html"
    }
});




let leaderboard : [string, number][] = new Array();
let index : number =  0;

while (localStorage.getItem("score" + index.toString()) !== null) {
    leaderboard.push([localStorage.getItem("name" + index.toString()), +localStorage.getItem("score" + index.toString())]);
    index++;
}
if (localStorage.getItem("newScore") !== null && localStorage.getItem("name") !== null)
    leaderboard.push([localStorage.getItem("name"), +localStorage.getItem("newScore")]);

leaderboard.sort(([, scoreA], [, scoreB]) =>  scoreA - scoreB);
let leaderboardBox = document.getElementById("scores") as HTMLDivElement;
for (let i = 0; i < Math.min(leaderboard.length, 5); i++) {
    const leaderboardScore = document.createElement("p");
    leaderboardScore.innerHTML = (i + 1).toString() + ". " + leaderboard[i][0] + " " + leaderboard[i][1].toString() + "s";
    leaderboardBox.appendChild(leaderboardScore);
}

if (localStorage.getItem("finishedQuiz") === "true") {
    const stats = localStorage.getItem("stats");
    localStorage.clear();
    localStorage.setItem("stats", stats);

    for (let i = 0; i < Math.min(leaderboard.length, 5); i++) {
        localStorage.setItem("score" + i.toString(), leaderboard[i][1].toString());
        localStorage.setItem("name" + i.toString(), leaderboard[i][0]);
    }
}
