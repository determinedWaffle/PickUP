var courtController = require('./courtController.js');

module.exports = function (app) {

  //handles post request for adding a court
  app.post('/addCourt', courtController.addCourt);

  //handles get request for retreiving court name
  app.get('/findCourt', courtController.findCourt);

  //handles get requests to return rsvps fora  specific court
  app.get('/:courtId/rsvp', courtController.getCourtRSVP);
  //app.get('/', courtController.allRsvp);
};