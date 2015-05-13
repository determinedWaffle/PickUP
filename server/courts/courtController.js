var db = require('../db');

module.exports = {

  /**
   * Get all the rsvp's for the court with the id
   * that is passed in. This is called in the second part
   * of the Court Service's getCourtSchedule
   */
  getCourtRSVP: function (req, res ,next) {
    var courtId = req.params.courtId;

    /* Currently is being less than gracefully because the sequelize query to
    group by starttime and create a count for the amount of people in each hour block
    is hard. Can be refined additionally by constraining it to a date */
    db.RSVP.findAll({where:{CourtId:courtId},
      attributes: ['starttime','endtime']})
      .then(function(results){
        res.json(results);
      })
      .catch(function(error){
        next(new Error('Cant find RSVPs for court: ', error));
      });
  },

  /**
   * Find the court using the Google Places placeId
   * provided by the map controller. If it doesn't find
   * anything, return the data about the Google Place that was
   * passed in, or return our entry from the database.
   */
  findCourt: function(req, res, next){
    var placeId = req.query.placeId;
    db.Court.find({where:{placeId: placeId}})
      .then(function(results){
        if(!results) {
          // return data provided from Google Places Library
          res.json(req.query);
        } else {
          // return data from our database about the court
          res.json(results);
        }
      })
      .catch(function(error){
        next(new Error('Couldnt find that court: ', error));
      });
  },


  //adds court to the database
  addCourt: function(req, res, next){
    db.Court.create({
      name: req.body.name,
      address:req.body.address,
      longitude: req.body.longitude,
      lattitude:req.body.lattitude,
      rating: req.body.rating
    })
    .then(function (results){
      res.json(results);
    })
    .catch(function (error){
      next(new Error('Couldnt add that court: ', error));
    });
  }
};
