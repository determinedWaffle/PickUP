angular.module('starter')
  .controller('ScheduleCtrl', function($scope, $state, Auth) {
    'use strict';

    $scope.createEvent = function() {
      $state.go('app.create');
    };

    //get courtId
    //Auth.courtId.getCourtId();
  });
