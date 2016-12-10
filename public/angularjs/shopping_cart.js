var cart = angular.module('cart', []);
cart.controller('ShoppingCart', function($scope, $http) {
	$scope.products = [{
		"product_name" : "MacBook Air 13.3-Inch Laptop",
		"product_quantity" : 0,
		"product_price" : 887.99,
		"product_image" : "http://www.interestingreality.com/wp-content/uploads/2016/01/apple-laptop-battery-replacement.gif"					
	},
	{
		"product_name" : "Wireless Bluetooth Headphones",
		"product_quantity" : 0,
		"product_price" : 15.29,
		"product_image" : "http://cdn2.greatfon.com/uploads/picture/751/69751/naushniki-kraski-fon.jpg"
	},
	{
		"product_name" : "Makeup Brush Set",
		"product_quantity" : 0,
		"product_price" : 11.04,
		"product_image" : "https://s-media-cache-ak0.pinimg.com/736x/f9/37/0c/f9370cfd63c877a42e7d794224e847bb.jpg"
	},
	{
		"product_name" : "Lemon Squeezer",
		"product_quantity" : 0,
		"product_price" : 8.99,
		"product_image" : "http://mco-d2-p.mlstatic.com/exprimidor-de-limon-chef-prioridad-y-exprimidor-de-limon-700321-MCO20738767706_052016-O.jpg"
	},
	{
		"product_name" : "Tide Detergent",
		"product_quantity" : 0,
		"product_price" : 10.67,
		"product_image" : "http://www.hodhodnews.ir/upload/20160704/70653839581.jpg"
	}];
	
	$http({
		method : "POST",
		url : '/fetchCart',
	}).success(function(data) {
		$scope.cart = data.cart;
		$scope.total = data.total;
	});

	$scope.addToCart = function() {
		$scope.errorMessage = "";
		var cart = [];
		var negativeQuantity = false;
		for(var i=0;i<$scope.products.length;i++){
			if($scope.products[i].product_quantity > 0){
				cart.push ($scope.products[i]);
			} else if($scope.products[i].product_quantity < 0) {
				negativeQuantity = true;
				break;
			}
		}
		
		if(!negativeQuantity) {
			$http({
				method : "POST",
				url : '/addtocart',
				data : {
					"cart" : cart
				}
			}).success(function(data) {
				$scope.cart = data.cart;
				$scope.total = data.total;
				for(var i = 0; i < $scope.products.length; i++) {
					$scope.products[i].product_quantity = 0;
				}
			});
		} else {
			$scope.errorMessage = "Select Positive values for quantity!";
		}
	};
});
