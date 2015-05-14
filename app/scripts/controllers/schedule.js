angular.module('starter')
  .controller('ScheduleCtrl', function($scope, $state, Place) {
    'use strict';

    $scope.createEvent = function() {
      $state.go('app.create');
    };

    //get courtId
    var k = Place.courtId.getCourtId();
    console.log("this is id", k);
  });
