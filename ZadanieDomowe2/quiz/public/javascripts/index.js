async function getQuiz(quizId) {
    let res = await fetch('/api/quiz/' + quizId);
    let data = await res.json();
    console.log(data);
    return data;
}

async function getQuizList() {
    let res = await fetch('/api/quiz-list');
    let data = await res.json();
    return data;
}

let quizListArea = document.getElementById("quiz_list");

getQuizList().then((quizList) => {
    console.log(quizList);
    if (quizList.length == 0) {
        let noQuiz = document.createElement("p");
        noQuiz.innerHTML = "Rozwiązałeś już wszystkie dostępne quizy!";
        noQuiz.style.color = "green";
        quizListArea.appendChild(noQuiz);
    }

    for (const quiz of quizList) {
        console.log("quiz:", quiz);
        let quizLink = document.createElement("p");
        quizLink.classList.add("button");
        quizLink.innerHTML = quiz.quiz_name;

        quizLink.addEventListener('click', () => {
            console.log("/quiz/" + quiz.id.toString());
            getQuiz(quiz.id).then((reqQuiz) => {
                if (reqQuiz.id !== undefined) {
                    localStorage.setItem("quiz", JSON.stringify(reqQuiz));
                    window.location.replace("/quiz");
                }
            })
        })
        quizListArea.appendChild(quizLink);
    }
})