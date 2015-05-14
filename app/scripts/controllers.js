angular.module('starter.controllers', [])

  .controller('AppCtrl', function($scope, $ionicModal, $timeout, Auth, $window) {
    'use strict';
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      console.log('Close login');
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
    };

    // Form data for the login modal
    $scope.signupData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/signup.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalSignup = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeSignup = function() {
      $scope.modalSignup.hide();
    };

    // Open the login modal
    $scope.signup = function() {
      $scope.modalSignup.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);


      Auth.login($scope.loginData)
        .then(function (credentials) {
          var user = {
            userId: credentials.id,
            username: credentials.username,
            createdAt: credentials.createdAt
          };
          console.log('login server response: ', credentials);
          //gives user a token stored in local storage
          $window.localStorage.setItem('com.app', JSON.stringify(user));
          //redirects users to home page
          // $location.path('/');
        })
        .catch(function (error) {
          console.error(error);
        });
      
      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };

    // Perform user signup
    $scope.doSignup = function(){
      console.log('user signup: ', $scope.signupData);
      Auth.signup($scope.signupData)
        .then(function (credentials) {
          var user = {
            userId: credentials.id,
            username: credentials.username,
            createdAt: credentials.createdAt
          };
          console.log('signup server response: ', credentials);
          //gives user a token stored in local storage
          $window.localStorage.setItem('com.app', JSON.stringify(user));
          //redirects users to home page
          // $location.path('/');
        })
        .catch(function (error) {
          console.error(error);
        });
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
          $scope.closeSignup();
        }, 1000);
    };


  })

  .controller('PlaylistsCtrl', function($scope) {
    'use strict';
    $scope.playlists = [{
      title: 'Dave',
      id: 1
    }, {
      title: 'Chill',
      id: 2
    }, {
      title: 'Dubstep',
      id: 3
    }, {
      title: 'Indie',
      id: 4
    }, {
      title: 'Rap',
      id: 5
    }, {
      title: 'Cowbell',
      id: 6
    }];
  });