var express = require('express');
var router = express.Router();
var memes = require('../models/models');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        title: 'Meme market',
        message: 'Hello there!',
        memes: memes.topMemes,
        headerMeme: memes.headerMeme
    })
});

module.exports = router;