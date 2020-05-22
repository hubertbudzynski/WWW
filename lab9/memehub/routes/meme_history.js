var express = require('express');
var router = express.Router({ mergeParams: true });
var memes = require('../models/models');
var createError = require('http-errors');

router.get('/:memeId', function (req, res, next) {
    let meme = get_meme(req.params.memeId);
    
    if (meme === undefined) {
      //res.render('error');
      next(createError(404));
      return;
    }
    res.render('meme', { meme: meme})
});

router.post('/:memeId', function (req, res) {
  let meme = get_meme(req.params.memeId);
  if (meme === undefined) {
    res.render('error');
    return;
  }

  let price = req.body.price;
  memes.change_price(req.params.memeId, price);
  console.log(req.body.price);
  res.render('meme', { meme: meme })
})

function get_meme(id) {
    return memes.get_meme(id);
}

 module.exports = router;