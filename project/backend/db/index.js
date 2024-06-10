const mongoose = require('mongoose');
const { log } = require('../utils/helpers/logger');

const connect = (app) => {
  const url = process.env.MONGO_CONNECTION_STRING;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
  };

  const connectWithRetry = () => {
    log.info("MongoDB connection with retry");
    mongoose.connect(url, options)
      .then(() => {
        log.info("MongoDB is connected");
        app.emit("ready");  // Ensure this line is here
      })
      .catch((err) => {
        log.error("MongoDB connection unsuccessful, retry after 2 seconds.", err);
        setTimeout(connectWithRetry, 2000);
      });
  };

  connectWithRetry();

  mongoose.connection.on("error", (err) => {
    log.error("Error connecting to database", err);
  });

  mongoose.connection.on("disconnected", () => {
    log.info("MongoDB disconnected, retrying connection...");
    connectWithRetry();
  });
};

module.exports = { connect };
