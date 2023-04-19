// /* Mongoose Connection */
// const mongoose = require('mongoose');
// assert = require('assert');

// const url = 'mongodb://localhost/reddit-db';
// mongoose.connect(
//   url,
//   {
//     useNewUrlParser: true
//   },
//   function (err, db) {
//     assert.equal(null, err);
//     console.log('Connected successfully to database');

//     // db.close(); turn on for testing
//   }
// );
// mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));
// mongoose.set('debug', true);

// module.exports = mongoose.connection;

// //  ==============

const mongoose = require('mongoose');

const url = 'mongodb://localhost/reddit-db';

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected successfully to database');
  } catch (error) {
    console.error('MongoDB connection Error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
