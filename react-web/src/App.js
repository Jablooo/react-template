import React, { Component } from 'react';
import './App.css';
import ProfileList from './components/ProfileList';

class App extends Component {
  state = { profiles: null}

  componentDidMount(){
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
