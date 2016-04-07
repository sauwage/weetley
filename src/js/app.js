var weatherJson = require('./icons.json');
(function(){
    var translateIcon = function(id) {
        var prefix = 'wi wi-';
        var code = id;
        var icon = weatherJson[code].icon;
        if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
            icon = 'day-' + icon;
        }
        icon = prefix + icon;
        return icon;
    };

    var app = angular.module('weetley',[]);
    app.controller('weatherReport', function($scope, $http, $timeout){
        $scope.townsNames = [];

        $scope.addTown = function(city){
            if(city == '') {
                $scope.required = {
                    "border" : "2px dotted red"
                }
            } else {
                $scope.required = {
                    "border" : "none"
                };
                $http({
                    url: 'http://api.openweathermap.org/data/2.5/weather',
                    method: "GET",
                    params: {
                        q : city,
                        units: 'metric',
                        appid : '8d37df734b83981d7ad5e4f21c004aa2'
                    }
                }).success(function(data){
                    $scope.townsNames.push({
                        id: translateIcon(data.weather[0].id),
                        name: data.name,
                        temp: data.main.temp
                    });
                }).error(function(){
                    $timeout(function(){
                        $scope.addTown(city);
                    }, 1000);
                });
            }

            $scope.townToBeAdded = "";
        };

        $scope.init = function() {
            $scope.addTown('Berlin');
            $scope.addTown('Prague');
            $scope.addTown('Stockholm');
        };

        $scope.removeTown = function(x){
            $scope.townsNames.splice($scope.townsNames.indexOf(x),1);
        };
    });
})();
