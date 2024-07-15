const mongoose = require('mongoose');

const username = "suhanimaheshwari06";
const password = encodeURIComponent("Mongo@456010");
const MONGODB_URI = `mongodb+srv://${username}:${password}@cluster0.hrrwio3.mongodb.net/coin-based-data?retryWrites=true&w=majority&appName=Cluster0`;

const connectDb = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  return mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDb;
