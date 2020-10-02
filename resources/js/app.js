require('./bootstrap');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import {
  StudentData,
  AddStudent,
  EditStudent,
} from './components';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" component={StudentData} />
            <Route path="/add" component={AddStudent} />
            <Route path="/edit/:id" component={EditStudent} />
          </Switch>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);