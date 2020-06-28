var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sqlite3 = require('sqlite3').verbose()

var indexRouter = require('./routes/index');
var quizRouter = require('./routes/quiz')
var apiRouter = require('./routes/api')
var resultsRouter = require('./routes/results')

var session = require('express-session');
var FileStore = require('session-file-store')(session);



var app = express();

var sqliteStoreFactory = require('express-session-sqlite');
const { getLastPassId } = require('./compiled-js/user_database');
 
const SqliteStore = sqliteStoreFactory.default(session)
 
app.use(session({
    store: new SqliteStore({
      // Database library to use. Any library is fine as long as the API is compatible
      // with sqlite3, such as sqlite3-offline
      driver: sqlite3.Database,
      // for in-memory database
      // path: ':memory:'
      path: 'session.db',
      // Session TTL in milliseconds
      ttl: 900000,
      // (optional) Session id prefix. Default is no prefix.
      prefix: 'sess:',
      // (optional) Adjusts the cleanup timer in milliseconds for deleting expired session rows.
      // Default is 5 minutes.
      cleanupInterval: 900000
    }),
    resave: false,
    saveUninitialized: true,
    secret: "keyboard cat"
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    req.db = new sqlite3.Database('baza.db');
    if (req.session.user_id !== undefined && req.session.user_id !== null && req.session.user_id !== "") {
        getLastPassId(req.session.user_id, req.db).then((pass_id) => {
            if (pass_id !== req.session.last_pass_id) {
                delete req.session.user_id;
                delete req.session.login;
            }
        });

        next();
    }
    else
        next();
})

app.use('/', indexRouter);
app.use('/quiz', quizRouter);
app.use('/api', apiRouter);
app.use('/results', resultsRouter);
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