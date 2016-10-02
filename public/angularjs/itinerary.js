var itinerary = angular.module('itinerary', []);
itinerary.controller('validateItinerary', function($scope, $http) {
	$scope.itineraries = [];
	$http.get("https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json").then(function(response){
			$scope.airports = response.data;
		});

	$scope.add = function() {
		$http({
			method : "POST",
			url : '/checkequal',
			data : {
				"source" : $scope.source.code,
				"destination" : $scope.destination.code
			}
		}).success(function(data) {
			if(!Boolean(data.equals)){
				$scope.itineraries.push({
				"source": $scope.source,
				"destination": $scope.destination
			});
				$scope.error = "";
			}
			else
			{
				$scope.error = "Please enter different source and destination";
			}

		}).error(function(error) {

		});
	};
});
