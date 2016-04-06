var weatherJson = require('./icons.json');
(function(){    
    var translateIcon = function(id) {
    var prefix = 'wi wi-';
    var code = id;
    var icon = weatherJson[code].icon;
    // If we are not in the ranges mentioned above, add a day/night prefix.
    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
        icon = 'day-' + icon;
    }
    // Finally tack on the prefix.
    icon = prefix + icon;
    return icon;
    };

    var app = angular.module('weetley',[]);

    app.controller('weatherReport', function($scope, $http, $timeout){
        $scope.townsNames = [];

        var initialState = function(townName){
            $http({
                url: 'http://api.openweathermap.org/data/2.5/weather',
                method: "GET",
                params: {
                    q : townName,
                    units: 'metric',
                    appid : '8d37df734b83981d7ad5e4f21c004aa2'
                }
            }).success(function(data){
                $scope.townsNames.push({
                    name: data.name,
                    temp: data.main.temp
                });
            }).error(function(){
                $timeout(function(){
                    initialState(townName);
                }, 1000);
            });
        };

        $scope.init = function() {
            initialState('Berlin');
            initialState('Prague');
            initialState('Stockholm');
        };

        $scope.addTown = function(){
            $http({
                url: 'http://api.openweathermap.org/data/2.5/weather',
                method: "GET",
                params: {
                    q : $scope.townToBeAdded,
                    units: 'metric',
                    appid : '8d37df734b83981d7ad5e4f21c004aa2'
                }
            }).success(function(data){
                $scope.townsNames.push({
                    name: data.name,
                    temp: data.main.temp
                });
                console.log($scope.townsNames);
            });

            $scope.townToBeAdded = "";
        };

        $scope.removeTown = function(x){
            $scope.townsNames.splice($scope.townsNames.indexOf(x),1);
        };
    });
})();
