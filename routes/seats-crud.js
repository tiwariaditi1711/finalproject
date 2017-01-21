
var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'), //parses information from POST


//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))


var mongoose = require('mongoose');

var seatsSchema = mongoose.Schema({
 
  moviTitle: String,
  theatre: String,
  city: String,
  showdate: String,
  seat_no: [],
  quantity: String,
  amount: String,
  e_mail: String,
  phone_no: String,
  bookdate: Date 
  
 });
var Seats = mongoose.model('Seats', seatsSchema, 'seats');

//Seating
router.get('/bookedseats/:t/:th/:s', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Seats.find({moviTitle:req.params.t,theatre:req.params.th,showdate:req.params.s}, function (err, docs) {
         res.json(docs);
         
    });
});

router.get('/selectTickets/:t/:e', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Seats.find({moviTitle:req.params.t,e_mail:req.params.e}, function (err, docs) {
         res.json(docs);
         
    });
});

router.post('/newTicket/:t/:c/:t1/:s/:sn/:sq/:a/:e/:p/:dt', function(req, res){
 console.log(req.body);
  
 
  
  var title = req.params.t;
  var city = req.params.c;
  var theatre = req.params.t1;
  var showdate = req.params.s;
  var seat_no = JSON.parse(req.params.sn);
  var quantity = req.params.sq;
  var amount = req.params.a;
  var e_mail = req.params.e;
  var phone_no = req.params.p;
  var bookdate = req.params.dt;
  

  var seats = new Seats({
   
    moviTitle: title,
    theatre: theatre,
    city: city,
    showdate: showdate,
    seat_no: seat_no,
    quantity: quantity,
    amount: amount,
    e_mail: e_mail,
    phone_no: phone_no,
    bookdate:bookdate
   
  });

 seats.save(function(err, docs){
    if ( err ) throw err;
    console.log("Seats Saved Successfully");
    res.json(docs);
  });


  })

router.delete('/deleteTicket/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Seats.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/updateSeats/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Seats.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
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



