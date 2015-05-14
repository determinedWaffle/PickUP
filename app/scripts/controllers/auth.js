angular.module('auth', [])

// create AuthController to handle login and signup functions
.controller('AuthController', function ($scope, $location, $window, Auth) {
  $scope.user = {};

  //allows user to sign in once submit button is clicked

  $scope.login = function () {
    Auth.login($scope.user)
      .then(function (credentials) {
        var user = {
          userId: credentials.id,
          username: credentials.username,
          createdAt: credentials.createdAt
        };
        //gives user a token stored in local storage
        $window.localStorage.setItem('com.app', JSON.stringify(user));
        //redirects users to home page
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  //allows users to signup once submit button is clicked

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (credentials) {
        var user = {
          userId: credentials.id,
          username: credentials.username,
          createdAt: credentials.createdAt
        };
        //gives user a token stored in local storage
        $window.localStorage.setItem('com.app', JSON.stringify(user));
        //redirects users to home page
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});
