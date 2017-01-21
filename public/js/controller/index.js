'use strict';

var app = require('angular').module('movieApp');

app.controller('BookingController', require('./bookingController'));
app.controller('CancellationController', require('./cancellationController'));
app.controller('HomeController', require('./homeController'));
app.controller('MovieController', require('./movieController'));
app.controller('TheatreController', require('./theatreController'));
app.controller('MappingController', require('./mappingController'));
app.controller('SeatsController', require('./seatsController'));
app.controller('PaymentController', require('./paymentController'));
app.controller('BookNowController', require('./bookNowController'));
app.controller('LoginController', require('./loginController'));
app.controller('LogoutController', require('./logoutController'));
app.controller('RegisterController', require('./registerController'));
