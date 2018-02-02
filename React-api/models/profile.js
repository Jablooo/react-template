const mongoose = require('./base')

const profileSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile

// const Profiles = [
//   {
//     firstName: "Jon",
//     lastName: "Ablondi",
//     age: 30
//   }
// ]
