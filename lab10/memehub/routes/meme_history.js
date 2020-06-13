var express = require('express');
var router = express.Router({ mergeParams: true });
//var memes = require('../models/models');
var memes = require('../src/meme_db');
var createError = require('http-errors');
var bodyParser = require('body-parser')
var csrf = require('csurf');
const { getMeme, updatePrice } = require('../src/meme_db');
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });


router.get('/:memeId', csrfProtection, function(req, res, next) {
    if (!req.session.views)
        req.session.views = {};
    if (req.session.views[req.path] == undefined)
        req.session.views[req.path] = 1;
    else
        req.session.views[req.path]++;
    //let meme = get_meme(req.params.memeId);
    getMeme(req.db, req.params.memeId).then((meme) => {
        if (meme === undefined) {
            //res.render('error');
            next(createError(404));
            return;
        }
        res.render('meme', { meme: meme, csrfToken: req.csrfToken(), views: req.session.views[req.path], user: req.session.login });
    });
});

router.post('/:memeId', parseForm, csrfProtection, function(req, res) {
    if (req.session.login == undefined) {
        res.render('meme', { meme: meme, csrfToken: req.csrfToken(), views: req.session.views[req.path], user: req.session.login })
        return;
    }
    //let meme = get_meme(req.params.memeId);
    getMeme(req.db, req.params.memeId).then((meme) => {
        if (meme === undefined) {
            res.render('error');
            return;
        }

        let price = req.body.price;
        updatePrice(req.db, req.params.memeId, price, req.session.user_id).then(() => {
            //memes.change_price(req.params.memeId, price);
            getMeme(req.db, req.params.memeId).then((meme) => {
                if (meme === undefined) {
                    res.render('error');
                    return;

                }
                res.render('meme', { meme: meme, csrfToken: req.csrfToken(), views: req.session.views[req.path], user: req.session.login })
            })
        });

    })
});

function get_meme(id) {
    return memes.get_meme(id);
}

module.exports = router;