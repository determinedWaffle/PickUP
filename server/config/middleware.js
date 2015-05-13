// used for logging incoming request
var morgan = require('morgan');

//ensures all requests are stored in the body.
var bodyParser = require('body-parser');

module.exports = function (app, express) {

  //creates routers for user, rsvp, and courts
  var userRouter = express.Router();
  var rsvpRouter = express.Router();
  var courtRouter = express.Router();

  //logs all requests
  app.use(morgan('dev'));

  //takes the data from the url and puts it into the body
  app.use(bodyParser.urlencoded({extended: true}));

  //ensures that all responses be stored in the body and only parses JSON data
  app.use(bodyParser.json());

  // Serve the client files
  app.use(express.static("client/public"));

  //depending on the route, the request will be directed
  //toward a specific router
  app.use('/api/users', userRouter);
  app.use('/api/rsvp', rsvpRouter);
  app.use('/api/court', courtRouter);

  //injects the routes file into the router
  require('../users/userRoutes.js')(userRouter);
  require('../rsvp/rsvpRoutes.js')(rsvpRouter);
  require('../courts/courtRoutes.js')(courtRouter);

};
