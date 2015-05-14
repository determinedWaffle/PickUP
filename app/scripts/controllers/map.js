angular.module('starter.controllers')
  .controller('AppMap', function($scope) {
    'use strict';
    console.log('hi dave');
    /*global google */
    /*jshint unused: false, undef:false */
    $scope.service = {};
    $scope.infowindow = {};
    $scope.map = {};
    $scope.drawMap = function() {


      var myLatlng = new google.maps.LatLng(144.94623769999998, -37.8216962);
      var bballMarker;
      var mapOptions = {
        center: myLatlng,
        zoom: 13,
        panControl: false,
        streetViewControl: false,
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

          bballMarker = new google.maps.Marker({
            position: pos,
            map: $scope.map,
            icon: 'assets/img/verysmallball.png',
            animation: google.maps.Animation.DROP,
            content: 'Your location'
          });

          function toggleBounce() {
            if (this.getAnimation() !== null) {
              this.setAnimation(null);
            } else {
              this.setAnimation(google.maps.Animation.BOUNCE);
            }
          }
          google.maps.event.addListener(bballMarker, 'click', toggleBounce);
          // Declares the Google Places object (wrapper on top of the Google Maps object)
          $scope.infowindow = new google.maps.InfoWindow();
          $scope.service = new google.maps.places.PlacesService($scope.map);
          var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          // Sets the specifications for the Google Places search
          console.log('user Pos', userLatLng);
          var request = {
            location: userLatLng,
            radius: 1000,
            types: ['park']
          };
          console.log('service', $scope.service);
          console.log('request', request);
          // Uses one of the types of search Google Places has to offer (nearbySearch)
          // The second parameter is a success callback to handle the results
          $scope.service.nearbySearch(request, function(request, status) {
            $scope.populateMarkers(request, status);
          });
          /**
           * Creates markers based on the results from a 
           * Google Places API call
           * @param  {[Array]} results [Result from Google Places query]
           * @param  {[Object]} status  [Status object to determine if query is successful]
           */

          $scope.populateMarkers = function(results, status) {
            console.log('populate marker', results, status);
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                $scope.createMarker(results[i]);
              }
            }
          };

          console.log('later service', $scope.service);

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
            var bballMarkers = new google.maps.Marker({
              map: $scope.map,
              position: place.geometry.location,
              icon: image,
              animation: google.maps.Animation.DROP
            });

            //      // Adds a click listener on the created marker that
            // gets additional details from Google Places ($scope.service)
            google.maps.event.addListener(bballMarkers, 'click', function() {
              $scope.service.getDetails({
                placeId: place.place_id
              }, function(thisplace, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                  // If successful, this will use the court service to retrieve the
                  // list of rsvp's for the court if it exists and set current court data
                  // in the Court service
                  // Court.getCourtSchedule({
                  //  name: thisplace.name,
                  //  address: thisplace.formatted_address,
                  //  placeId: thisplace.place_id
                  // });
                }
              });
              // Sets the content for this marker's popup window
              $scope.infowindow.setContent(place.name);
              // Opens the popup window for this marker
              $scope.infowindow.open($scope.map, this);
              toggleBounce.call(this, bballMarker);
            });
          };

        });
      } else {
        // Device doesn't support Geolocation
        console.log('Device doesn\'t support Geolocation');
      }
    };

    google.maps.event.addDomListener(window, 'load', $scope.drawMap());

    $scope.clickTest = function() {
      $scope.drawMap();
    };

  });
