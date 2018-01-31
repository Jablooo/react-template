// project.js in routes
const express = require('express')
const bodyParser = require('body-parser')
let router = express.Router()

let projectController = require('../controllers/projectController')
let homeController = require('../controllers/homeController')

router.use(bodyParser.urlencoded({ extended: true }))

// router.get('/project', (req, res) => {
//   res.render('projects/index');
// });

router.get('/', homeController.index)

router.get('/project', projectController.index)
router.get('/project1', projectController.project1)

router.post('/', (req, res) => {
  res.send('This is a POST\n')
})

module.exports = router
