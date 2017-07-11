/* learning React router with sheep */

import React, { Component } from 'react';
import './App.css';

/* router */

import { BrowserRouter as Router, Route, Link, } from 'react-router-dom'

/* some data */

const sheepArray = [
  { name: 'Harry', age: 4, },
  { name: 'Nora', age: 2, },
]

/* components */

const Home = () => (
  <div>
    <h1>Home</h1>
    <Link to="/list">View all sheep</Link>
  </div>
)

const About = () => ( <h1>About</h1> )

const List = () => (
  <div>
    <h1>Sheep</h1>
    <ul>
      { sheepArray.map(sheep => <li key={sheep.name}>{sheep.name}</li>) }
    </ul>
    <h2>Add a sheep</h2>
    <form>

    </form>
  </div>
)

const Sheep = ({ match, }) => {
  const matchingSheep = sheepArray.find((sheep) => sheep.name.toLowerCase() === match.params.name);
  return (
    <div>
      <h1>{ matchingSheep.name }</h1>
      <p>Age: { matchingSheep.age }</p>
    </div>
  )
}


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <p><Link to="/">Home</Link></p>
          <p><Link to="/about">About</Link></p>
          <Route exact path="/" component={Home} />

          <Route path="/about" component={About} />
          <Route path="/list" component={List} />
          <Route path="/sheep/:name" component={Sheep}/>
        </div>
      </Router>
    );
  }
}

export default App;
