const express = require('express');
const bodyParser = require('body-parser');
const profilesRouter = require('./routes/profiles');

const server = express();

server.use(bodyParser.urlencoded());
server.use(bodyParser.json());

server.use('/profiles', profilesRouter);

server.get('/', (req, res) => {
  res.json({
    resources: [{
      profiles: "/profiles"
    }]
  })
});

// server.get('/', (req,res) => {
//   res.send('hello world');
// });

const port = 7000;
server.listen(port, () => {
  console.log(`Profile API server running on ${port}`)
});
