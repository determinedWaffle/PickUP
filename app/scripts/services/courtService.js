angular.module('court.service', [])
  .service('Court', function($http, apiEndpoint) {
    // Sets initial data for courts partial
    // Can possibly be removed now
    this.currentCourtData = {};
    this.courtInfo = {};
    // Attempts to find if an object returned
    // by Google Places API is in our database
    this.getCourtInfo = function(court) {
      return $http({
        method: 'GET',
        url: apiEndpoint.url + '/api/court/findCourt',
        params: court
      })
        .then(function(response) {
          console.log("response is ", response);
          return response.data;
        });
    };

    // Called in the map Controller
    // Sets up the court partial with initial data
    // when a marker is clicked on and if it exists
    // in our database, returns all applicable RSVP's.
    this.getCourtSchedule = function(court) {
      // Set the this variable because .then will execute in global context
      var that = this;

      console.log("-----> court:", court);

      // Retrieves either data in our database or data directly
      // from the Google Places query (retrieved in map.js)
      this.getCourtInfo(court)
        .then(function(results) {
          console.log('results: ', results);

          // Sets the currentCourt data held in the Court service
          // This populates courtPartial
          that.courtInfo = court;
          that.currentCourtData.name = results.name;
          that.currentCourtData.address = results.address;
          that.currentCourtData.schedule = [];
          that.currentCourtData.id = results.id;
          that.currentCourtData.placeId = results.placeId;
          // if the results contain a unique id from our database..
          console.log("result.id", results.id);
          if (results.id) {
            // send a request to get all the rsvp's for that court
            $http({
              method: 'GET',
              url: apiEndpoint.url + '/api/court/' + results.id + '/rsvp'
            })
              .then(function(response) {
                console.log(response);
                var rsvps = response.data;
                var rsvpsByTime = {};

                // going through all rsvps returned back for a given court
                /* This process is grouping each rsvp by group time
                   and providing a count for each rvsp at the same time */
                for (var i = 0; i < rsvps.length; i++) {
                  if (!rsvpsByTime[rsvps[i]['starttime']]) {
                    rsvpsByTime[rsvps[i]['starttime']] = 1;
                  } else {
                    rsvpsByTime[rsvps[i]['starttime']] = rsvpsByTime[rsvps[i]['starttime']] + 1;
                  }
                }

                // Placing the objects containing a start time and the number of people
                // rsvp'd for that start time into an array that will be
                // displayed in the Court partial
                var blankArray = [];
                for (var key in rsvpsByTime) {
                  var starttime = key;
                  var endtime = key + 1;
                  blankArray.push({
                    starttime: starttime,
                    count: rsvpsByTime[key]
                  });
                }
                that.currentCourtData.schedule = blankArray;
                console.log("schedule in courtService",that.currentCourtData.schedule)
              })
              .catch(function(error) {
                return new Error('An error occurred while looking up the schedule: ', error);
              });
          }
        })
        .catch(function(error) {
          return new Error('An error occurred while looking up the schedule: ', error);
        });
    };

    // /**
    // * [postRsvp description]
    // * @param  {[Object]} rsvp [Holds the entered form data from the court partial]
    // * @return {[Object]}      [Returns RSVP data from database]
    // */
    this.postRsvp = function(rsvp) {
      console.log('post',rsvp);
      return $http({
        method: 'POST',
        url: apiEndpoint.url + '/api/rsvp/addRsvp',
        data: rsvp
      })
        .then(function(resp) {
          return resp.data;
        });
    };
  });
