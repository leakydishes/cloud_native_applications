const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Test - Hello!');
});

app.listen(3000, () => {
  console.log('App is running');
});
