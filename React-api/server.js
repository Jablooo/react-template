const express = require('express')
const bodyParser = require('body-parser')
const profilesRouter = require('./routes/profiles')
const usersRouter = require('./routes/user')
const cors = require('cors')
const authMiddleware = require('./middleware/auth')
const passport = require('passport')

const server = express()

server.use(bodyParser.urlencoded())
server.use(cors())
server.use(authMiddleware.initialize)
server.use(require('cookie-parser')())
server.use(bodyParser.json())
server.use(require('express-session')(
  {secret: 'secret', resave: false, saveUninitialized: false}
))
server.use('/profiles', profilesRouter)
server.use('/users', usersRouter)
server.use('/auth', require('./routes/auth'))
server.use(passport.initialize())
server.use(passport.session())

server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept')
  next()
})

server.get('/', (req, res) => {
  res.json({
    resources: [{
      profiles: '/profiles'
    }]
  })
})

// server.get('/', (req,res) => {
//   res.send('hello world');
// });

const port = 7000
server.listen(port, () => {
  console.log(`Profile API server running on ${port}`)
})
