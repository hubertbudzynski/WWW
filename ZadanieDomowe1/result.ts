// Redirect to quiz if not finished
if (localStorage.getItem("finishedQuiz") !== 'true')
    window.location.href="quiz.html";

let stats = document.getElementById("stats");
const quizLength : number = +localStorage.getItem("quizLength");
console.log(quizLength);
for (let questionId = 0; questionId < quizLength; questionId++) {
    console.log("XD");
    const questionResult = document.createElement("p") as HTMLParagraphElement;
    // Check if answered correctly.
    questionResult.innerHTML = "Pytanie " + questionId;
    questionResult.style.fontWeight = "bold";
    if (localStorage.getItem("result" + questionId.toString()) === "0")
        questionResult.style.color = "green";
    else
        questionResult.style.color = "red";

    stats.appendChild(questionResult);
}
localStorage.clear();