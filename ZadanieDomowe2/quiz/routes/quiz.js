var express = require('express');
var router = express.Router();
var quizDB = require('../compiled-js/quiz_database');
const { startUserQuiz } = require('../compiled-js/quiz_database');
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

router.get('/', csrfProtection, function(req, res) {
    res.render('quiz', { csrfToken: req.csrfToken() });
});

router.post('/:quizId', csrfProtection, function(req, res) {
    let answers = JSON.parse(req.body.answers);
    answers.userId = req.session.user_id;

    quizDB.checkUserAnswers(req.db, req.session.user_id, answers.quizId, answers).then((valid) => {
        if (valid)
            res.redirect('/results/' + answers.quizId);
        else
            res.redirect("/error");
    });
});

module.exports = router;