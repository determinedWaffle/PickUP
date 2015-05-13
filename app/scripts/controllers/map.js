angular.module('starter.controllers')
	.controller('AppMap', function($scope) {
    'use strict';
    console.log('hi dave');
    /*global google */
    /*jshint unused: false, undef:false */

    $scope.drawMap = function() {
      var myLatlng = new google.maps.LatLng(144.94623769999998, -37.8216962);

      var mapOptions = {
        center: myLatlng,
        zoom: 13
      };

      $scope.map = new google.maps.Map(document.getElementById('map'),
        mapOptions);

      // Try HTML5 geolocation
      if (navigator.geolocation) {
        console.log('Device supports Geolocation');
        navigator.geolocation.getCurrentPosition(function(position) {
          console.log('Enter getCurrentPosition');
          var pos = new google.maps.LatLng(position.coords.latitude,
            position.coords.longitude);
          console.log(pos);
          $scope.map.setCenter(pos);

          var myLocation = new google.maps.Marker({
            position: pos,
            map: $scope.map,
            icon: 'assets/img/verysmallball.png',
            content: 'Your location'
          });
        });
      } else {
        // Device doesn't support Geolocation
        console.log('Device doesn\'t support Geolocation');
      }
    };


    $scope.createMarker = function(place) {
      console.log('this basketball was called');
      // sets the basketball image to be used. This can also be a vector graphic. (one exists in assets/img)
      var image = {
        url: 'assets/img/verysmallball.png',
        size: new google.maps.Size(25, 25),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0)
      };

      // Creates the marker for the current google place location
      var marker = new google.maps.Marker({
        map: $scope.map,
        position: place.geometry.location,
        icon: image
      });

      //      // Adds a click listener on the created marker that
      // gets additional details from Google Places ($scope.service)
      // google.maps.event.addListener(marker, 'click', function() {
      //  $scope.service.getDetails({
      //    placeId: place.place_id
      //  }, function(thisplace, status) {
      //    if (status === google.maps.places.PlacesServiceStatus.OK) {
      //      // If successful, this will use the court service to retrieve the
      //      // list of rsvp's for the court if it exists and set current court data
      //      // in the Court service
      //      Court.getCourtSchedule({
      //        name: thisplace.name,
      //        address: thisplace.formatted_address,
      //        placeId: thisplace.place_id
      //      });
      //    }
      //  });

      //  // Sets the content for this marker's popup window
      //  $scope.infowindow.setContent(place.name);
      //  // Opens the popup window for this marker
      //  $scope.infowindow.open($scope.map, this);
      // });
    };




    $scope.drawMap();

    $scope.clickTest = function() {
      window.alert('Example of infowindow with ng-click');
    };
 
  });
