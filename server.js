var logger = require('morgan');
var express = require('express');
var path = require('path');
var routes = require('./routes/movie-crud');
var theatres = require('./routes/theatre-crud');
var mapping_routes = require('./routes/mapping-crud');
var seat_routes = require('./routes/seats-crud');
var login_routes = require('./routes/login-crud');
var passport_authentication = require('./routes/passport-crud');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;



var bodyParser=require('body-parser');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// user schema/model
var User = require('./models/user.js');

//passport validation and authentication
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/movie', routes);
app.use('/theatre',theatres);
app.use('/mapping', mapping_routes);
app.use('/seats', seat_routes);
app.use('/user', passport_authentication)


var mongo = require('mongodb');
var mongoose = require('mongoose');
var dbHost = 'mongodb://localhost:27017/test';
mongoose.connect(dbHost);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log("Connected to DB");
});


// Only load this middleware in dev mode (important).
if (app.get('env') === 'development') {
  var webpackMiddleware = require("webpack-dev-middleware");
  var webpack = require('webpack');

  var config = require('./webpack.config');

  app.use(webpackMiddleware(webpack(config), {
    publicPath: "/build",

    headers: { "X-Custom-Webpack-Header": "yes" },

    stats: {
      colors: true
    }
  }));

}



var server = app.listen(8000, function () {
  console.log('listening on port 8000');
});









