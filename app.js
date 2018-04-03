// set up ======================================================================
// get all the tools we need
var express = require('express');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
// var passport = require('passport');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongooseConnection = require('./database/db.js');
// var flash = require('connect-flash');

var app = express();

app.io = require('socket.io')();

// view engine setup
app.set('view engine', 'ejs');// set up ejs for templating

// app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// require('./config/passport')(passport); // pass passport for configuration

app.use(session({
    secret: 'random_secret_key',
    store: new mongoStore({
        mongooseConnection: mongooseConnection
    }),
    resave: false,
    saveUninitialized: true
}));

// required for passport
// app.use(passport.initialize());
// app.use(passport.session());// persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session


// set up our express application
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(path.join(__dirname, 'public')));

// routes ======================================================================
// var index = require('./routes/index')(passport);
var api = require('./routes/api')();
var index = require('./routes/app')();
// app.use('/', index);
app.use('/api', api);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
