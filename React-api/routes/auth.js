const express = require('express')
const authMiddleware = require('../middleware/auth.js')

const router = new express.Router()

router.post('/register',
  authMiddleware.register,
  authMiddleware.signJWTForUser
  // (req, res) => {
  //   res.json({ user: req.user})
  // }
)

router.post('/signin',
  authMiddleware.signIn,
  authMiddleware.signJWTForUser
  // (req, res) => {
  //   res.json({ user: req.user })
  // }
)

router.get('/profiles',
  authMiddleware.signIn,
  (req, res) => {
    res.json({ profiles: ['Profiles'] })
  }
)

module.exports = router
