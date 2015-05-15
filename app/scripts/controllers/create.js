angular.module('starter')
  .controller('CreateCtrl', ['$scope', '$state', '$window', 'Court', function($scope, $state, $window, Court) {
    'use strict';

    $scope.rsvp = {

    };

    $scope.court = Court;

    // stores the state of the view
    $scope.state = $state;

    // function to enable reloading of the view 
    // (used to reload views so they update to avoid cluttering with an ajax call)
    $scope.reloadState = function() {
      $scope.state.reload();
    };

    $scope.addRsvp = function() {
      // stores submitted form data to fill out attributes of an rsvp
      var date = $scope.rsvp.date;
      var starttime = $scope.rsvp.starttime;
      var endtime = $scope.rsvp.endtime;

      // stores current court data stored on scope (comes from court service variables)
      var courtName = Court.currentCourtData.name;
      var address = Court.currentCourtData.address;
      var placeId = Court.currentCourtData.placeId;

      // adjusts time to appropriately store in the database
      starttime.setHours(starttime.getHours() - 1);
      endtime.setHours(endtime.getHours() - 1);

      // takes the date selected from the form, changes it to date string
      // takes the time and changes it to a time string
      // both are concatenated together to make a valid datetime string
      // for the database
      starttime = date.toDateString().concat(' ', starttime.toTimeString());
      endtime = date.toDateString().concat(' ', endtime.toTimeString());

      // parses user information (from stored user token created on login)
      var user = JSON.parse($window.localStorage.getItem('com.app'));

      // stores data in rsvp object to find the appropriate court in db
      // and then create an rsvp for the passed userid and the court
      var rsvp = {
        'date': date,
        'starttime': starttime,
        'endtime': endtime,
        'courtName': courtName,
        'userId': user.userId,
        'placeId': placeId,
        'address': address
      };

      // Creates an rsvp in the database and uses a promise then
      // (which could have more appropriately been a callback)
      // to reload the view
      console.log('create rvsp', rsvp);
      Court.postRsvp(rsvp)
        .then(function(data) {
          $scope.reloadState();
        });

      // clear the form in the court partial
      $scope.rsvp = null;

      // clear the court data in the court service,
      // causing the court view to clear and hide itself
      $scope.court.currentCourtData = {};

      function reload() {
        console.log("courtINfo", Court.courtInfo);
        Court.getCourtSchedule(Court.courtInfo);
        
        $state.go('app.schedule', {reload: true});
      }
      reload();
 // <----
    };
  }]);
