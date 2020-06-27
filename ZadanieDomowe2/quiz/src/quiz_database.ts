import * as sqlite3 from 'sqlite3';
/* tslint:disable-next-line:no-var-requires */
const { promisify } = require("util");

interface Question {
    question: string;
    solution: number;
    penalty: number;
}
interface Quiz {
    name: string;
    questions: Question[];
}
/* tslint:disable-next-line:no-var-requires */
const quizes : Quiz[] = require('./quiz_json');

const run = (db : sqlite3.Database) => promisify(db.run.bind(db));
const get = (db : sqlite3.Database) => promisify(db.get.bind(db));
const all = (db : sqlite3.Database) => promisify(db.all.bind(db));


async function initQuizDB() {
    sqlite3.verbose();
    const db = new sqlite3.Database('baza.db');
    await run(db)("BEGIN TRANSACTION;");
    await run(db)("DROP TABLE IF EXISTS quiz");
    await run(db)("DROP TABLE IF EXISTS questions");
    await run(db)("DROP TABLE IF EXISTS quiz_session");
    await run(db)("DROP TABLE IF EXISTS quiz_results");

    await run(db)('CREATE TABLE quiz (id INTEGER PRIMARY KEY AUTOINCREMENT, quiz_name TEXT);');
    await run(db)('CREATE TABLE questions (id INTEGER PRIMARY KEY AUTOINCREMENT, quiz_id INTEGER, question TEXT, \
                   solution INTEGER, penalty INTEGER, FOREIGN KEY(quiz_id) REFERENCES quiz(id));');
    for (const quiz of quizes) {
        await run(db)('INSERT INTO quiz (quiz_name) values (?)', [quiz.name]);
        const id = await get(db)("SELECT last_insert_rowid() as id");
        for (const question of quiz.questions) {
            await run(db)('INSERT INTO questions (quiz_id, question, solution, penalty) values (?, ?, ?, ?)',
            [id.id, question.question, question.solution, question.penalty]);
        }
    }

    await run(db)('CREATE TABLE quiz_session (id INTEGER PRIMARY KEY AUTOINCREMENT, quiz_id NUMBER, user_id NUMBER, \
                   score NUMBER, start_time TEXT, FOREIGN KEY(quiz_id) REFERENCES quiz(id), FOREIGN KEY(user_id) REFERENCES USER(id),\
                   UNIQUE(quiz_id, user_id))');

    await run(db)('CREATE TABLE quiz_results (id INTEGER PRIMARY KEY AUTOINCREMENT, quiz_session_id NUMBER, \
                   question_id NUMBER, penalty NUMBER, time_spent NUMBER, FOREIGN KEY(quiz_session_id) \
                   REFERENCES quiz_session(id), FOREIGN KEY(question_id) REFERENCES question(id) \
                   UNIQUE(quiz_session_id, question_id));');
    await run(db)("COMMIT TRANSACTION;");
    db.close();
}

interface QuestionResult {
    questionId: number;
    question: string;
    solution: number;
    penaltyGiven: number;
    timeSpent: number;
    avgTime: number
}

interface QuizSession {
    quizId: number;
    quizName: string;
    questionResults: QuestionResult[];
}

async function getQuizes(db : sqlite3.Database, userId : number) {
    const quiz = await all(db)("SELECT * FROM quiz WHERE id NOT IN (SELECT quiz_id FROM quiz_session WHERE user_id = ? AND score != ?)", [userId, -1]);
    console.log(quiz);
    return quiz;
}

async function getUserQuizResult(db: sqlite3.Database, userId: number, quizId: number) : Promise<QuizSession | undefined> {
    const quiz = await get(db)("SELECT * FROM quiz WHERE id = ?", [quizId]);
    const quizSession = await get(db)("SELECT * FROM quiz_session WHERE quiz_id = ? AND user_id = ?", [quizId, userId]);
    if (quizSession === undefined) {
        return undefined;
    }

    const questionUserResults = await all(db)("SELECT * FROM quiz_results WHERE quiz_session_id = ?", [quizSession.id]);

    const questionResults: QuestionResult[] = [];
    for (const questionUserResult of questionUserResults) {
        const questionDesc = await get(db)("SELECT * FROM questions WHERE id = ?", [questionUserResult.question_id]);
        const avgTime = await get(db)("SELECT avg(time_spent) as avg_time FROM quiz_results WHERE question_id = ?",
            [questionUserResult.question_id]);

        questionResults.push({
            questionId: questionDesc.id,
            question: questionDesc.question,
            solution: questionDesc.solution,
            penaltyGiven: questionUserResult.penalty,
            timeSpent: Math.round(questionUserResult.time_spent * 100) / 100,
            avgTime: Math.round(avgTime.avg_time * 100) / 100
        });
    }

    const userQuizResult: QuizSession = { quizId, quizName: quiz.quiz_name, questionResults };
    console.log(userQuizResult);

    return userQuizResult;
}

async function getUserQuizSessions(db: sqlite3.Database, userId: number) {
    const quizSessions = await all(db)("SELECT * FROM quiz_session WHERE user_id = ?", [userId]);
    const quizResults: QuizSession[] = [];
    for (const quizSession of quizSessions) {
        getUserQuizResult(db, userId, quizSession.quiz_id).then((result: QuizSession | undefined) => {
            if (result !== undefined)
                quizResults.push(result);
        })
    }

    return quizSessions;
}

async function addUserQuizResult(db: sqlite3.Database, userId: number, quizId: number, score: number, questionResults: QuestionResult[]) {
    const quizSessionId = await get(db)("SELECT id FROM quiz_session WHERE  user_id = ? AND quiz_id = ?", [userId, quizId]);
    console.log(quizId, userId, quizSessionId, score, questionResults);
    try {
        await run(db)("BEGIN TRANSACTION");
        await run(db)("UPDATE quiz_session SET score = ? WHERE user_id = ? AND quiz_id = ?", [score, userId, quizId]);

        for (const questionResult of questionResults) {
            run(db)("INSERT INTO quiz_results (quiz_session_id, question_id, penalty, time_spent) VALUES (?, ?, ?, ?)",
                [quizSessionId.id, questionResult.questionId, questionResult.penaltyGiven, questionResult.timeSpent]);

        }
        await run(db)("COMMIT TRANSACTION");
    }
    catch (error){
        console.log(error);
        return false;
    }
    return true;
}

interface QuestionAnswer {
    questionId: number;
    answer: number;
    timeSpent: number;
}

interface QuizAnswers {
    quizId: number;
    userId: number;
    answers: QuestionAnswer[];
}

function isQuestionAnswer(object: any): object is QuestionAnswer {
    return 'questionId' in object &&
        'answer' in object &&
        'timeSpent' in object;
}

function isQuizAnswers(object: any): object is QuizAnswers {
    console.log('quizId' in object, 'userId' in object, 'answers' in object, Array.isArray(object.answers), object.answers.every(isQuestionAnswer))
    return 'quizId' in object &&
        'userId' in object &&
        'answers' in object &&
        Array.isArray(object.answers) &&
        object.answers.every(isQuestionAnswer);
}

async function checkUserAnswers(db: sqlite3.Database, userId: number, quizId: number, answers: QuizAnswers) {
    const results: QuestionResult[] = [];
    let score: number = 0;

    const prevScore = await get(db)("SELECT * FROM quiz_session WHERE quiz_id = ? AND user_id = ? AND score != -1", [quizId, userId]);
    if (prevScore !== undefined)
        return false;
    if (!isQuizAnswers(answers))
        return false;

    const totalTimeSpent = await get(db)("SELECT ((julianday(CURRENT_TIMESTAMP) - julianday(start_time)) * 86400.0) as time \
        FROM quiz_session WHERE quiz_id = ? AND user_id = ?", [quizId, userId]);

    for (const answer of answers.answers) {
        const solutionPenalty = await get(db)("SELECT solution, penalty, question FROM questions WHERE id = ?", answer.questionId);
        if (solutionPenalty.solution !== answer.answer) {
            results.push({
                questionId: answer.questionId,
                question: solutionPenalty.question,
                solution: solutionPenalty.solution,
                penaltyGiven: solutionPenalty.penalty,
                timeSpent: answer.timeSpent * totalTimeSpent.time / 100,
                avgTime: 0
            });
            score += solutionPenalty.penalty;
        }
        else
            results.push({
                questionId: answer.questionId,
                question: solutionPenalty.question,
                solution: solutionPenalty.solution,
                penaltyGiven: 0,
                timeSpent: answer.timeSpent * totalTimeSpent.time / 100,
                avgTime: 0
            });
    }

    score += totalTimeSpent.time;
    return await addUserQuizResult(db, userId, quizId, score, results);
}

async function getQuiz(db: sqlite3.Database, userId: number, quizId: number) {
    const quizName = await get(db)("SELECT quiz_name FROM quiz WHERE id = ?", quizId);
    if (quizName === undefined)
        return undefined;
    const questions = await all(db)("SELECT id, question, penalty FROM questions WHERE quiz_id = ?", [quizId]);
    console.log(userId, quizId, quizName, questions);

    return {id : quizId, name : quizName.quiz_name, questions};
}

async function startUserQuiz(db: sqlite3.Database, userId: number, quizId: number) {
    // User can solve at most one quiz at a time.
    const userUnfinishedQuiz = await get(db)("SELECT * FROM quiz_session WHERE user_id = ?", [userId]);
    if (userUnfinishedQuiz !== undefined && +userUnfinishedQuiz.score === -1 && +userUnfinishedQuiz.quiz_id !== +quizId)
        return false;

    const userSession = await get(db)("SELECT * FROM quiz_session WHERE user_id = ? AND quiz_id = ?", [userId, quizId]);
    if (userSession === undefined) {
        await run(db)("INSERT INTO quiz_session (quiz_id, user_id, score, start_time) VALUES (?, ? , ? , CURRENT_TIMESTAMP)", [quizId, userId, -1]);
        return true;
    }
    if (userSession.score === -1)
        return true;

    // User cannot solve one quiz more than once.
    return false;
}

async function getTopUsers(db: sqlite3.Database, quizId: number) {
    const topUsers = await all(db)("WITH Scores AS (SELECT * FROM quiz_session WHERE quiz_id = ? AND score != -1\
        ORDER BY score ASC LIMIT 5) \
        SELECT DISTINCT round(Scores.score, 3) as score, username FROM USERS \
        JOIN Scores ON Scores.user_id = users.id ORDER BY score ASC ", [quizId]);

    return topUsers;
}

module.exports = {
    initQuizDB, getQuizes, getUserQuizSessions, getTopUsers,
    getUserQuizResult, getQuiz, checkUserAnswers, startUserQuiz
}
