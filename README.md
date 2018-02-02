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

There are two major steps for setting up the frontend of the app:
1. create fake data to ensure something can be shown of browser
2. connect up the api from our back end and show that data instead

We shall also be building from the top down. Meaning importing components which do not yet exist in the top files and working our way down creating each component as we go.

1.i) Initialise react-web app.
```
$ yarn create react-app react-web
$ cd react-web
```

ii) in *App.js*

```javascript
import React, { Component } from 'react';
import './App.css';
import ProfileList from './components/ProfileList';

class App extends Component {
  state = {
    profiles: []
  }

  componentDidMount(){
    this.setState({
      profiles: [
        {
          _id: "2b2j2b",
          firstName: "Jojo",
          lastName: "Crochets",
          age: 121
        }
      ]
    })
  };
  render(){
    const { profiles } = this.state;
    return(
      <div className="App">
        {
          profiles ? (
            <ProfileList profiles={profiles} />
          ) : ("Loading...")
        }
      </div>
    );
  }
};

export default App;
```

iii) create a component folder within src and create a file *ProfileList.js*

we will use this file to go through all the profiles within the back end and outpout them to the screen.

```javascript
import React from 'react'
import Profile from './Profile'

export default function ProfileList ({ profiles }) {
  return (
    <div>
      <h1>Profile List</h1>
      {
        profiles.map(profile => {
          console.log(profile)
          return <Profile {...profile} />
        })
      }
    </div>
  )
}
```

iv) previous step called in a component called Profile so lets create *Profile.js* still within components

```javascript
import React from 'react'

export default function Profile ({
  firstName,
  lastName,
  age
}) {
  return (
    <div>
      <span> name: {firstName} {lastName} </span>
      &nbsp;
      <span> age: {age} </span>
      &nbsp;
    </div>
  )
}
```

check to see if hard coded profile come out on browser

v) Add to *Package.jsonÂ*
```javascript
"proxy": "http://localhost:7000"
```

vi) Alter information in componentDidMount section of *App.js*
```javascript
fetch('/profiles')
  .then(res => res.json())
  .then(profiles => {
    this.setState({ profiles })
  })
  .catch(error => { console.log(error)})
// this.setState({
//   profiles: [
//     {
//       _id: "2b2j2b",
//       firstName: "Jojo",
//       lastName: "Crochets",
//       age: 121
//     }
//   ]
// })
```

the seeded profiles from the database should now be showing on the homepage.
*Frontend done for now*
___

## Setting up authentication with tokens

BACKEND
1.i) add the following three dependencies to package.json
```
$ yarn add passport passport-local passport-local-mongoose
```

ii) before creating our user model we will refactor our current profile model so as to take out the mongoose component which can then be called into any future models we wish to create. Create *base.js* in models.
- cut lines 1-7 from *profile.js* and paste them into *base.js*
- add the line
```javascript
module.exports = mongoose
```
- in *profile.js* call in the new base model at the top of the page
```javascript
const mongoose = require('./base')
```

iii) creation of the *user.js* file within models

- call in the base model as before

```javascript
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const UserSchema = Schema({
  // firstName: String
  account: { type: ObjectId, ref: 'Profile' },
  admin: Boolean
})

// extend the schema with our Passport plugin
UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true,
  session: false
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

module.exports = User
```
iv) in routes folder, create *auth.js* which will deal with the authentication routes for signin and registry

```javascript
const express = require('express')

const router = new express.Router()

router.post('/register', (req, res) => {
  res.json({ user: req.user })
})

router.post('/signin', (req, res) => {
  res.json({ user: req.user })
})

module.exports = router
```
v)
```
$ yarn add passport-jwt jwt-decode jsonwebtoken express-jwt express-session
```
