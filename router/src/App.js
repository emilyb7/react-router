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

/* click handler */

const addSheepToArray = ({ name, age, }) => {
  console.log({ name, age, });
}

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
    <Form/>
  </div>
)

class Form extends Component {

  constructor(props) {
    super(props)
    this.state = { name: '', age: '', }

    this.changeName = this.changeName.bind(this)
    this.changeAge = this.changeAge.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  changeName(event) {
    this.setState({ ...this.state, name: event.target.value, })
  }

  changeAge(event) {
    this.setState({ ...this.state, age: event.target.value, })
  }

  handleSubmit(event) {
    addSheepToArray(this.state)
  }

  render() {
    return (
      <form>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" onChange={this.changeName} value={this.state.name} />
        <br/>
        <label htmlFor="age">Age</label>
        <input id="age" type="number" onChange={this.changeAge} value={this.state.age} />
        <a onClick={this.handleSubmit}>
          Add
        </a>
      </form>
    )
  }
}

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
          <Route path="/sheep/:name" component={Sheep} value={2}/>
        </div>
      </Router>
    );
  }
}

export default App;
