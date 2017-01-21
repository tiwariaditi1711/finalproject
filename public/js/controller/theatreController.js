'use strict';

module.exports = function($scope, $http) {
 

  var refresh = function () {
        $http.get('/theatre/getTheatre').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.theatreList = response;
            $scope.theatre = "";
        });
    };

    refresh();

    $scope.addTheatre = function () {
                          
                            $http.post('/theatre/addTheatre', $scope.post).success(function (response) {
                                console.log(response);
                                console.log("CREATE IS SUCCESSFUL");
                                refresh();
                            });
                           
                        
        console.log($scope.contact);
       
    };

    $scope.removeTheatre = function (theatre) {
        //console.log(id);
        $http.delete('/theatre/deleteTheatre/' + theatre._id).success(function (response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
    };

    $scope.editTheatre = function (movie) {
         $http.get('/theatre/getTheatre/' + theatre._id).success(function (response) {
            $scope.theatre = response[0];
        });
    }; 

    $scope.updateTheatre = function () {
        console.log("REACHED UPDATE");
        console.log($scope.theatre._id);
        $http.put('/theatre/updateTheatre/' + $scope.theatre._id, $scope.theatre).success(function (response) {
            console.log(response);
            refresh();
        })
    }
};

