var cart = angular.module('cart', []);
cart.controller('ShoppingCart', function($scope, $http) {

	$scope.add = function() {
		$http({
			method : "POST",
			url : '/addtocart',
			data : {
				"quantity" : $scope.quantity,
				"price" : $scope.price,
				"image" : $scope.image,
				"name" : $scope.name
			}
		}).success(function(data) {
			$scope.total = data.total;
		});
	};
});
