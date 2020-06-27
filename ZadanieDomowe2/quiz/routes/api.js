var express = require('express');
var router = express.Router();
var quizDB = require('../compiled-js/quiz_database');

router.get('/quiz/:quizId', function(req, res, next) {
    quizDB.getQuiz(req.db, req.session.user_id, req.params.quizId).then((quiz) => {
        if (quiz !== undefined) {
            quizDB.startUserQuiz(req.db, req.session.user_id, req.params.quizId).then(
                (valid) => {
                    if (valid)
                        res.json(quiz);
                    else
                        res.json({});
                })
        } else
            res.redirect('/');
    })

});

router.get('/quiz-list', function(req, res, next) {
    quizDB.getQuizes(req.db, req.session.user_id).then((quiz_list) => {
        if (quiz_list !== undefined) {
            res.json(quiz_list)
        } else
            res.redirect('/');
    })

});
module.exports = router;