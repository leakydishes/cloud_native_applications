const mongoose = require('mongoose');
const logger = require('../utils/helpers/logger');

const connectWithRetry = () => {
  logger.log('info', 'MongoDB connection with retry');
  mongoose
    .connect(process.env.MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.log('info', 'MongoDB is connected');
    })
    .catch((err) => {
      logger.log('error', `MongoDB connection unsuccessful, retry after 2 seconds. ${err}`);
      setTimeout(connectWithRetry, 2000);
    });
};

module.exports = connectWithRetry;
