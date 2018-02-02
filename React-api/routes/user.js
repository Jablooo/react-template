const express = require('express')
const User = require('../models/user.js')
const Profile = require('../models/profile.js')

const userApi = router => {
  router.get('/users', (req, res, next) => {
    User.find()
    .populate('account')
    .then(users => {
      res.json(users)
    })
    .catch(error => res.json({
      error })
    )
  })
  return router
}

module.exports = userApi
