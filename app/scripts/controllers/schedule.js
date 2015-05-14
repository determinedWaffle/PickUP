angular.module('starter')
  .controller('ScheduleCtrl', function($scope, $state) {
    'use strict';

    $scope.createEvent = function() {
      $state.go('app.create');
    };
  });