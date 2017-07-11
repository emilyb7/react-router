/* learning React router with sheep */

import React, { Component } from 'react';
import './App.css';

/* router */

import { BrowserRouter as Router, Route, Link, } from 'react-router-dom'

/* some data */

const initSheepArray = [
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

const List = ({ sheepArray, addSheepToArray, }) => (
  <div>
    <h1>Sheep</h1>
    <ul>
      { sheepArray.map(({ name, }) =>
        <li key={ name }>
          <Link to={`sheep/${name}`}>{name}</Link>
        </li>)
      }
    </ul>
    <h2>Add a sheep</h2>
    <Form sheepArray={ sheepArray} addSheepToArray={ addSheepToArray } />
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
    this.props.addSheepToArray(this.state)
  }

  render() {
    return (
      <form>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" onChange={this.changeName} value={this.state.name} />
        <br/>
        <label htmlFor="age">Age</label>
        <input id="age" type="number" onChange={this.changeAge} value={this.state.age} />
        <a onClick={this.handleSubmit}>Add</a>
      </form>
    )
  }
}

const Sheep = ({ match, sheepArray, addSheepToArray }) => {
  const matchingSheep = sheepArray.find((sheep) => sheep.name === match.params.name);
  console.log({ matchingSheep, });
  return (
    <div>
      <h1>{ matchingSheep.name }</h1>
      <p>Age: { matchingSheep.age }</p>
    </div>
  )
}


class App extends Component {

  constructor(props) {
    super(props);

    this.state = { sheepArray: initSheepArray, }

    this.addSheepToArray = this.addSheepToArray.bind(this)
  }

  addSheepToArray({ name, age, }) {
    this.setState({ sheepArray: this.state.sheepArray.concat({ name, age, })})
  }

  render() {
    return (
      <Router>
        <div>
          <p><Link to="/">Home</Link></p>
          <p><Link to="/about">About</Link></p>

          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route
            path="/list"
            component={ ({ match, }) =>
              <List
                match={ match }
                sheepArray={ this.state.sheepArray }
                addSheepToArray={ this.addSheepToArray }
              />
            }
          />
          <Route path="/sheep/:name" component={ ({ match, }) =>
            <Sheep match={match} sheepArray={this.state.sheepArray} /> }/>
        </div>
      </Router>
    );
  }
}

export default App;
