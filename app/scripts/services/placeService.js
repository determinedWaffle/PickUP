angular.module('place.service', [])
  .factory('Place', function() {
    'use strict';

    var courtId = {
      id: '',

      setCourtId: function(value) {
        courtId.id = value;
      },

      getCourtId: function() {
        return courtId.id;
      }
    };

    return {
      courtId: courtId
    };

  });
