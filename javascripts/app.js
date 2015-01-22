var app = angular.module("recipeListView", []);

var recipeDataController = function($scope, $http, $log) {

    var onSearchComplete = function(response) {
        $log.info($scope.loadingClass);
        $scope.recipes = response.data.matches;
    };

    var onError = function(response) {
        $scope.error = 'Whoops!, something went wrong.'
    };

    $scope.search = function(term) {
        $log.info('searching for  ');
        $http.get('http://api.yummly.com/v1/api/recipes?_app_id=46ac308e&_app_key=16cf1340c02c27af105b7618247c5e16&maxResult=50&q=' + term)
            .then(onSearchComplete, onError);
    };
    // Create Recipe Url
    $scope.recipeUrl = 'http://www.yummly.com/recipe/';

    $scope.sgSortOrder = '-rating';

    $scope.secondsToMin = function(seconds) {
        var minutes = Math.ceil(seconds / 60);
        var time;
        if (minutes >= 60) {
            if (minutes % 60 === 0) {
                time = minutes / 60 + ' min';
            } else {
                time = Math.floor(minutes / 60) + ' hrs ' + (minutes - 60) + ' min';
            }
        } else {
            time = minutes + ' min';
        }

        return time;
    }
};

app.controller("recipeDataController", recipeDataController);
