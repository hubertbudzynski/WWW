var express = require('express');
var router = express.Router();
var quizDB = require('../compiled-js/quiz_database');

router.get('/:quizId', function(req, res) {
    quizDB.getTopUsers(req.db, req.params.quizId).then((topScores) => {
        if (topScores == undefined) {
            res.redirect('/');
            return;
        }
        quizDB.getUserQuizResult(req.db, req.session.user_id, req.params.quizId).then((userResults) => {
            console.log(topScores, userResults)
            if (topScores !== undefined)
                res.render('results', { userResults, topScores });
            else
                res.redirect('/');
        })
    })

});

module.exports = router;