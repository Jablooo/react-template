const express = require('express');
const router = express.Router();
const Profile = require('../models/profile.js');

router.get('/', (req,res) => {
  Profile.find()
  .then(profiles => res.json(profiles));
});

router.get('/home', (req,res) => {
  res.send('This should be home page 1\n');
});

module.exports = router;
