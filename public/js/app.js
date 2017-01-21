'use strict';


var angular = require('angular');
require('angular-route');

var app = angular.module('movieApp', [ 'ngRoute','angular.filter']);

require('../css/app.css');
require('../css/pstyle.css');
require('../css/seatstyles.css');



require('./controller');
require('./service');

app.config(function($routeProvider) {

  $routeProvider.when('/home', {
    templateUrl: 'views/home.html',
    controller: 'HomeController'
  })
  .when('/booking', {
    templateUrl: 'views/booking.html',
    controller: 'BookingController',
    access: {restricted: true}
  })
  .when('/cancellation', {
    templateUrl: 'views/cancellation.html',
    controller: 'CancellationController'
  })
  .when('/movie', {
    templateUrl: 'views/movie.html',
    controller: 'MovieController',
    access: {restricted: true}
  })
  .when('/theatre', {
    templateUrl: 'views/theatre.html',
    controller: 'TheatreController',
    access: {restricted: true}
  })
  .when('/mapping', {
    templateUrl: 'views/mapping.html',
    controller: 'MappingController',
    access: {restricted: true}
  })
  .when('/seats', {
    templateUrl: 'views/seats_select.html',
    controller: 'SeatsController'
  })
  .when('/payment', {
    templateUrl: 'views/payment.html',
    controller: 'PaymentController'
  })
  .when('/showTiming', {
    templateUrl: 'views/seats.html',
    controller: 'BookNowController'
  })
  .when('/confirmation', {
    templateUrl: 'views/confirmation.html',
    controller: 'PaymentController'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController',
    access: {restricted: false}
  })
  .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegisterController'
  })
  
  .when('/logout', {
    controller: 'LogoutController',
    access: {restricted: true}
  })
 
 
  .otherwise({
    redirectTo: '/home',
  });
});

//passport authentication

app.run(function ($rootScope, $location, $route, AuthService) {
   $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
       AuthService.getUserStatus()
       .then(function(){
         if (next.access.restricted && !AuthService.isLoggedIn()){
           $location.path('/login');
           $route.reload();
         }
       });
   });
 });
