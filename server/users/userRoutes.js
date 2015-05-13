var userController = require('./userController.js');

module.exports = function (app) {

  //handles post requests to login
  app.post('/login', userController.login);
  //handles post requests to signup
  app.post('/signup', userController.signup);
};
