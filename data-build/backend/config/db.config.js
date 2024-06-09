const mongoose = require('mongoose');
const logger = require('../logger/api.logger');

const connect = () => {
    const url = process.env.MONGO_CONNECTION_STRING;
    const options = {
        autoIndex: false,
        maxPoolSize: 10,
    };

    const connectWithRetry = () => {
        logger.info("MongoDB connection with retry");
        mongoose.connect(url, options)
            .then(() => {
                logger.info("MongoDB is connected");
            })
            .catch((err) => {
                logger.error("MongoDB connection unsuccessful, retry after 2 seconds.", err);
                setTimeout(connectWithRetry, 2000);
            });
    };

    connectWithRetry();

    mongoose.connection.on("error", (err) => {
        logger.error("Error connecting to database", err);
    });

    mongoose.connection.on("disconnected", () => {
        logger.info("MongoDB disconnected, retrying connection...");
        connectWithRetry();
    });
};

const disconnect = () => {
    if (!mongoose.connection) {
        return;
    }

    mongoose.disconnect();

    mongoose.connection.once("close", async () => {
        logger.info("Disconnected from database");
    });
};

module.exports = {
    connect,
    disconnect
};
