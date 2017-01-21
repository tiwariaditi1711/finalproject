
var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'), //parses information from POST


//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))


var mongoose = require('mongoose');

var mappingSchema = mongoose.Schema({
 
  moviTitle: String,
  theatre: String,
  city: String,
  showdate: String,
  timeslot: []
  
 });
var Mapping = mongoose.model('Mapping', mappingSchema, 'mapping');

//Mapping
router.get('/getMapping', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Mapping.find({}, function (err, docs) {
         res.json(docs);
         
    });
});

router.get('/getMapping/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Mapping.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);
         
    });
});

router.post('/addMapping', function(req, res){
 console.log(req.body);
  
 
  var title = req.body.moviTitle;
  var theatre = req.body.theatre;
  var city = req.body.city;
  var showdate = req.body.showdate;
  var timeslot = req.body.ar;
  

  var mapping = new Mapping({
   
    moviTitle: title,
    theatre: theatre,
    city: city,
    showdate: showdate,
    timeslot: timeslot
    
   
  });

 mapping.save(function(err, docs){
    if ( err ) throw err;
    console.log(docs);
    res.json(docs);
  });


  })

router.delete('/deleteMapping/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Mapping.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.get('/selmoviename/:m',(function(req, res) {
      Mapping.find(
        {moviTitle:req.params.m},function(err, Data) {
          if (err) {
            return res.send(err);
           }
          res.send(Data);
  });
}));



router.put('/updateMapping/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Mapping.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      console.log(data);
      res.json(data);
    });
})


// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;



