var express = require('express');
var router = express.Router();
const { getTopMemes } = require('../src/meme_db');
const { loginUser } = require('../src/user_db');

/* GET home page. */
router.get('/', function(req, res) {
    if (!req.session.views)
        req.session.views = {};
    if (req.session.views[req.path] == undefined)
        req.session.views[req.path] = 1;
    else
        req.session.views[req.path]++;

    getTopMemes(req.db).then((memes) => {
        res.render('index', {
            title: 'Meme market',
            message: 'Hello there!',
            memes: memes,
            views: req.session.views[req.path],
            user_id: req.session.user_id,
            user: req.session.login
        })
    })

});

router.post('/', function(req, res, next) {
    loginUser(req.db, req.body.login).then((user) => {
        if (user != undefined) {
            req.session.user_id = user.id;
            req.session.login = user.login;
        }
        res.redirect('/');
    });
});

router.get('/logout', function(req, res, next) {
    delete(req.session.login);
    delete(req.session.user_id);
    res.redirect('/');
});

module.exports = router;