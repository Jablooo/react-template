let projectController = {}

projectController.index = function (req, res) {
  console.log('this our display mofo!!')
  res.render('./projects/index')
}

projectController.project1 = function (req, res) {
  console.log('this our display mofo!!')
  res.render('./projects/project1.html.ejs')
}

module.exports = projectController

// module.exports = class ProjectController {
//   exemple(req, res) {
//     // Project.find()
//     // .then(toys => {
//     res.render('projects/index', {toys: toys});
// }
//   //   .catch(err => {res.render()})
//   // }
//
//   index(req, res) {
//     console.log("this our display mofo!!");
//     res.render('./projects/index');
//   }
// }
