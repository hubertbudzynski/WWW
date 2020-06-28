var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

var userDB = require('../compiled-js/user_database');
const { logUser, changePassword } = require('../compiled-js/user_database');
var quizDB = require('../compiled-js/quiz_database');
/* GET home page. */
router.get('/', csrfProtection, function(req, res, next) {
    if (req.session.login !== undefined) {
        quizDB.getQuizes(req.db, req.session.login).then((quizes) => {
            res.render('index', { csrfToken: req.csrfToken(), user: req.session.login, quizes: quizes });
        })
    } else
        res.render('index', { csrfToken: req.csrfToken(), user: req.session.login });
});

router.post('/', csrfProtection, function(req, res, next) {
    if (req.body.action === "login") {
        logUser(req.body.login, req.body.password, req.db).then((user) => {
            if (user !== undefined) {
                req.session.login = user.username;
                req.session.user_id = user.id;
                req.session.last_pass_id = user.last_pass_id;
            }
            res.redirect('/');
        })
    } else if (req.body.action === "logout") {
        if (req.session.login)
            delete req.session.login;
        if (req.session.user_id)
            delete req.session.user_id;
        if (req.session.last_pass_id)
            delete req.session.last_pass_id;

        res.redirect('/');
    } else if (req.body.action === "change_password") {
        changePassword(req.session.user_id, req.body.new_password, req.db).then(() => {
            req.session.destroy();
            res.redirect('/');
        })
    }

});


module.exports = router;