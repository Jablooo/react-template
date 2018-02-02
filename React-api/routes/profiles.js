const express = require('express')
const router = express.Router()
const Profile = require('../models/profile.js')

router.get('/', (req, res) => {
  Profile.find()
  .then(profiles => res.json(profiles))
  .catch(error => res.json({ error }))
})

// router.get('/test', (req, res) => {
//   res.send('This is a GET 1\n')
// })

module.exports = router
