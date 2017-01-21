'use strict';

module.exports = function($scope, $http, $rootScope, $location) {
  $scope.home = 'home';
 
 var refresh = function () {
        $http.get('/movie/getMovie').success(function (response) {
            console.log(response);
            $scope.movieList = response;
            
        });
    };

    refresh();


    var refresh1 = function () {
        $http.get('/theatre/getTheatre').success(function (response) {
            console.log(response);
            $scope.theatreList = response;
            $scope.theatre = "";
        });
    };

    refresh1();

$scope.nextPage=function(aditi,tiwari){
$rootScope.moviename=aditi;
$rootScope.poster=tiwari;
$location.path('/showTiming');
};


     $(function() {
            $( "#datepicker-1" ).datepicker();
         });

};


