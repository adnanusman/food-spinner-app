var foodapp = angular.module("foodApp", ["ngRoute"]);

foodapp.config(function($routeProvider)	{
	$routeProvider

	.when('/', {
		templateUrl: "pages/main.html",
		controller: "mainController"
	})

	.when('/list', {
		templateUrl: "pages/list.html",
		controller: "listController"
	})

	.otherwise({
	 	redirectTo: '/'
	});

});

foodapp.service("foodGenerator", function() {

	// Check if Data already exists in LocalStorage
	if(localStorage.foodItems !== undefined) {
		this.foodItems = JSON.parse(localStorage.foodItems);
	} else {
		// Assign Data to Local Storage
		this.stringifiedItems = JSON.stringify(['Food 1', 'Food 2', 'Food 3', 
								'Food 4', 'Food 5', 'Food 6', 'Food 7']);
		localStorage.foodItems = this.stringifiedItems;
		this.foodItems = localStorage.foodItems;
	}

	this.generateNumber = function getRandomArbitrary(min, max) {
 		 return Math.round(Math.random() * (max - min));
	}

})

foodapp.controller("mainController", ["$scope", "foodGenerator", function($scope, foodGenerator) {

	$scope.randomFood = 'empty';
	$scope.submit = function() {
		$scope.randomNumber = foodGenerator.generateNumber(1, foodGenerator.foodItems.length);
		$scope.randomFood = foodGenerator.foodItems[$scope.randomNumber];
	}

	$scope.clear = function() {
		$scope.randomFood = '';
	}

}])

foodapp.controller("listController", ["$scope", "foodGenerator", function($scope, foodGenerator) {

	$scope.list = angular.forEach(foodGenerator.foodItems, function (value, key) {
		console.log(value, key);
		if (key in foodGenerator.foodItems) {
			return value;
		}
	})

	$scope.addItems = function(newItem) {
		// console.log(newItem);
		// if (newItem === undefined) {
		// 	return false;
		// } else {
			$scope.tempStorage = foodGenerator.foodItems;
			$scope.tempStorage.push(newItem);
			localStorage.foodItems = JSON.stringify($scope.tempStorage);
			$scope.newItem = '';
		// }
	}

	$scope.deleteItem = function (array, index) {
		array.splice(index, 1);
		localStorage.foodItems = JSON.stringify(array);
	}
}])