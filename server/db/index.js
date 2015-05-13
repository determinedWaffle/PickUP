var Sequelize = require('sequelize');

// For heroku deployment. If DATABASE_URL has been set as a 
// config environment variable (exists in heroku), then use that.
// Otherwise assume a base install of mysql
if(process.env.DATABASE_URL) {
  var orm = new Sequelize(process.env.DATABASE_URL);
} else {
  // Change needed: Change to requiring in a config.json file
  // so people's individual logins and db's can be stored
  // Using this means you must have a pickupDB database on your local
  // machine or it will fail.
  var orm = new Sequelize('pickupDB', 'root','', {
    dialect: 'mysql'
  });
}

//creates new row in User Table
var User = orm.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING
});

//creates new row in Court Table
var Court = orm.define('Court', {
  name: Sequelize.STRING,
  address: Sequelize.STRING,
  rating: Sequelize.INTEGER,
  placeId: Sequelize.STRING
});

//creates new row in RSVP Table

var RSVP = orm.define('RSVP', {
  starttime: Sequelize.DATE,
  endtime: Sequelize.DATE
});

//establish relationships between tables
Court.hasMany(RSVP);
RSVP.belongsTo(Court);
User.hasMany(RSVP);
RSVP.belongsTo(User);


// This commented out section is for prepopulation of data
// It drops all tables in the database (force:true) and
// inputs a large amount of 

// orm.sync({force:true}).then(function(){
//   User.bulkCreate([
//     { username: 'kurt',password:'kurt', email:'kurt@kurt.com' },
//     { username: 'vivek',password:'vivek', email:'vivek@vivek.com' },
//     { username: 'mark',password:'mark', email:'mark@mark.com' }
//   ]);

//   Court.bulkCreate([
//     { name: 'Venice Beach', address:'1800 Ocean Front Walk Venice, CA 90291', rating: 5, placeId: 'ChIJQ80ljrm6woAR70e2byLAbKk'},
//     { name: 'Mosswood Park', address:'397 W MacArthur Blvd Oakland, CA 94611', rating: 5, placeId: 'EiwzOTcgVyBNYWNBcnRodXIgQmx2ZCwgT2FrbGFuZCwgQ0EgOTQ2MDksIFVTQQ'},
//     { name: 'Potrero Hill Recreation Center', address:'801 Arkansas St. San Francisco, CA 94107', rating: 4, placeId: 'ChIJdUEEFLR_j4ARHo6_zTIvyuY'},
//     { name: 'Aptos Park', address:'San Francisco, CA 94127, United States', rating: 2, placeId: 'ChIJqfFWfch9j4ARt0Ip6Y5y1Ow'},
//   ]);

//   RSVP.bulkCreate([
//     { starttime: new Date('December 17, 2015 13:00:00'), endtime: new Date('December 17, 2015 14:00:00'), CourtId: 1, UserId:1 },
//     { starttime: new Date('December 20, 2015 13:00:00'), endtime: new Date('December 20, 2015 14:00:00'), CourtId: 1, UserId:1 },
//     { starttime: new Date('December 18, 2015 11:00:00'), endtime: new Date('December 18, 2015 12:00:00'), CourtId: 2, UserId:2 },
//     { starttime: new Date('December 19, 2015 15:00:00'), endtime: new Date('December 19, 2015 16:00:00'), CourtId: 3, UserId:3 },
//     { starttime: new Date('December 21, 2015 15:00:00'), endtime: new Date('December 21, 2015 16:00:00'), CourtId: 4, UserId:1 },
//     { starttime: new Date('December 21, 2015 15:00:00'), endtime: new Date('December 21, 2015 16:00:00'), CourtId: 4, UserId:2 },
//     { starttime: new Date('December 21, 2015 17:00:00'), endtime: new Date('December 21, 2015 18:00:00'), CourtId: 4, UserId:3 }
//   ]);
// });

// Creates tables if they are not there. Now that the ability to make
// rsvp's is in the program, bulk data may not be needed at all.
// Use either this or the sync(force:true) but not both
orm.sync();

//exports tables so other files can reference
exports.User = User;
exports.Court = Court;
exports.RSVP = RSVP;

