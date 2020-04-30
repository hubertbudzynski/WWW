// Redirect to quiz if not finished
if (localStorage.getItem("finishedQuiz") !== 'true')
    window.location.href="quiz.html";

    
// Interface for a question result
interface questionResult {
    questionId : number;
    penalty : number;
    timeSpent : number;
}
interface quizStatistics {
    results : questionResult[];
    time : number;
}
interface allQuizStats {
    stats : quizStatistics[];
}

let stats = document.getElementById("stats");
const quizLength : number = +localStorage.getItem("quizLength");

let totalTime : number = +localStorage.getItem("totalSeconds");

stats.innerHTML = "Twoje wyniki to: ";
for (let questionId = 0; questionId < quizLength; questionId++) {
    const questionResult = document.createElement("p") as HTMLParagraphElement;
    // Check if answered correctly.
    questionResult.innerHTML = "Pytanie " + questionId;
    questionResult.style.fontWeight = "bold";
    if (localStorage.getItem("result" + questionId.toString()) === "0") {
        questionResult.style.color = "green";
        questionResult.innerHTML += " &#9989"
    }
    else {
        questionResult.style.color = "red";
        questionResult.innerHTML += " &#10060 +" + localStorage.getItem("result" + questionId.toString()) + " s";
        totalTime += +localStorage.getItem("result" + questionId.toString());
    }

    stats.appendChild(questionResult);
}

let score = document.getElementById("score") as HTMLDivElement;
score.innerHTML = "Łączny czas: " + totalTime.toString() + "s";

let saveButton = document.createElement("p");
saveButton.classList.add("button");
saveButton.innerHTML = "Zapisz";

let rejectButton = document.createElement("p");
rejectButton.classList.add("button");
rejectButton.innerHTML = "Nie zapisuj";

let statusButtonsArea = document.getElementById("save_buttons");
statusButtonsArea.appendChild(saveButton);
statusButtonsArea.appendChild(rejectButton);

saveButton.addEventListener('click', () => {
    localStorage.setItem("newScore", totalTime.toString());

    const quizStats : quizStatistics = {results : new Array(), time : totalTime};
    for (let id = 0; id < quizLength;id++) {
        const result : questionResult = {
            questionId : id,
            penalty : +localStorage.getItem("result" + id.toString()),
            timeSpent : +localStorage.getItem(id.toString() + "Timer")};

        quizStats.results.push(result);
    }
    if (localStorage.getItem("stats") === null) {
        const stats : allQuizStats = {stats : new Array()}
        stats.stats.push(quizStats);
        localStorage.setItem("stats", JSON.stringify(stats));
    }
    else {
        const stats : allQuizStats = JSON.parse(localStorage.getItem("stats"));
        stats.stats.push(quizStats);
        localStorage.setItem("stats", JSON.stringify(stats));
    }

    window.location.href = "index.html";
})

rejectButton.addEventListener('click', () => {
    localStorage.setItem("newScore", totalTime.toString());
    window.location.href = "index.html";
})
