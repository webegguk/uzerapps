import React, { Component } from 'react';
import fire from './firebase.js';
import Dashboard from './components/dashboard';

class App extends Component {

  state = {
    results: [],
    _loaded: false,
  };

  componentDidMount() {
    const result = fire.database().ref('/');
    result.once('value')
      .then((snapshot) => {
        this.setState({
          results: this.processResult(snapshot.val()),
          _loaded: true
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  processResult = (result) => {
    const accounts = result.accounts;
    let resultProcessed = [];
    const users = result.users;
    Object.keys(users).forEach((userId) => {
      let user = { id: userId, ...users[userId] };
      const userApps = accounts[user.account].apps;
      user.apps = Object.keys(userApps).map((appId) => ({ id: appId, ...userApps[appId] }));
      resultProcessed.push(user);
    });
    resultProcessed.sort((a, b) => a.name.localeCompare(b.name));
    return resultProcessed;
  };

  render() {
    return (
      <Dashboard
        results={this.state.results}
        loaded={this.state._loaded}
      />
    );
  }

}

export default App;
