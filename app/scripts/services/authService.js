angular.module('auth.service',[])
  .factory('Auth', function ($http, $location, $window, apiEndpoint) {

    //submits post request to backend to login.
    var login = function (user) {
      return $http({
        method: 'POST',
        url: apiEndpoint.url + '/api/users/login',
        data: user
      })
      .then(function (resp) {
        // return resp.data.token;
        // $location.path('/');
        return resp.data;
      });
    };

    //submits post request to backend to signup
    var signup = function (user) {
      return $http({
        method: 'POST',
        url: '/api/users/signup',
        data: user
      })
      .then(function (resp) {
        $location.path('/');
        return resp.data;
      });
    };

    //checks to see if user has token
    var isAuth = function () {
      return !!$window.localStorage.getItem('com.app');
    };

    //signouts out users
    //redirects user to login page
    var signout = function () {
      $window.localStorage.removeItem('com.app');
      $location.path('/login');
    };

    //allows functions to be referenced
    return {
      login: login,
      signup: signup,
      isAuth: isAuth,
      signout: signout,
    };
  })