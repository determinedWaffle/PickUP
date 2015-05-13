var rsvpController = require('./rsvpController.js');

module.exports = function (app) {

  //app.post('/addCourt', rsvpController.addCourt);
  //app.get('/findCourt', rsvpController.findCourt);

  //handles get requests to finds all rsvps for a specfic user
  app.get('/:userId', rsvpController.findRsvp);
  //handles post requests to add rsvp
  app.post('/addRsvp', rsvpController.addRsvp);
  //app.get('/', rsvpController.allRsvp);
};
