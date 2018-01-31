let homeController = {}

homeController.index = function (req, res) {
  console.log('this our display mofo!!')
  res.render('./home/index')
}

module.exports = homeController
