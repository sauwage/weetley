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
    app.controller('weatherReport', function($scope, $http, $timeout, $q){
        $scope.townsNames = [];

        $scope.addTown = function(city){

            if(!city) {
                $scope.required = {
                    "border" : "2px dotted red"
                };
                return false;
            } else {
                $scope.required = {
                    "border" : "none"
                }
            };

            $http.get('http://api.openweathermap.org/data/2.5/forecast',{params: {appid : '8d37df734b83981d7ad5e4f21c004aa2',q : city,units: 'metric'}})
            .then(function(results) {
                $scope.myArray = results;
                var forecast = [];

                for(var i = 11; i <= 35; i += 8) {
                    console.log(i);
                    var newDateObject = new Date($scope.myArray.data.list[i].dt*1000).toLocaleDateString();
                    var newIcon = translateIcon($scope.myArray.data.list[i].weather[0].id);
                    var temp = $scope.myArray.data.list[i].main.temp.toFixed(1);
                    forecast.push({
                        date: newDateObject,
                        icon: newIcon,
                        temp: temp
                    });
                };
                $scope.townsNames.push({
                    name : $scope.myArray.data.city.name,
                    icon_today : translateIcon($scope.myArray.data.list[3].weather[0].id),
                    temp_today : $scope.myArray.data.list[3].main.temp.toFixed(1),
                    forecast : forecast
                });
                console.log($scope.townsNames);
            }, function(reason){
                $timeout(function(){
                    $scope.addTown(city);
                }, 500);
            });
            $scope.townToBeAdded = "";
        };

        $scope.init = function() {
            $scope.addTown('Tokyo');
            $scope.addTown('Berlin');
            $scope.addTown('San Francisco');
        };

        $scope.removeTown = function(x){
            $scope.townsNames.splice($scope.townsNames.indexOf(x),1);
        };
    });
})();
