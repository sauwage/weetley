(function(){
    var app = angular.module('weetley',[]);

    app.controller('weatherReport', function($scope){
        $scope.townsNames = [];
        $scope.addTown = function(){
            $scope.townsNames.push({
                name: $scope.townToBeAdded
            });
            $scope.townToBeAdded = "";
        };
    });
})();
