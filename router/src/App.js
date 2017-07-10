import React, { Component } from 'react';
import './App.css';

/* router */
import { BrowserRouter as Router, Route, } from 'react-router-dom'

/* data */
const sheepArray = [
  {
    name: 'Harry',
    age: 4,
  },
  {
    name: 'Nora',
    age: 2,
  },
]

/* components */
const Home = () => ( <div>Home</div> )

const About = () => ( <div>About</div> )

const List = () => (
  <div>
    <ul>
      { sheepArray.map( sheep => <li key={sheep.name}>{sheep.name}</li> ) }
    </ul>
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
