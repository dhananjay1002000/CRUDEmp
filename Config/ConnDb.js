const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    });
    console.log("Connected with database!");
  } catch (error) {
    console.log("Failed to connect with database!", error);
  }
}

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

module.exports = { connectDb };