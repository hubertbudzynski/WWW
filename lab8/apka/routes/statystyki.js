var express = require('express');
var router = express.Router();
var js = require('../scripts/database_operations')

/* GET users listing. */

var data = js.getData();
router.get('/', function(req, res, next) {
  res.send(data);
});

module.exports = router;
