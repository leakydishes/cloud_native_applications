const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world! This is my web app!');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Web app running on http://localhost:${port}`);
});