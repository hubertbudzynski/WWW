var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sqlite3 = require('sqlite3').verbose();
var session = require('express-session')
var sessionSQL = require('express-session-sqlite');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var memeRouter = require('./routes/meme_history');
const { Database } = require("sqlite3");
var app = express();
app.use(cookieParser())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var db = new sqlite3.Database('baza.sqlite');

var meme_db = require("./src/meme_db");
var user_db = require("./src/user_db");

user_db.initUsers(db).then((aid) => {
    meme_db.initDB(db, aid);
});



app.use((req, _res, next) => {
    req.db = new Database("baza.sqlite");
    next();
});

const SqliteStore = sessionSQL.default(session);
app.use(session({
    store: new SqliteStore({
        driver: sqlite3.Database,
        path: 'session.sqlite',
        ttl: 900000,
        prefix: 'sess:',
        cleanupInterval: 900000
    }),
    resave: false,
    saveUninitialized: true,
    secret: 'mImUw'
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/meme', memeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;