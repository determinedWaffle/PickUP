angular.module('starter')
  .controller('ScheduleCtrl', ['$scope', '$state', 'Court', function($scope, $state, Court) {
    'use strict';
    console.log("inside ScheduleCtrl, Court is:", Court);
    $scope.createEvent = function() {
      $state.go('app.create');
    };
    $scope.name = Court.currentCourtData.name;
    $scope.times= Court.currentCourtData.schedule;
    console.log("inside ScheduleCtrl, $scope.times is:", $scope.times);
  }]);
