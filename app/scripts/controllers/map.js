angular.module('starter.controllers')
  .controller('AppMap', function($scope, Court, $ionicModal, $timeout, Auth, $window) {
    'use strict';
    // console.log('hi dave');
    $scope.loginData = {};
    // Login Modal playground

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
      modal.show();
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      // console.log('Close login');
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modalSignup.hide();
      $scope.modal.show();
    };

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

      $scope.loginData = {};
    };

    // Form data for the login modal
    $scope.signupData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/signup.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalSignup = modal;
    });

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

    // Triggered in the login modal to close it
    $scope.closeSignup = function() {
      $scope.modalSignup.hide();
    };

    // Open the login modal
    $scope.signup = function() {
      console.log("signup called", $scope.modalSignup);
      $scope.modal.hide();
      $scope.modalSignup.show();
    };

    // Playgound end

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
            // console.log('populate marker', results, status);
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                $scope.createMarker(results[i]);
              }
            }
          };

          console.log('later service', $scope.service);

          $scope.createMarker = function(place) {
            // console.log('this basketball was called');
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

            $scope.writeAddressName = function(latLng) {
              var geocoder = new google.maps.Geocoder();
              geocoder.geocode({
                'location': latLng
              },
                function(results, status) {
                  if (status === google.maps.GeocoderStatus.OK) {
                    document.getElementById('address').innerHTML = results[0].formatted_addresss;
                  } else {
                    document.getElementById('error').innerHTML += 'Unable to retrieve your address' + '<br />';
                  }
                });
            };

            //      // Adds a click listener on the created marker that
            // gets additional details from Google Places ($scope.service)
            google.maps.event.addListener(bballMarkers, 'click', function() {
              $scope.service.getDetails({
                placeId: place.place_id
              }, function(thisplace, status) {
                /*jshint camelcase: false */
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                  // If successful, this will use the court service to retrieve the
                  // list of rsvp's for the court if it exists and set current court data
                  // in the Court service
                   Court.getCourtSchedule({
                    name: thisplace.name,
                    address: thisplace.formatted_address,
                    placeId: thisplace.place_id
                   });
                  // $scope.infowindow.address = thisplace.formatted_address;
                  var contentString = '<div class="ugly">' + '<button> <a style="text-decoration: none;" href="#/app/schedule"' + '>' + place.name + '</a></button>' + '<div>';
                  // Place.courtId.setCourtId(thisplace.id);
                  $scope.infowindow.setContent(contentString);
                  // Sets the content for this marker's popup window
                  // Opens the popup window for this marker
                }
              });
              $scope.infowindow.open($scope.map, this);
              //toggleBounce.call(this, bballMarker);
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
