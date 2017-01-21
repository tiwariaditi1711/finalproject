'use strict';

module.exports = function($scope, $http) {
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




     $(function() {
            $( "#datepicker-1" ).datepicker();
         });



 

  var refresh = function () {
        $http.get('/theatre/getTheatre').success(function (response) {
            console.log(response);
            $scope.theatreList = response;
            console.log("theatreList");
            $scope.theatre = "";
        });
    };

 $scope.Hour='';
 $scope.Minute='';
 $scope.Am_Pm='';
 $scope.timeAr = [];

$scope.insertArray=function(){
  $scope.timing=$scope.Hour+':'+$scope.Minute+''+$scope.Am_Pm;

        $scope.timeAr.push($scope.timing);
        $scope.timing = '';
};

$scope.removeArray = function(mapping) {
        $scope.timeAr.splice(mapping, 1);
      console.log(mapping);
    };

$scope.hourshowSelectValue = function(Hour) {
$scope.Hour=Hour;
    console.log(Hour);
};

$scope.minuteshowSelectValue = function(Minute) {
  $scope.Minute=Minute;
    console.log(Minute);
};


$scope.ampmshowSelectValue = function(Am_Pm) {
  $scope.Am_Pm=Am_Pm;
    console.log(Am_Pm);
};



    var refresh1 = function () {
        $http.get('/movie/getMovie').success(function (response) {
            console.log(response);
            $scope.movieList = response;
            console.log(movieList);
        });
    };

var refresh_mapping = function () {
        $http.get('/mapping/getMapping').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.mappingList = response;
            //$scope.mappingList = "";
        });

    };

    refresh_mapping();

    

    $scope.addMapping = function () {
                        $scope.post.ar=$scope.timeAr;
                            $scope.post.showdate=$('#datepicker-1').val();

                          
                            $http.post('/mapping/addMapping', $scope.post).success(function (response) {
                                console.log(response);
                                console.log("CREATE IS SUCCESSFUL");
                                refresh();
                            });
                           
                           var val='true';
                            $http.put('/movie/updatemoviestatus/'+ $scope.post.moviTitle+'/'+val).success(function (response) {
                                console.log(response);
                 });
        

                        
         refresh_mapping();
       
    };


    $scope.removeMapping = function (mappingList) {
        //console.log(id);
        var x= confirm("Are you sure you want to delete ?");
        if(x){
            $http.delete('/mapping/deleteMapping/' + mappingList._id).success(function (response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });

        $http.get('/mapping/selmoviename/'+mappingList.moviTitle).success(function (response) {
            len=response.length;
            alert("len "+len);
            if(len==0)
            {
              var val='false';
         $http.put('/movie/updatemoviestatus/'+mappingList.moviTitle+'/'+val).success(function (response) {
                 });
            }
          });
          refresh_mapping();
        }

  };

    };

  //  $scope.editMapping = function () {
    //     $http.get('/mapping/getMapping/' + mapping._id).success(function (response) {
      //      $scope.mapping = response;
        //});
     //};    
    

    //$scope.updateMapping = function () {
      //  console.log("REACHED UPDATE");
        
        //console.log($scope.mapping._id);
        //$http.put('/mapping/updateMapping/' + $scope.mapping._id, $scope.mapping).success(function (response) {
          //  console.log(response);
           // refresh();
        //})
    //};


   





