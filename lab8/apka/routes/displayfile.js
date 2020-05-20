
//import * as fs from 'fs';
var promisify = require('util').promisify;

var fs = require('fs')
var bd = require('../scripts/database_operations')

var express = require('express');
var router = express.Router();

function sendFile(url, res) {
    console.log("showing " + url)
    fs.open(url.slice(1), 'r', (err, fd) => {
        if (err) {
            console.log('Taki plik nie istnieje :(', err);
            res.render('index', { title: 'Express' });
            return;
        }
        fs.readFile(fd, 'utf8', (err, data) => {
            if (err) {
                return;
            }

            console.log("XD");
            bd.addData(url.slice(1));
            console.log(data.slice(0, 10));
            res.send(data);
            fs.close(fd, () => {});
            
        });
    });
}


/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/


router.get('*', function(req, res) {
    console.log("XD");
    sendFile(req.originalUrl, res);
    
    //res.redirect("http://www.mysite.com/");
  });


  module.exports = router;