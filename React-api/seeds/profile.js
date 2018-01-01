const Profile = require('../models/profile');

Profile.create([
  {
    firstName: "Jon",
    lastName: "Ablondi",
    age: 30
  },
  {
    firstName: "Jen",
    lastName: "Bennett",
    age: 27
  }
]);

console.log('seeding worked')
