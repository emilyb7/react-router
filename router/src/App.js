import React, { Component } from 'react';
import './App.css';

/* router */
import { BrowserRouter as Router, Route, Link, } from 'react-router-dom'

/* components */
const Home = props => ( <div>Home</div> )

const About = props => ( <div>About</div> )

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

export default App;
