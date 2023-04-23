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
