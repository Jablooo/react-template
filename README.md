## React Template

#### Aim
- To create a repository which I can clone in the future as a basic template for a React-App.
- Documenting the steps taken so that others may build a similar template.
___
#### Setting up the backend api/db
1.
i) Set up a new folder and link it to a repository on github. cd into folder and create another new folder 'react-api'. cd into this folder and run the following commands:

```
$ yarn init -y
$ yarn add express body-parser mongoose
$ yarn add nodemon --dev
```
ii) add following to _package.json_ so that you can run server with a simple 'yarn dev'
```json
"scripts": {
  "dev": "nodemon server.js"
}
```

iii) create the file _server.js_ within React-api folder and add the following code:
```javascript
const express = require('express');
const bodyParser = require('body-parser');

const server = express();

server.get('/', (req,res) => {
  res.send('hello world');
});

const port = 7000;
server.listen(port, () => {
  console.log(`Profile API server running on ${port}`)
});
```
if we now run:
```
$ yarn dev
```
in terminal our server should run on port 7000. Open chrome and check that **localhost:7000** churns out **hello world**

2.i) Create a **routes** folder in React-api, a file _profile.js_ and add the below code.

```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  res.json({profiles: []});
})

module.exports = router;
```
ii) in **server.js** require in _profile.js_ and add bodyParser lines

```javascript
const profilesRouter = require('./routes/profiles');

server.use(bodyParser.urlencoded());
server.use(bodyParser.json());

server.use('/profiles', profilesRouter);

server.get('/', (req, res) => {
  res.json({
    resources: [{
      profiles: "/profiles"
    }]
  })
});
```
and remove
```
// server.get('/', (req,res) => {
//   res.send('hello world');
// });
```
3.i) create **models** folder in React-api, a file _profile.js_ and add the below code.

```javascript
const Profiles = [
  {
    firstName: "Jon",
    lastName: "Ablondi",
    age: 30
  }
]

module.exports = Profiles;
```
this is just a temporary template so we can test whether the links we are creating are working.(this will be moved into database later on)

ii) import in routes
```javascript
const Profile = require('../models/profile.js');
```
and alter below line to call new const
```javascript
  res.json({profiles: []});
  res.json({profiles: Profile});
```

Run server and check to see if everything is running correctly. Once confirmed let create the database with mongoose.

4.i) Comment out all but
```javascript
module.exports = Profiles;
```

and insert the following chunk of code

```javascript
const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/profiles')

const db = mongoose.connection;

const profileSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number
});

const Profile = mongoose.model('Profile', profileSchema);
```
ii) in **routes** _profile.js_ change
```javascript
router.get('/', (req,res) => {
  res.json({profiles: Profile});
})

router.get('/' (req, res) => {
  Profile.find().then(profiles => {
    res.json({profiles});
  })
})

```

5.i) create seeds folder and profile.js within it.

```javascript
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
```
run below code to seed the database.
```
$ node ./seeds/profile.js
```
*backend done for now*
___

## Setting up Frontend of app

1.i) Initialise 
