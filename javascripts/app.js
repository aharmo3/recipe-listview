/*
    var app = angular.module("recipes", ['ngResource']);


    app.factory('YummyAPI', ['$resource',
    function($resource) {
    return $resource("http://api.yummly.com/v1/api/recipes?_app_id=46ac308e&_app_key=16cf1340c02c27af105b7618247c5e16&maxResult=50");
    }
    ]);

    app.controller('recipeDataController', ['$scope', 'YummyAPI',
    function($scope, YummyAPI) {
    $scope.recipes = [];
    YummyAPI.get(function(results) {
      $scope.recipes = results.matches;
    });
    // Create Recipe Url
    $scope.recipeUrl = 'http://www.yummly.com/recipe/';
    }
    ]);*/

var app = angular.module("recipeListView", []);

var recipeDataController = function($scope, $http, $log) {

	var onSearchComplete = function(response) {
		$log.info($scope.loadingClass);
		$scope.recipes = response.data.matches;
	};

	var onError = function(response){
		$scope.error = 'Whoops!, something went wrong.'
	};
	
	$scope.search = function(term) {
		$log.info('searching for  ');
		$http.get('http://api.yummly.com/v1/api/recipes?_app_id=46ac308e&_app_key=16cf1340c02c27af105b7618247c5e16&maxResult=50&q=' + term)
			.then(onSearchComplete, onError);
	};
	
	$scope.sgSortOrder = '-rating';

};

app.controller("recipeDataController", recipeDataController);