
var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'), //parses information from POST


//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))


var mongoose = require('mongoose');

var loginSchema = mongoose.Schema({
 
  username: String,
  password: String
   
  
 });
var Login = mongoose.model('Login', loginSchema, 'login');

//Logging
  
 router.post('/register', function(req, res){
 console.log(req.body);
  
 
  var username = req.body.username;
  var passport = req.body.passport;
  

  var login = new Login({
   
    username:username,
    password:password  
  });

  login.save(function(err, docs){
    if ( err ) throw err;
    console.log("Registered Successfully");
    res.json(docs);
  });


  })
 // catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;

  
  

