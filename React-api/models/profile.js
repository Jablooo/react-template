const mongoose = require('mongoose')
mongoose.Promise = Promise
const db = mongoose.connection

db.on('open', () => { console.log('Successful connection to MongoDB') })

mongoose.connect('mongodb://localhost/profiles', {useMongoClient: true})

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
