module.exports = function($scope, $http, $rootScope,$location ){
  var bookingShow=function(){
  var data=$rootScope.moviename;
  $http.get('/mapping/selmoviename/'+data).success(function(response){
    $scope.booking=response;
// $rootScope.allData=$scope.booking;
// console.log($rootScope.allData);

  });
  $http.get('/theatre/getTheatre').success(function (response) {
    $scope.theatreList=response;
    console.log($scope.theatreList);
  });

  $http.get('/mapping/getMapping').success(function (response) {
    $scope.mappingList=response;
  });



};
bookingShow();

$scope.showtimings=function (a,x) {
  $rootScope.showTime=a;
  $rootScope.Moviename=x.moviTitle;
  $rootScope.TheatreName=x.theatre;
  $rootScope.city=x.city;
  $rootScope.rootDate=x.showdate;
  console.log($rootScope.city);
  $location.path('/seats');
};

$scope.moviDate=[];
var showDates=function() {
for(i=0;i<6;i++)
{
  var date=new Date();
  date.setDate(date.getDate()+i);
  $scope.moviDate[i]=date;
  // $scope.moviDate[i].toString();
}
};
showDates();


};

