require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

const connectWithRetry = () => {
  console.log('MongoDB connection with retry');
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('MongoDB is connected');
    })
    .catch(err => {
      console.log('MongoDB connection unsuccessful, retry after 2 seconds.', err);
      setTimeout(connectWithRetry, 2000);
    });
};

connectWithRetry();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
