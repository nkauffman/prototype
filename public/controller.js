var myApp = angular.module('myApp', []);

myApp.factory('currentUser', function() {
	return {name: String};
})

myApp.config(function($routeProvider) {
	$routeProvider.when('/',
		{
			templateUrl:"front.html",
			controller:"frontCtrl"
		}).when('/:user',
		{
			templateUrl:"user.html",
			controller:"userCtrl"
		}).when('/:user/updateInfo',
		{
			templateUrl:"updateInfo.html",
			controller:"infoCtrl"
		}).when('/:user/changePassword',
		{
			templateUrl:"changePassword.html",
			controller:"passwordCtrl"
		})   
})

//---------------------------------------------------------------------------------
myApp.controller("frontCtrl", function($scope, $http, $location, currentUser) {
	
	$scope.userData = {userName: '', password: ''}

	$scope.createUser = function() {
		$http.post('/api/users', $scope.userData).success(function(data) {
			console.log(data);
		})
	}

	$scope.logIn = function(userName, password) {
		$http.get('/api/login/' + userName + '/' + password).success(function(data) {
			
			if (data == 'Valid login') {
				currentUser.name = userName;
				$location.path(userName);
			} else if (data == 'Invalid login') {
				$location.path('/');
				alert("That was invalid login information.");
			}
		})
	} 
})

//-------------------------------------------------------------------------------
myApp.controller("userCtrl", function($scope, $http, $location, currentUser) {

	$http.get('/api/attrs/' + currentUser.name).success(function(data) {
		$scope.userInfo = data;
	})

	$scope.update = function() {
		$location.path(currentUser.name + '/updateInfo');	
	}

	$scope.changePassword = function() {
		$location.path(currentUser.name + '/changePassword');
	}

	$scope.deleteUser = function() {
		$http.delete('/api/users/' + currentUser.name).success(function(data) {
			$location.path('/');
			alert(data);
		})
	}

	$scope.logOut = function() {
		$location.path('/');
	}
})

//-------------------------------------------------------------------------------
myApp.controller("infoCtrl", function($scope, $http, $location, currentUser) {
	
	$scope.done = function() {
		$http.put('/api/attrs/' + currentUser.name, $scope.userInfo).success(function(data) {
			$location.path(currentUser.name);
		})
	}

	$scope.cancel = function() {
		$location.path('/' + currentUser.name);
	}
	
})

//-------------------------------------------------------------------------------
myApp.controller("passwordCtrl", function($scope, $http, $location, currentUser) {

	$scope.change = function() {

		$http.put('/api/users/' + currentUser.name, $scope.password).success(function(data) {
			if (data == 'Password Changed') {
				$location.path(currentUser.name);
			} else if (data == 'Invalid') {
				alert('You entered an invalid old password');
			}
		})
	}

	$scope.cancel = function() {
		$location.path('/' + currentUser.name);
	}

})