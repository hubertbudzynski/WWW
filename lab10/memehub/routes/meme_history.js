var express = require('express');
var router = express.Router({ mergeParams: true });
var memes = require('../models/models');
var createError = require('http-errors');
var bodyParser = require('body-parser')
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });


router.get('/:memeId', csrfProtection, function(req, res, next) {
    let meme = get_meme(req.params.memeId);

    if (meme === undefined) {
        //res.render('error');
        next(createError(404));
        return;
    }
    res.render('meme', { meme: meme, csrfProtection: csrfProtection })
});

router.post('/:memeId', parseForm, csrfProtection, function(req, res) {
    let meme = get_meme(req.params.memeId);
    if (meme === undefined) {
        res.render('error');
        return;
    }

    let price = req.body.price;
    memes.change_price(req.params.memeId, price);
    res.render('meme', { meme: meme, csrfProtection: csrfProtection })
})

function get_meme(id) {
    return memes.get_meme(id);
}

module.exports = router;