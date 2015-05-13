var db = require('../db');

module.exports = {
  //handles login information
  login: function (req, res, next) {
    var username = req.body.username,
        password = req.body.password;
    //checks if user is in database
    db.User.find({where:{username: username}})
      .then(function (user) {
        if (!user) {
          next(new Error ('invalid user'));
        } else{
          //checks to see if password matches
            if (password === user.password) {
              res.json(user);
            } else {
              next(new Error ('invalid password'));
            }
        }
      })
      .catch(function (error) {
        next(new Error('unable to look up User: '+ error));
      });
  },
  //handles signup information
  signup: function (req, res, next) {
    db.User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    })
    .then(function (results){
      console.log(results);
      res.json(results);
    })
    .catch(function (error){
      next(new Error('Error occurred while creating user: '+ error));
    });
  }
};
