"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var sqlite3 = __importStar(require("sqlite3"));
/* tslint:disable-next-line:no-var-requires */
var promisify = require("util").promisify;
/* tslint:disable-next-line:no-var-requires */
var quizes = require('./quiz_json');
var run = function (db) { return promisify(db.run.bind(db)); };
var get = function (db) { return promisify(db.get.bind(db)); };
var all = function (db) { return promisify(db.all.bind(db)); };
function initQuizDB() {
    return __awaiter(this, void 0, void 0, function () {
        var db, _i, quizes_1, quiz, id, _a, _b, question;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    sqlite3.verbose();
                    db = new sqlite3.Database('baza.db');
                    return [4 /*yield*/, run(db)("BEGIN TRANSACTION;")];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, run(db)("DROP TABLE IF EXISTS quiz")];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, run(db)("DROP TABLE IF EXISTS questions")];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, run(db)("DROP TABLE IF EXISTS quiz_session")];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, run(db)("DROP TABLE IF EXISTS quiz_results")];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, run(db)('CREATE TABLE quiz (id INTEGER PRIMARY KEY AUTOINCREMENT, quiz_name TEXT);')];
                case 6:
                    _c.sent();
                    return [4 /*yield*/, run(db)('CREATE TABLE questions (id INTEGER PRIMARY KEY AUTOINCREMENT, quiz_id INTEGER, question TEXT, \
                   solution INTEGER, penalty INTEGER, FOREIGN KEY(quiz_id) REFERENCES quiz(id));')];
                case 7:
                    _c.sent();
                    _i = 0, quizes_1 = quizes;
                    _c.label = 8;
                case 8:
                    if (!(_i < quizes_1.length)) return [3 /*break*/, 15];
                    quiz = quizes_1[_i];
                    return [4 /*yield*/, run(db)('INSERT INTO quiz (quiz_name) values (?)', [quiz.name])];
                case 9:
                    _c.sent();
                    return [4 /*yield*/, get(db)("SELECT last_insert_rowid() as id")];
                case 10:
                    id = _c.sent();
                    _a = 0, _b = quiz.questions;
                    _c.label = 11;
                case 11:
                    if (!(_a < _b.length)) return [3 /*break*/, 14];
                    question = _b[_a];
                    return [4 /*yield*/, run(db)('INSERT INTO questions (quiz_id, question, solution, penalty) values (?, ?, ?, ?)', [id.id, question.question, question.solution, question.penalty])];
                case 12:
                    _c.sent();
                    _c.label = 13;
                case 13:
                    _a++;
                    return [3 /*break*/, 11];
                case 14:
                    _i++;
                    return [3 /*break*/, 8];
                case 15: return [4 /*yield*/, run(db)('CREATE TABLE quiz_session (id INTEGER PRIMARY KEY AUTOINCREMENT, quiz_id NUMBER, user_id NUMBER, \
                   score NUMBER, start_time TEXT, FOREIGN KEY(quiz_id) REFERENCES quiz(id), FOREIGN KEY(user_id) REFERENCES USER(id),\
                   UNIQUE(quiz_id, user_id))')];
                case 16:
                    _c.sent();
                    return [4 /*yield*/, run(db)('CREATE TABLE quiz_results (id INTEGER PRIMARY KEY AUTOINCREMENT, quiz_session_id NUMBER, \
                   question_id NUMBER, penalty NUMBER, time_spent NUMBER, FOREIGN KEY(quiz_session_id) \
                   REFERENCES quiz_session(id), FOREIGN KEY(question_id) REFERENCES question(id) \
                   UNIQUE(quiz_session_id, question_id));')];
                case 17:
                    _c.sent();
                    return [4 /*yield*/, run(db)("COMMIT TRANSACTION;")];
                case 18:
                    _c.sent();
                    db.close();
                    return [2 /*return*/];
            }
        });
    });
}
function getQuizes(db, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var quiz;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, all(db)("SELECT * FROM quiz WHERE id NOT IN (SELECT quiz_id FROM quiz_session WHERE user_id = ? AND score != ?)", [userId, -1])];
                case 1:
                    quiz = _a.sent();
                    console.log(quiz);
                    return [2 /*return*/, quiz];
            }
        });
    });
}
function getUserQuizResult(db, userId, quizId) {
    return __awaiter(this, void 0, void 0, function () {
        var quiz, quizSession, questionUserResults, questionResults, _i, questionUserResults_1, questionUserResult, questionDesc, avgTime, userQuizResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, get(db)("SELECT * FROM quiz WHERE id = ?", [quizId])];
                case 1:
                    quiz = _a.sent();
                    return [4 /*yield*/, get(db)("SELECT * FROM quiz_session WHERE quiz_id = ? AND user_id = ?", [quizId, userId])];
                case 2:
                    quizSession = _a.sent();
                    if (quizSession === undefined) {
                        return [2 /*return*/, undefined];
                    }
                    return [4 /*yield*/, all(db)("SELECT * FROM quiz_results WHERE quiz_session_id = ?", [quizSession.id])];
                case 3:
                    questionUserResults = _a.sent();
                    questionResults = [];
                    _i = 0, questionUserResults_1 = questionUserResults;
                    _a.label = 4;
                case 4:
                    if (!(_i < questionUserResults_1.length)) return [3 /*break*/, 8];
                    questionUserResult = questionUserResults_1[_i];
                    return [4 /*yield*/, get(db)("SELECT * FROM questions WHERE id = ?", [questionUserResult.question_id])];
                case 5:
                    questionDesc = _a.sent();
                    return [4 /*yield*/, get(db)("SELECT avg(time_spent) as avg_time FROM quiz_results WHERE question_id = ?", [questionUserResult.question_id])];
                case 6:
                    avgTime = _a.sent();
                    questionResults.push({
                        questionId: questionDesc.id,
                        question: questionDesc.question,
                        solution: questionDesc.solution,
                        penaltyGiven: questionUserResult.penalty,
                        timeSpent: Math.round(questionUserResult.time_spent * 100) / 100,
                        avgTime: Math.round(avgTime.avg_time * 100) / 100
                    });
                    _a.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 4];
                case 8:
                    userQuizResult = { quizId: quizId, quizName: quiz.quiz_name, questionResults: questionResults };
                    console.log(userQuizResult);
                    return [2 /*return*/, userQuizResult];
            }
        });
    });
}
function getUserQuizSessions(db, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var quizSessions, quizResults, _i, quizSessions_1, quizSession;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, all(db)("SELECT * FROM quiz_session WHERE user_id = ?", [userId])];
                case 1:
                    quizSessions = _a.sent();
                    quizResults = [];
                    for (_i = 0, quizSessions_1 = quizSessions; _i < quizSessions_1.length; _i++) {
                        quizSession = quizSessions_1[_i];
                        getUserQuizResult(db, userId, quizSession.quiz_id).then(function (result) {
                            if (result !== undefined)
                                quizResults.push(result);
                        });
                    }
                    return [2 /*return*/, quizSessions];
            }
        });
    });
}
function addUserQuizResult(db, userId, quizId, score, questionResults) {
    return __awaiter(this, void 0, void 0, function () {
        var quizSessionId, _i, questionResults_1, questionResult, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, get(db)("SELECT id FROM quiz_session WHERE  user_id = ? AND quiz_id = ?", [userId, quizId])];
                case 1:
                    quizSessionId = _a.sent();
                    console.log(quizId, userId, quizSessionId, score, questionResults);
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 6, , 7]);
                    return [4 /*yield*/, run(db)("BEGIN TRANSACTION")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, run(db)("UPDATE quiz_session SET score = ? WHERE user_id = ? AND quiz_id = ?", [score, userId, quizId])];
                case 4:
                    _a.sent();
                    for (_i = 0, questionResults_1 = questionResults; _i < questionResults_1.length; _i++) {
                        questionResult = questionResults_1[_i];
                        run(db)("INSERT INTO quiz_results (quiz_session_id, question_id, penalty, time_spent) VALUES (?, ?, ?, ?)", [quizSessionId.id, questionResult.questionId, questionResult.penaltyGiven, questionResult.timeSpent]);
                    }
                    return [4 /*yield*/, run(db)("COMMIT TRANSACTION")];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [2 /*return*/, false];
                case 7: return [2 /*return*/, true];
            }
        });
    });
}
function isQuestionAnswer(object) {
    return 'questionId' in object &&
        'answer' in object &&
        'timeSpent' in object;
}
function isQuizAnswers(object) {
    console.log('quizId' in object, 'userId' in object, 'answers' in object, Array.isArray(object.answers), object.answers.every(isQuestionAnswer));
    return 'quizId' in object &&
        'userId' in object &&
        'answers' in object &&
        Array.isArray(object.answers) &&
        object.answers.every(isQuestionAnswer);
}
function checkUserAnswers(db, userId, quizId, answers) {
    return __awaiter(this, void 0, void 0, function () {
        var results, score, prevScore, totalTimeSpent, _i, _a, answer, solutionPenalty;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    results = [];
                    score = 0;
                    return [4 /*yield*/, get(db)("SELECT * FROM quiz_session WHERE quiz_id = ? AND user_id = ? AND score != -1", [quizId, userId])];
                case 1:
                    prevScore = _b.sent();
                    if (prevScore !== undefined)
                        return [2 /*return*/, false];
                    if (!isQuizAnswers(answers))
                        return [2 /*return*/, false];
                    return [4 /*yield*/, get(db)("SELECT ((julianday(CURRENT_TIMESTAMP) - julianday(start_time)) * 86400.0) as time \
        FROM quiz_session WHERE quiz_id = ? AND user_id = ?", [quizId, userId])];
                case 2:
                    totalTimeSpent = _b.sent();
                    _i = 0, _a = answers.answers;
                    _b.label = 3;
                case 3:
                    if (!(_i < _a.length)) return [3 /*break*/, 6];
                    answer = _a[_i];
                    return [4 /*yield*/, get(db)("SELECT solution, penalty, question FROM questions WHERE id = ?", answer.questionId)];
                case 4:
                    solutionPenalty = _b.sent();
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
                    _b.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    score += totalTimeSpent.time;
                    return [4 /*yield*/, addUserQuizResult(db, userId, quizId, score, results)];
                case 7: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
function getQuiz(db, userId, quizId) {
    return __awaiter(this, void 0, void 0, function () {
        var quizName, questions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, get(db)("SELECT quiz_name FROM quiz WHERE id = ?", quizId)];
                case 1:
                    quizName = _a.sent();
                    if (quizName === undefined)
                        return [2 /*return*/, undefined];
                    return [4 /*yield*/, all(db)("SELECT id, question, penalty FROM questions WHERE quiz_id = ?", [quizId])];
                case 2:
                    questions = _a.sent();
                    console.log(userId, quizId, quizName, questions);
                    return [2 /*return*/, { id: quizId, name: quizName.quiz_name, questions: questions }];
            }
        });
    });
}
function startUserQuiz(db, userId, quizId) {
    return __awaiter(this, void 0, void 0, function () {
        var userUnfinishedQuiz, userSession;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, get(db)("SELECT * FROM quiz_session WHERE user_id = ?", [userId])];
                case 1:
                    userUnfinishedQuiz = _a.sent();
                    if (userUnfinishedQuiz !== undefined && +userUnfinishedQuiz.score === -1 && +userUnfinishedQuiz.quiz_id !== +quizId)
                        return [2 /*return*/, false];
                    return [4 /*yield*/, get(db)("SELECT * FROM quiz_session WHERE user_id = ? AND quiz_id = ?", [userId, quizId])];
                case 2:
                    userSession = _a.sent();
                    if (!(userSession === undefined)) return [3 /*break*/, 4];
                    return [4 /*yield*/, run(db)("INSERT INTO quiz_session (quiz_id, user_id, score, start_time) VALUES (?, ? , ? , CURRENT_TIMESTAMP)", [quizId, userId, -1])];
                case 3:
                    _a.sent();
                    return [2 /*return*/, true];
                case 4:
                    if (userSession.score === -1)
                        return [2 /*return*/, true];
                    // User cannot solve one quiz more than once.
                    return [2 /*return*/, false];
            }
        });
    });
}
function getTopUsers(db, quizId) {
    return __awaiter(this, void 0, void 0, function () {
        var topUsers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, all(db)("WITH Scores AS (SELECT * FROM quiz_session WHERE quiz_id = ? AND score != -1\
        ORDER BY score ASC LIMIT 5) \
        SELECT DISTINCT round(Scores.score, 3) as score, username FROM USERS \
        JOIN Scores ON Scores.user_id = users.id ORDER BY score ASC ", [quizId])];
                case 1:
                    topUsers = _a.sent();
                    return [2 /*return*/, topUsers];
            }
        });
    });
}
module.exports = {
    initQuizDB: initQuizDB, getQuizes: getQuizes, getUserQuizSessions: getUserQuizSessions, getTopUsers: getTopUsers,
    getUserQuizResult: getUserQuizResult, getQuiz: getQuiz, checkUserAnswers: checkUserAnswers, startUserQuiz: startUserQuiz
};
