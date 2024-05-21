const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send(`Hello, World!`);
  res.send(`Version: 1.0.0\n`);
  res.send(`Hostname: e9d361d8130f`);
});

app.listen(port, () => {
  console.log(`Hello, World! http://localhost:${port}`);
});
