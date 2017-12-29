const express = require('express');
const bodyParser = require('body-parser');

const server = express();

server.get('/', (req,res) => {
  res.send('hello world');
});

const port = 7000;
server.listen(port, () => {
  console.log(`Profile API server running on ${port}`)
});
